# OrbitDevStudio

The marketing website for **OrbitDevStudio** — a premium software engineering agency. Built as a fast, SEO-prerendered React site covering the company's services, industries, technology stack, portfolio, hiring, and careers pages.

Live at: https://orbit-dev-studio.vercel.app

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript, built with Vite |
| Styling | Tailwind CSS v4 (CSS-native `@theme` config, no `tailwind.config.js` theme block) |
| Routing | React Router v7 |
| Animation | Framer Motion, Lenis (smooth scroll) |
| Icons | Lucide React, react-icons (Simple Icons for tech badges) |
| Forms | React Hook Form + Zod |
| Email (Hire Us form) | EmailJS (client-side) |
| Email (Careers apply form) | A small separate Express server (`server/`) using Nodemailer |
| SEO | `react-helmet-async` per-page metadata + a build-time prerender script |

## Project structure

```
src/
├── pages/                 One file per route (Home, About, Services, Industries,
│                           TechStack, Portfolio, HireUs, Careers, Blog, legal pages...)
├── components/
│   ├── sections/            The actual page content — each page composes several
│   │                         section components (e.g. ServicesHero, ServicesGrid,
│   │                         ServicesCTA). Most pages lazy-load everything below
│   │                         the hero for performance.
│   ├── ui/                   Shared chrome: Navbar, Footer, CompanyLogo, etc.
│   ├── providers/             LenisProvider (smooth scroll)
│   └── layouts/                MainLayout wraps every page (Navbar + Footer)
├── context/                 ThemeContext — dark/light theme state (see Theming below)
├── config/                  site.ts (canonical SITE_URL used by the prerender script)
└── utils/                    Small helpers (e.g. country codes for phone inputs)

public/
└── projects/                 Portfolio project screenshots/logos

server/                       Standalone Express app powering the Careers page's
                               "Apply Now" form (resume upload + email via Nodemailer).
                               Not part of the Vite/Vercel frontend build.

scripts/
└── prerender.js               Runs after `vite build`; writes a static, pre-rendered
                                index.html for each route (for SEO) using the titles/
                                descriptions defined inside the script itself.
```

## Theming

The site defaults to **dark mode** with no class needed. A custom Tailwind variant,
`light:`, is used throughout components to layer in light-mode styles only when
`<html>` has a `.light` class (toggled by `ThemeContext` / the navbar's theme switch):

```tsx
<h1 className="text-white light:text-slate-900">...</h1>
```

Shared design tokens (surfaces, text colors, the brand gradient, glass-panel tints,
etc.) are defined as CSS custom properties in `src/index.css` under `:root` (dark)
and overridden under `.light`. Most section components also share small conventions
such as `.btn-primary` (the brand gradient CTA) and the `.chip-amber/blue/purple/
green/cyan` tag system used for tech-stack badges.

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server (default `http://localhost:5173`).

### Running the Careers "Apply Now" form locally

The Careers page's application form posts to `/api/apply`, which Vite proxies to a
separate local Express server in development (see `vite.config.ts`):

```bash
cd server
npm install
npm run dev   # or: node index.js — see server/package.json
```

It expects a `server/.env` with:

```env
PORT=3001
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

> **⚠️ Security note:** `server/.env` is currently committed to this repository with
> live SMTP credentials. Rotate that password immediately, then remove the file from
> git tracking (`git rm --cached server/.env`) and add `.env` to `.gitignore` before
> committing again. Everyone who has ever cloned this repo has had access to it.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc`) then build for production, then prerender every route (`postbuild`) |
| `npm run preview` | Preview the production build locally |

## Deployment

Deployed on Vercel from the `main` branch. `vercel.json` defines a few permanent
redirects for legacy URLs (`/hire-us` → `/hire`, `/technologies` → `/tech`, etc.).
The `server/` Express app is **not** deployed as part of this Vercel project — it
needs to be hosted separately (or migrated to a Vercel serverless function under
`api/`) for the Careers apply form to work in production.

## Known gaps

- The Careers "Apply Now" form's `/api/apply` endpoint has no production routing
  configured — it only works against the local dev server via the Vite proxy.
- `server/.env` is tracked in git with real credentials (see the security note above).
