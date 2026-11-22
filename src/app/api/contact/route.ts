import { Resend } from "resend";
import { contactSchema, type ContactField, type ContactResponse } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

const MIN_FILL_MS = 2500; // humans don't submit a message within 2.5s
const MAX_BODY_BYTES = 10_000;

const json = (body: ContactResponse, status = 200, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function clientIp(req: Request) {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ ok: false, error: "Forbidden." }, 403);

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Unsupported content type." }, 415);
  }

  const ip = clientIp(req);
  const burst = rateLimit(`burst:${ip}`, 3, 60_000);
  const daily = rateLimit(`day:${ip}`, 10, 24 * 60 * 60_000);
  if (!burst.ok || !daily.ok) {
    const retry = Math.max(burst.retryAfter, daily.retryAfter);
    return json(
      { ok: false, error: "Too many messages — please try again later." },
      429,
      { "Retry-After": String(retry) },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Message too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === "name" || key === "email" || key === "message") && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    // Honeypot or timestamp tampering: pretend success so bots learn nothing.
    if (!Object.keys(fieldErrors).length) return json({ ok: true });
    return json({ ok: false, error: "Please fix the highlighted fields.", fieldErrors }, 422);
  }

  const { name, email, message, startedAt } = parsed.data;
  if (Date.now() - startedAt < MIN_FILL_MS) return json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return json(
      { ok: false, error: `The contact form is temporarily unavailable. Please email ${site.email} directly.` },
      503,
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: email,
    subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return json(
      { ok: false, error: `Something went wrong sending your message. Please email ${site.email} directly.` },
      502,
    );
  }

  return json({ ok: true });
}
