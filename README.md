# Yohartt Real Estate — website

Showcase website for Yohartt Real Estate, Addis Ababa. Built with **Next.js 16 (App Router) + TypeScript**. It uses no UI libraries: the animations are hand-written CSS and React.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript only |

Requires Node.js 20.9 or newer.

## What's on the site

**Home (`/`)**
- Preloader, hero, and a manifesto whose words light up as you scroll.
- **Floor explorer for Yohartt Tower:** hover or tap any floor on the rendering, or use the elevator buttons. "Enquire about Level X" pre-fills the contact form with that floor.
- **Construction story:** vertical scrolling moves sideways through the site photos on desktop; on phones the photos stack.
- Delivered project, commitments, and an enquiry form.

**Project pages (`/projects/<slug>`)**
- One page per project: specs, highlights, a gallery, and an enquiry form with the project already selected. Yohartt Tower's page includes the floor explorer.

**Built in:** a self-hosted font with no layout shift, optimized responsive images (AVIF/WebP with blur placeholders), a sitemap, robots.txt, a social share image, a custom 404 page, reduced-motion support, and a no-JS fallback.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, WhatsApp, company name | `src/data/site.ts` |
| Projects (add a new one → it gets its own page) | `src/data/projects.ts` |
| Tower floor names, descriptions, highlights | `src/data/floors.ts` |
| Home page sections and copy | `src/components/sections/` |
| Colours, fonts, spacing (design tokens at the top) | `src/app/globals.css` |
| Photos | `src/assets/img/` (import them in `projects.ts`) |

> **Before launch:** replace the placeholder phone, WhatsApp number and email in `src/data/site.ts`. Check the copy too: several facts were written from the photos (G+14, parking, glazing), and the completed building is called "Completed Residence" until you give it a real name.

### Adding a project

1. Put its photos in `src/assets/img/`.
2. Import them in `src/data/projects.ts` and add an entry to `projects`.
3. That's it. `/projects/<slug>` is generated automatically and added to the sitemap.

If you replace the tower rendering, you also need to re-trace the floor outlines (`FLOOR_SHAPES` in `src/data/floors.ts`). They're polygons in the image's own pixel coordinates (589×1080).

## Enquiry form → Telegram and/or email

The form posts to `/api/enquiry`. That endpoint validates the data, blocks bots with a hidden honeypot field, rate-limits each visitor, and forwards the enquiry to whichever channels you configure:

| Channel | Environment variables |
| --- | --- |
| Telegram (group or chat) | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `ENQUIRY_EMAIL_TO`, `ENQUIRY_EMAIL_FROM` |

See `.env.example`. Locally, copy it to `.env.local`; on Vercel, add the variables under Settings → Environment Variables.

**Until a channel is configured**, the form still works: it opens the visitor's email app with the enquiry pre-written. The WhatsApp button always opens a pre-filled WhatsApp chat.

**Setting up Telegram:** message `@BotFather` → `/newbot` → copy the token. Add the bot to your sales group and send any message there. Then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy the `chat.id`. Group IDs start with `-`.

## Deploying

**Vercel (recommended).** Import the GitHub repo at vercel.com/new; there's nothing to configure. Then:
- set `NEXT_PUBLIC_SITE_URL` to your domain, so social previews and the sitemap use the right URLs
- add the enquiry variables above

**Other hosts.** Any Node.js host works: `npm run build && npm start`. GitHub Pages can't run the enquiry endpoint, because it only serves static files.

## Project structure

```
src/
  app/
    layout.tsx               fonts, metadata, global UI (nav, footer, cursor, lightbox)
    page.tsx                 home page
    projects/[slug]/page.tsx project pages
    api/enquiry/route.ts     enquiry endpoint (Telegram / email)
    globals.css              design system + all styles
    sitemap.ts, robots.ts, not-found.tsx, icon.svg, opengraph-image.jpg
  components/
    sections/                server-rendered page sections
    FloorExplorer.tsx        interactive tower (client)
    ProcessScroller.tsx      pinned horizontal scroll (client)
    ContactForm.tsx          enquiry form (client)
    MotionEffects.tsx        reveal / count-up / parallax driven by data-* attributes
    Preloader, Nav, PointerFx, Lightbox, Manifesto, EnquiryContext, icons
  data/                      site config, projects, tower floors
  lib/                       enquiry validation & formatting (shared by form and API)
  assets/img/                source photos (optimized at build time by next/image)
```
