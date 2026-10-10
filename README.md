# Orbit Dev Studios

The marketing website for **Orbit Dev Studios**, a studio that designs and builds websites, web applications, UI/UX, e-commerce and custom software. It is a fast, SEO-prerendered React site with a blog, case studies, an **AI project estimator** on the pricing page, and a built-in AI assistant (**Orbit AI**) that supports text and voice input.

Live at: https://orbit-dev-studio.vercel.app

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript, built with Vite |
| Styling | Tailwind CSS v4 (CSS-native `@theme` config in `src/index.css`) |
| Routing | React Router v7 |
| Animation | Framer Motion, Lenis (smooth scroll) |
| Icons | Lucide React (with the site-wide `GradientIcon` treatment), react-icons (tech badges) |
| Forms | React Hook Form + Zod |
| AI features | Vercel serverless functions in `api/`: chat, voice transcription and price estimates. OpenRouter is the primary provider with automatic Groq fallback |
| Email (Start Your Project + Free Audit forms) | EmailJS (client-side) |
| Email (Careers apply form) | A small separate Express server (`server/`) using Nodemailer |
| Analytics | Google Analytics 4, optional and loaded only when `VITE_GA_MEASUREMENT_ID` is set |
| SEO | `react-helmet-async` per-page metadata and JSON-LD, plus a build-time prerender script that also generates `sitemap.xml` |

## Navigation

- **Navbar:** Services, Work, Pricing, About Us, Blog, and a **Start Your Project** button (→ `/hire`). The mobile menu also lists Industries, Technologies, FAQ, Privacy Policy and Terms.
- **Footer:**
  - **Company:** About, Our Work, Pricing, Careers, Let's Talk.
  - **Resources:** Services, Industries, Technologies, Blog, Free Website Audit, FAQ, Security & Privacy.
  - **Connect:** email, Instagram, LinkedIn.
  - **Bottom bar:** Privacy Policy and Terms.
- **Orbit AI chat widget:** floating button, bottom-right, on every page.

Nav and footer links live in [src/data/navigation.tsx](src/data/navigation.tsx). The navbar's own list is in [Navbar.tsx](src/components/ui/Navbar.tsx).

## Pages and what they contain

Each page lives in `src/pages/` and is assembled from section components in `src/components/sections/`. Most sections below the hero are lazy-loaded.

### Home (`/`), [Home.tsx](src/pages/Home.tsx)
| Section | Content |
|---|---|
| `Hero` | "Digital experiences built for growth." with a "Design · Develop · Launch · Grow" eyebrow, **Start Your Project** / **View Our Work** CTAs, trust points (free consultation, NDA on request, modern stack, post-launch support) and the galaxy particle background |
| `StoryStats` | "Built for teams that demand precision": stat cards for Tech Stack, Projects, Clients and Team |
| `HomeTrustedBy` | "Brands & products we've designed and built": names (and logos where available) of the real portfolio projects |
| `HomeServices` | 6 services: Website Development, Web Application Development, UI/UX Design, E-commerce Development, Custom Software, Website Redesign & Optimization. Each has benefits and an **Explore Service** link |
| `FeaturedProjects` | Highlighted projects with links to their case studies |
| `HomeWhyOrbit` | "Why Orbit": Business first, Modern design, Performance focused, Scalable development, Transparent communication, Long-term support |
| `TechStackMarquee` | Scrolling strip of technologies |
| `Testimonials` | "What our partners say" carousel (see *Content to verify*) |

