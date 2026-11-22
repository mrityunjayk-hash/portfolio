# Mrityunjay Kumar — Portfolio

Personal site for **Mrityunjay Kumar**, offensive security researcher (web & API pentesting, vulnerability research, AI/LLM application security).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion and MDX. Deployed on Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY to test the contact form
npm run dev                  # http://localhost:3000
```

| Script          | What it does                    |
| --------------- | ------------------------------- |
| `npm run dev`   | Development server              |
| `npm run build` | Production build                |
| `npm start`     | Serve the production build      |
| `npm run lint`  | ESLint                          |

## Updating content

All content lives in typed files under `src/content/` — no component changes needed.

| What                        | Where                                  |
| --------------------------- | -------------------------------------- |
| Name, headline, intro, links | `src/content/site.ts`                 |
| About text and method       | `src/content/about.ts`                 |
| Projects (+ case-study pages) | `src/content/projects.ts`            |
| Technical arsenal           | `src/content/arsenal.ts`               |
| Certification, field work   | `src/content/credentials.ts`           |
| Research categories & focus areas | `src/content/research-focus.ts`  |
| Research articles           | `src/content/research/*.mdx`           |

### Publishing a research article

1. Copy `src/content/research/_template.mdx` to `src/content/research/my-article.mdx` (file name = URL slug).
2. Edit the exported `metadata` (title, summary, category, date, tags). Keep `draft: true` while writing — drafts show in `npm run dev` but are excluded from production builds and the sitemap.
3. Write the article in Markdown/MDX below the metadata.
4. Set `draft: false`, commit and push. The article appears in the Research index, gets its own page at `/research/my-article`, and is added to the sitemap.

> Do not publish details from private bug bounty programs without explicit permission from the program.

### Adding a project

Add an entry to `projects` in `src/content/projects.ts`. The `visual` field selects the interactive illustration (`"flags"` or `"canary"`); add a new component in `src/components/projects/` and map it in `project-visual.tsx` for a new one.

## Contact form

`POST /api/contact` (`src/app/api/contact/route.ts`) sends mail through [Resend](https://resend.com). Protections:

- Server-side validation with zod (shared schema in `src/lib/contact.ts`), body size limit, JSON-only
- Same-origin check on the `Origin` header
- Honeypot field and minimum fill time — bots receive a fake success
- Per-IP rate limiting (3/minute, 10/day). It is in-memory, so per serverless instance; swap `src/lib/rate-limit.ts` for Upstash Redis if a strict global limit is needed
- Plain-text email only; the visitor's address is used as `reply-to`, never as sender
- The API key is only read on the server and never shipped to the browser

### Setup

1. Create a free account at resend.com and create an API key.
2. Set `RESEND_API_KEY` in `.env.local` and in Vercel's environment variables.
3. Without a verified domain, Resend's test sender (`onboarding@resend.dev`) can only deliver to **your Resend account's email address**, so set `CONTACT_TO_EMAIL` to that address (or sign up to Resend with `mrityunjayk1812@gmail.com`).
4. Optional, once you own a domain: verify it in Resend and set `CONTACT_FROM_EMAIL`.

If the key is missing, the form shows a friendly error pointing visitors to the email address.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: Next.js (auto-detected). No build settings need changing.
3. Add environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `NEXT_PUBLIC_SITE_URL` (your final URL, e.g. `https://your-project.vercel.app`).
4. Deploy. Redeploy after changing `NEXT_PUBLIC_SITE_URL` so metadata and the sitemap pick it up.

### Custom domain (later)

Vercel → Project → Settings → **Domains** → add the domain and create the DNS records Vercel shows at your registrar. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Security headers

Set in `next.config.ts`: Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`. External links use `rel="noopener noreferrer"`.

## Structure

```
src/
  app/              routes, metadata, OG image, sitemap, robots, API
  components/       hero, layout, sections, projects visuals, research, contact, ui
  content/          all editable site content (+ research MDX)
  lib/              research loader, contact schema, rate limiter
```
