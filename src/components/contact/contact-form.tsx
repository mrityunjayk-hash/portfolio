"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2, TriangleAlert } from "lucide-react";
import { contactSchema, type ContactField, type ContactResponse } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<ContactField, string>>;

const fields: { name: ContactField; label: string; type?: string; autoComplete: string }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const validateField = (name: ContactField, value: string) => {
    const r = contactSchema.shape[name].safeParse(value);
    setErrors((e) => ({ ...e, [name]: r.success ? undefined : r.error.issues[0]?.message }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
      startedAt: startedAt.current || Date.now(),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as ContactField;
        if (["name", "email", "message"].includes(k) && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && data?.ok) {
        setStatus("success");
        formRef.current?.reset();
        setErrors({});
        return;
      }
      if (data && !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.error);
      } else {
        setFormError("Something went wrong. Please try again or email me directly.");
      }
      setStatus("error");
    } catch {
      setFormError("Network error — check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between pb-2">
        <p className="label-mono text-fg">Send a message</p>
        <p className="label-mono hidden text-subtle sm:block">Goes straight to my inbox</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-start justify-center gap-4 border-t border-line py-8"
            role="status"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-dim text-accent">
              <Check size={20} aria-hidden="true" />
            </span>
            <h3 className="text-3xl tracking-tight text-fg">Message received.</h3>
            <p className="max-w-sm text-muted">Thanks for reaching out — I&apos;ll reply to the email address you provided.</p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                startedAt.current = Date.now();
              }}
              className="mt-2 font-mono text-[12px] text-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 pt-4"
            aria-describedby={formError ? "form-error" : undefined}
          >
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {fields.map((f) => (
                <Field key={f.name} id={`cf-${f.name}`} label={f.label} error={errors[f.name]}>
                  <input
                    id={`cf-${f.name}`}
                    name={f.name}
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    required
                    maxLength={f.name === "name" ? 80 : 200}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `cf-${f.name}-error` : undefined}
                    onBlur={(e) => e.target.value && validateField(f.name, e.target.value)}
                    className={inputCls(!!errors[f.name])}
                  />
                </Field>
              ))}
            </div>

            <Field id="cf-message" label="Message" error={errors.message}>
              <textarea
                id="cf-message"
                name="message"
                rows={6}
                required
                maxLength={4000}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "cf-message-error" : undefined}
                onBlur={(e) => e.target.value && validateField("message", e.target.value)}
                className={`${inputCls(!!errors.message)} resize-y py-3 leading-relaxed`}
              />
            </Field>

            {/* Honeypot: hidden from humans and assistive tech. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <AnimatePresence>
              {status === "error" && formError && (
                <motion.p
                  id="form-error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 rounded-[4px] border border-danger/30 bg-danger/10 px-3 py-2.5 text-[14px] text-danger"
                >
                  <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {formError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group mt-2 inline-flex h-12 items-center justify-center gap-3 self-start rounded-[2px] bg-accent pr-5 pl-6 text-[14px] font-medium text-[#0a0b0d] transition-shadow duration-300 hover:shadow-[0_0_0_4px_rgba(198,244,50,0.12)] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Send message <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </>
              )}
            </button>
            <p className="sr-only" aria-live="polite">
              {status === "submitting" ? "Sending message" : ""}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  `w-full min-h-11 border-0 border-b bg-transparent px-0 text-[16px] text-fg placeholder:text-subtle transition-colors outline-none focus:border-accent focus-visible:outline-none ${
    invalid ? "border-danger/70" : "border-line-strong hover:border-white/30"
  }`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-mono">
        {label}
      </label>
      {children}
      {/* Space is always reserved so clearing an error on blur doesn't shift the submit button mid-click. */}
      <p id={`${id}-error`} className="-mt-1 min-h-[18px] text-[13px] leading-[18px] text-danger">
        {error}
      </p>
    </div>
  );
}