### Services (`/services`), [Services.tsx](src/pages/Services.tsx)
| Section | Content |
|---|---|
| `ServicesHero` | "End-to-End Digital…" intro with particle animation |
| `ServicesGrid` | 7 service cards (Web Application Engineering, Mobile, UX/UI, Custom Software, AI & Emerging Tech, Growth Engineering, QA & Testing) with tech chips |
| `ServicesDomains` | Solutions by business domain: AI / ML / IoT, Web & Mobile Apps, Digital / IT Services |
| `ServicesProcess` | "How We Take Your Idea to Production" |
| `ServicesBenefits` | "Why Businesses Choose OrbitDevStudio" |
| `ServicesMetrics` | Delivery highlights band |
| `ServicesTechnologies` | "Built for Global Reach" |
| `FreeAuditSection` | "Get a Free Website Audit" lead form (compact) |

### Work (`/portfolio`), [Portfolio.tsx](src/pages/Portfolio.tsx)
The portfolio and case studies are merged into one page. `/case-studies` redirects here.
| Section | Content |
|---|---|
| `PortfolioHero` | Intro |
| `PortfolioGrid` | Filterable grid of 11 real projects: ProBuild ERP (Industrial); Orbit Food, BookVerse (E-commerce); RecruitIQ, KnowledgeVoice (AI & SaaS); ShivedLife Medicare, PharmaCare Platform (Healthcare); Aura Design Studio, Designerss Creative (Architecture); Navnidhi Trading (Corporate); Elegant Wedding (Personal). Each card has **View Case Study** |
| `PortfolioCTA` | "Your Project Could Be Next" |

### Case study pages (`/case-studies/:slug`), [CaseStudy.tsx](src/pages/CaseStudy.tsx)
One page per project, generated from [src/data/projects.ts](src/data/projects.ts), the single source of project data that the portfolio grid and featured projects also use.
- **Structure:** hero (industry, summary, live-site link, screenshot) → facts (client, industry, services, technologies) → Challenge → Objective → Our Approach → Design → Development → Technologies → Outcome → Screenshots → Testimonial → previous/next project → **Start Your Project**.
- Fields with no verified data are hidden, not shown as placeholders. The Client row appears only when `caseStudy.client` is set, and Client Feedback only when `caseStudy.testimonial` holds a real quote.

### Pricing (`/pricing`), [Pricing.tsx](src/pages/Pricing.tsx)
No fixed prices are shown: every project is priced to its requirements.
| Section | Content |
|---|---|
| Hero | Intro + **Estimate My Project** (→ `#estimate`) |
| `PricingEstimator` | **AI project estimator** (`#estimate`). The visitor picks a project type, size, features, design level, timeline and currency (USD/INR/EUR/GBP/AUD/CAD), plus an optional description, then gets an estimated price range, timeline, breakdown and assumptions, with an "indicative only" disclaimer and **Get an Exact Quote** (→ `/hire`). See *AI project estimator* below |
| `PricingTiers` | Starter / Professional / Enterprise scope: what's included, typical scope and timeline, "Priced to your requirements" |
| `PricingComparison` | Feature-by-package comparison table |
| `PricingAddons` | Maintenance & support, hosting & deployment, SEO, redesign (quoted separately) |
| `PricingFAQ` | Cost questions, including "How accurate is the AI estimate?" |
| `PricingCTA` | "Not sure which package is right for you? Talk to us.": **Let's Talk** + email |

### About Us (`/about`), [About.tsx](src/pages/About.tsx)
| Section | Content |
|---|---|
| `AboutHero` | "Engineering digital…" intro |
| `AboutStory` | "Built by engineers, for…": origin story with photos |
| `AboutMission` | Mission and vision statements |
| `AboutStats` | Number band (see *Content to verify*) |
| `AboutValues` | "What drives us forward": core values (the reference style for gradient icons) |
| `AboutProcess` | 7-step process (`#process`): Discovery → Strategy → UI/UX → Development → Testing → Launch → Support. `/process` redirects here |
| `HomeFinalCTA` | "Let's build something great." |

