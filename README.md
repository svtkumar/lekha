# Lekha — Next.js

Next.js 15 app for Lekha, the legal document templates service by Elevana.

Intended live at **lekha.elevana.guru** (Vercel). `elevana.guru/lekha` redirects here.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Vanilla CSS (no Tailwind) — Lekha design tokens in `app/globals.css`
- Playfair Display + Inter from Google Fonts

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

| Path | What's there |
|---|---|
| `/` | Landing page (hero, trust, why, categories, featured, earn, CTA) |
| `/templates` | Category grid; template detail pages TBD |
| `/earn` | Affiliate, Assist, Ambassador |

## Data

Templates and categories live in `lib/data.ts`. Landing page cards read from there. Add a new template → it shows up on `/` and `/templates` automatically.

## Deploying to Vercel

1. Push this folder to a GitHub repo (e.g. `elevana/lekha-next`)
2. At vercel.com → New Project → Import the repo → accept defaults → Deploy
3. After the first deploy succeeds, Vercel gives you a `*.vercel.app` URL — confirm it renders
4. In Vercel project → Settings → Domains → add `lekha.elevana.guru`
5. Vercel shows the DNS record you need. At your DNS provider (WordPress.com domain settings → DNS), add a CNAME:
   - Name: `lekha`
   - Value: `cname.vercel-dns.com`
   - TTL: default
6. Wait ~5 min for DNS. Lekha is live at `lekha.elevana.guru`.

## The `elevana.guru/lekha` redirect

Once Vercel is live, update the WordPress page at /lekha to redirect here. Either:
- Via WP Admin → Page 1931 → replace content with a meta refresh to `https://lekha.elevana.guru/`
- Or ask Claude to do it through the WordPress.com MCP (one call — update page 1931 content)

## What's next

- Template detail pages (`/templates/[slug]`) with guided fill-in forms
- DOCX generation server-side (docx.js or python-docx via API route)
- Affiliate tracking cookie + dashboard
- Ambassador upload flow
- Payment integration (UPI via Razorpay or similar)
