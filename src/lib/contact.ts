import { z } from "zod";

/** Shared between the client form and the /api/contact route. */
export const contactSchema = z.object({
  name: z.string({ error: "Please enter your name." }).trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email({ error: "Please enter a valid email address." }).trim().max(200),
  message: z
    .string({ error: "Please enter a message." })
    .trim()
    .min(20, "A little more detail, please (20+ characters).")
    .max(4000, "Message is too long (4000 characters max)."),
  // Honeypot — real users never see or fill this field.
  company: z.string().max(0).optional().or(z.literal("")),
  // Time the form was rendered (ms since epoch) — used to reject instant bot submits.
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<ContactField, string>> };