### Blog (`/blog` and `/blog/:slug`), [Blog.tsx](src/pages/Blog.tsx), [BlogPost.tsx](src/pages/BlogPost.tsx)
- **Data:** posts live in [src/data/blog.ts](src/data/blog.ts). Each has a slug, meta title and description, category, tags, author, publish date, and content blocks; reading time is computed.
- **Categories:** Web Development, UI/UX, Business, E-commerce, Technology, Website Optimization.
- **Index:** featured post, category filter (`/blog?category=ui-ux`), post grid, free-audit CTA.
- **Article page:** breadcrumb, cover, body, tags, share links, related posts, end CTA, and `BlogPosting` JSON-LD.
- **7 articles:**
  - 10 Signs Your Business Website Needs a Redesign
  - How a Better Website Can Generate More Leads
  - Website vs Web Application
  - How to Improve Website Performance
  - What Makes a High-Converting Business Website?
  - React vs Next.js for Modern Web Development
  - Why Roofing Companies Lose Leads Because of Their Website

To add a post, append an entry to `src/data/blog.ts`. The route, sitemap and prerendered meta are generated automatically.

### FAQ (`/faq`), [FAQ.tsx](src/pages/FAQ.tsx)
22 questions in 5 categories (Pricing & Timeline, Process & Communication, Design & Development, Launch & Support, Working Together). It has category tabs, search, an accessible accordion and `FAQPage` JSON-LD, and `/faq#<question-id>` deep-links open a question. Data: [src/data/faqs.ts](src/data/faqs.ts).

### Free Website Audit (`/free-audit`), [FreeAudit.tsx](src/pages/FreeAudit.tsx)
Lead magnet covering UI/UX, mobile, performance, SEO fundamentals and conversion.
- **Page:** hero, then the audit form (Name, Company, Website URL, Email, Message; sent via EmailJS), "How it works" in 3 steps, and audit FAQs.
- **Reuse:** the form is the reusable [FreeAuditSection.tsx](src/components/sections/FreeAuditSection.tsx), which also appears on the homepage.

### Security & Privacy (`/security`), [Security.tsx](src/pages/Security.tsx)
General practices only, with no certification claims:
- HTTPS, data handling, access control, authentication and backups
- Third-party services, client confidentiality and NDAs
- Responsible-disclosure contact

### Industries (`/industries`), [Industries.tsx](src/pages/Industries.tsx)
| Section | Content |
|---|---|
| `IndustriesHero` | "Empowering Industries…" |
| `IndustriesGrid` | Healthcare & Medical, E-Commerce, Architecture, Interior Design, Custom Portfolios, Travel Agencies, Restaurant |
| `IndustriesShowcase` | "Industry Success Stories" (RecruitIQ, KnowledgeVoice) → their case studies |
| `IndustriesStory`, `IndustriesTechClusters`, `IndustriesWhyUs`, `IndustriesFAQ`, `IndustriesCTA` | Industry expertise, stack by industry, why clients choose us, FAQ, CTA |

### Technologies (`/tech`), [TechStack.tsx](src/pages/TechStack.tsx)
`TechHero`, `TechLayers` (Front-end, Back-end & APIs, Database, Mobile), `TechWhyUs`, `TechDelivery`, `ProcessTimeline` (engineering process: Discovery → Architecture → UI/UX → Agile Development → Security & Privacy → Secure DevOps), `TechCTA` ("Let's Choose Your Stack Together").

### Start Your Project / Hire (`/hire`), [HireUs.tsx](src/pages/HireUs.tsx)
`HireHero`, `HireProcess` (4 steps), `HireModels` (Full Time / Part Time / Hourly), `HireWhyUs`, `HireSkills`, `HireForm` (project inquiry via EmailJS). `/contact` redirects here.

### Careers (`/careers`), [Careers.tsx](src/pages/Careers.tsx)
`CareersHero`, `CareersBenefits`, `CareersOpenings` (open roles + **Apply Now** form with résumé upload → `/api/apply`, see below).

### Legal and other
| Route | Content |
|---|---|
| `/privacy-policy` | Privacy Policy describing what this site actually does with data: forms (EmailJS), careers applications, the AI chat and voice input (OpenRouter/Groq), analytics, cookies/local storage, retention, rights, client-project data. Has section navigation. **Have it reviewed by a legal professional.** |
| `/terms` | Terms & Conditions |
| `*` | 404 page |

## AI features

All three endpoints share the same provider chain and guards in `api/_lib/`.

### Orbit AI chat assistant
A floating chat widget ([AIChatWidget.tsx](src/components/ui/AIChatWidget.tsx)) that loads after the page is idle.
- **Answers:** streamed word by word, with clickable in-site links, suggested starter questions and a "Prefer a human?" link.
- **Voice input:** tapping the mic shows "Turning on the microphone…" while it warms up, then "Listening… start speaking"; words appear live in the input box as the visitor talks, and stopping leaves the text there to edit or send (capped at 60 s).
  - Live text comes from the browser's built-in speech recognition (Chrome, Edge, Safari).
  - A backup recording runs alongside it, so if live recognition returns nothing, the audio is transcribed by Groq Whisper instead.
  - Browsers without that service (Firefox, Brave) record and then transcribe with Whisper. Logic: [src/hooks/useVoiceInput.ts](src/hooks/useVoiceInput.ts).
- **Strict scope:** greetings, questions about Orbit Dev Studios, and visitors describing what they want built. It declines everything else, including coding help, general knowledge and jailbreak attempts. It never states prices; it points to the estimator instead. Only same-site links are made clickable, because models sometimes invent domains.
- **Knowledge:** the company facts and rules are in [api/_lib/knowledge.js](api/_lib/knowledge.js). **Update it when services, projects or contact details change.**

### AI project estimator
`POST /api/estimate` ([api/estimate.js](api/estimate.js)), used by the Pricing page.
1. The server computes an anchor range from the internal price guide, [api/_lib/pricingGuide.js](api/_lib/pricingGuide.js). It has base ranges per project type, size and design multipliers, per-feature costs and a rush premium, all in USD.
2. The AI refines it based on the visitor's description and writes the summary, breakdown and assumptions. The description is treated as untrusted data.
3. The server keeps the AI's numbers within the guide's bounds, tightens the range to at most about 1.7×, converts the currency using the fixed rates in the guide, and rounds.
4. If both AI providers fail, the guide's own estimate is returned (`source: "guide"`), so visitors always get a result.

**Tune `pricingGuide.js` to the business's real pricing and exchange rates; the values in it now are samples.**

### Provider fallback ([api/_lib/llm.js](api/_lib/llm.js))
1. **OpenRouter** (`OPENROUTER_CHAT_MODEL`) is tried first.
2. If it errors, times out (20 s without a first token) or returns nothing, **Groq** takes over (`GROQ_API_MODEL_ACCURATE`, then `GROQ_API_MODEL_FAST`).
3. A failed provider is skipped for 5 minutes, or 30 minutes on auth or billing errors. If OpenRouter goes down permanently, requests go straight to Groq with no added delay.

| File | Purpose |
|---|---|
| `api/chat.js` | `POST /api/chat`: streams the assistant's reply |
| `api/transcribe.js` | `POST /api/transcribe`: audio → Groq Whisper → `{ text }` |
| `api/estimate.js` | `POST /api/estimate`: AI price estimate (see above) |
| `api/_lib/llm.js` | Provider chain, streaming, fallback and cooldowns (`streamChat`, `completeChat`) |
| `api/_lib/knowledge.js` | Chat assistant system prompt |
| `api/_lib/pricingGuide.js` | Internal pricing guide and currency rates for the estimator |
| `api/_lib/guard.js` | Same-origin check + per-IP rate limits (chat 20, voice 15, estimate 10 per 5 min; best-effort on serverless) |

API keys are used only on the server and never reach the browser bundle. Vercel does not expose files in `api/_lib/` as routes.

## Analytics

[src/lib/analytics.ts](src/lib/analytics.ts) loads GA4 only when `VITE_GA_MEASUREMENT_ID` is set. Without it, events are no-ops (logged to the console in dev).
- **Page views:** `page_view` on every route change.
- **CTA clicks:** add `data-track="label"` (and optionally `data-track-location="section"`) to any link or button and a global listener sends `cta_click`. `data-track="book_call"` sends `book_call_click`.
- **Automatic:** `email_click` and `phone_click` fire for `mailto:` / `tel:` links.
- **Custom events:**
  - `chat_open`, `chat_message`
  - `form_submit`, `audit_submit`
  - `pricing_view`, `estimate_request`, `estimate_result`
  - `case_study_view`, `blog_view`, `blog_share`

## Environment variables

Create a `.env` file in the project root (it is gitignored):

```env
# AI: primary provider
OPENROUTER_API_KEY=
OPENROUTER_CHAT_MODEL=openai/gpt-4o-mini

# AI: fallback provider + voice transcription
GROQ_API_KEY=
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_API_MODEL_ACCURATE=openai/gpt-oss-120b
GROQ_API_MODEL_FAST=openai/gpt-oss-20b
# Optional, defaults to whisper-large-v3-turbo
GROQ_STT_MODEL=

# Optional: Google Analytics 4 measurement ID (e.g. G-XXXXXXX)
VITE_GA_MEASUREMENT_ID=
```

- At least one AI provider key is needed for chat. The estimator still works without AI by using the price guide. Voice input needs `GROQ_API_KEY`.
- **In production**, add the same variables in Vercel → Project → Settings → Environment Variables. Vercel does not read the local `.env` file.

## Project structure

```
api/                          Vercel serverless functions: chat, transcribe, estimate
└── _lib/                     Provider fallback, prompts, pricing guide, guards

src/
├── pages/                    One file per route (see "Pages and what they contain")
├── components/
│   ├── sections/             Page sections; each page composes several
│   ├── blog/                 Article body renderer, covers, post cards
│   ├── case-studies/         Case-study building blocks (previews, tech chips, CTA)
│   ├── ui/                   Navbar, Footer, CompanyLogo, AIChatWidget, GradientIcon
│   └── providers/            LenisProvider (smooth scroll)
├── data/                     projects.ts, blog.ts, faqs.ts, pricing.ts, navigation.tsx
├── lib/                      analytics.ts
├── hooks/                    useVoiceInput (mic recording + transcription)
├── layouts/                  MainLayout: Navbar, Footer, chat widget, analytics, icon gradient
├── context/                  ThemeContext: dark/light theme state
├── config/                   site.ts: canonical SITE_URL
└── utils/                    Small helpers

public/                       Images, project screenshots, robots.txt
server/                       Standalone Express app for the Careers "Apply Now" form (not deployed by Vercel)
scripts/prerender.js          After `vite build`: writes a static index.html with title, description,
                              canonical and OG tags for every route (including each blog post and
                              case study, read from src/data), and generates dist/sitemap.xml
```

## Design system

- **Theme:** dark by default. The custom `light:` Tailwind variant layers in light-mode styles when `<html>` has `.light` (toggled by `ThemeContext`):
  ```tsx
  <h1 className="text-white light:text-slate-900">...</h1>
  ```
- **Tokens:** design tokens are CSS custom properties in `src/index.css` (`:root` = dark, `.light` = light).
- **Shared classes:** `.btn-primary` (brand gradient CTA), `.glass-panel`, `.card-dark`, `.section-white` (grid-paper background), `.text-gradient` (uses `--gradient-text`, which has a brighter start in dark mode so headline words stay readable), `.text-gradient-blue`, `.chip-*`.
- **Backgrounds:** every page uses only two shades, alternating automatically. `MainLayout` marks each top-level `<section>` and the footer with `data-shade="a"`/`"b"` in page order:
  - **a** = `--rt-surface-2`: dark `#101A2D` / light `#F8FAFC`
  - **b** = `--rt-surface-1`: dark `#0B1222` / light `#FFFFFF`

  The shade overrides a section's own background class. Just wrap new page content in `<section>` elements; don't add black or grid/line backgrounds.
- **Page heroes:** every page except Home and blog articles opens with `<PageHero>` ([PageHero.tsx](src/components/sections/PageHero.tsx)).
  - **Shared:** the same particle starfield, constellation line and pulsing glow in both themes.
  - **Per page:** the eyebrow, heading (second line in the gradient), description and optional stats/CTAs are on the left; a figure is on the right (below the text on mobile).
  - **Figures:** each page's figure lives in [src/components/hero-figures/](src/components/hero-figures/) (e.g. `AboutFigure`, `PricingFigure`, `SecurityFigure`). For a new page, add a figure there and pass it as `figure`.
- **Icons:** use `<GradientIcon icon={Rocket} />` ([GradientIcon.tsx](src/components/ui/GradientIcon.tsx)) for any feature icon. It gives the blue → cyan gradient stroke in a tinted tile, matching the About page values, with hover glow when its card has the `group` class. The gradient is defined once in `MainLayout`.
- **Unverified facts:** never shown as placeholders on the site. Leave the field unset and the UI hides it.

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server (default `http://localhost:5173`). The AI endpoints run inside the dev server through a small plugin in `vite.config.ts`, so no separate server is needed. It reads the root `.env` automatically.

### Running the Careers "Apply Now" form locally

The Careers form posts to `/api/apply`, which Vite proxies to a separate Express server:

```bash
cd server
npm install
node index.js
```

It expects a `server/.env` with `PORT=3001`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server (includes the AI endpoints) |
| `npm run build` | Type-check, build for production, prerender every route and generate the sitemap |
| `npm run preview` | Preview the production build locally |

## Deployment

Deployed on Vercel from the `main` branch. Vercel serves `dist/` and deploys everything in `api/` as serverless functions. Set the environment variables above in the Vercel dashboard.

`vercel.json` redirects:
- `/hire-us` and `/contact` → `/hire`
- `/tec` and `/technologies` → `/tech`
- `/case-studies` → `/portfolio`
- `/process` → `/about#process`

## Content to verify before launch

The site avoids presenting unverified facts as real. These items need the owner's input:
- **Pricing guide**: sample ranges and currency rates in `api/_lib/pricingGuide.js`.
- **Case studies**: client names, results and testimonials are hidden until real ones are added to `src/data/projects.ts` (`client`, `testimonial`). RecruitIQ has no screenshot, and its live URL currently returns a Vercel 404.
- **Testimonials** (homepage): they use stock avatars from randomuser.me and include 3-star reviews. Replace them with verified client testimonials and real photos, or remove them.
- **Stats**: About (10+ products, 24/7 support, 15+ technologies) and StoryStats numbers.
- **FAQ / Pricing answers**: code ownership, hosting accounts, maintenance scope, payment milestones.
- **Free Audit / Security**: confirm the 2–3 business-day audit turnaround and the 3-business-day disclosure acknowledgement are commitments you can keep.
- **Privacy Policy**: add specific data retention periods, and get a legal review.
- **Terms**: not reviewed yet.

## Known gaps

- **Security:** `server/.env` (live SMTP credentials) is still tracked in git and has been pushed to GitHub. Rotate that password, then run `git rm --cached server/.env`.
- The Careers `/api/apply` endpoint has no production routing. It works only via the local Express server.
- Rate limiting is in-memory (best-effort on serverless). Use a shared store such as Upstash Redis if the endpoints get abused.
- The Free Audit form reuses the Start-Your-Project EmailJS template. Fields like company and website are folded into the message unless the template is updated.
