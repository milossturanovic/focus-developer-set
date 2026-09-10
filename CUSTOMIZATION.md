# Customization Guide

How to personalize the Focus Developer Set portfolio shell.

## Table of contents

1. [Site configuration](#site-configuration)
2. [Projects (JSON workflow)](#projects-json-workflow)
3. [Pages](#pages)
4. [Contact page](#contact-page)
5. [Navigation & footer](#navigation--footer)
6. [Images](#images)
7. [Colors & theme](#colors--theme)
8. [Typography](#typography)
9. [Adding a new section](#adding-a-new-section)
10. [Adding a new page](#adding-a-new-page)
11. [Tips](#tips)

---

## Site configuration

**File:** `config/site.ts`

Central config for brand, nav, contact, and social links.

```typescript
export const siteConfig = {
  name: "John Doe",
  shortName: "John",
  role: "Junior Frontend Developer",
  description: "Your custom description",
  url: "https://johndoe.dev",
  contact: {
    location: "United States",
    email: "john.doe@example.com",
  },
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:john.doe@example.com",
  },
}
```

Consumed by navbar, footer, contact, home hero, and `app/layout.tsx` metadata. Do not duplicate URLs elsewhere.

Also edit `hero` in the same file:

| Field | Purpose |
| ----- | ------- |
| `headline` | Array of H1 lines |
| `bio` | Supporting paragraph under the heading |
| `cta` | `{ label, href }` for the dark button |
| `stats` | Three `{ label, value }` items in the bottom strip |

Component: `components/sections/hero-section.tsx`.

### About

| Field | Purpose |
| ----- | ------- |
| `title` | Section heading |
| `paragraphs` | Short bio paragraphs (keep to two) |
| `image.src` / `image.alt` | Photo under `/public` and its alt text |

Location under the copy comes from `contact.location`. Component: `components/sections/about-section.tsx`.

### How I Contribute

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |
| `items` | `{ id, icon, title, description, deliverables }` |

`icon` accepts `"layers"`, `"microscope"`, or `"compass"`. Component: `components/sections/services-section.tsx`. Config key remains `services`.

### Toolkit

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |
| `groups` | `{ id, label, tools }` columns |
| `tools` | `{ name, mark }` — `mark` is a two-letter tile abbreviation |

Component: `components/sections/toolkit-section.tsx`.

### Experience

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |
| `axisStart` / `axisEnd` | Year range the bars are scaled against |
| `years` | Labels and vertical grid lines across the top |
| `legend` | `{ fullTime, freelance }` captions |
| `roles` | `{ id, company, role, start, end, type }` |

`type` is `"full-time"` (black bar) or `"freelance"` (gray bar). `start` and `end` are whole years. Component: `components/sections/experience-section.tsx`.

### Selected projects

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |

Cards come from `data/projects.json` — set `"featured": true` and add a `coverImage`. Category on the card is the project’s `category` field. Component: `components/sections/selected-projects-section.tsx`. Shared poster: `components/project-poster-card.tsx`.

### Projects page

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Page heading and supporting copy |

Cards are every published project in `data/projects.json`. Same poster as the homepage slider. Page: `app/projects/page.tsx`.

### Case study page

| Field | Purpose |
| ----- | ------- |
| `backLabel` | Back link to `/projects` |
| `infoTitle` / `technologiesTitle` / `relatedTitle` | Sidebar headings |
| `highlightsTitle` | Fallback list heading when `caseStudy.sections` is empty |
| `livePreviewLabel` / `sourceLabel` | External link buttons |
| `shareLabel` / `nextLabel` | Share row and footer nav |

Component: `components/project-case-study.tsx`. Project copy lives in `data/projects.json`.

### Reach

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |
| `details` | `{ icon, text }` location / hours lines (`pin` or `clock`) |
| `primaryCta` / `secondaryCta` | `{ label, hrefKey }` |
| `channels` | `{ id, icon, name, note, pill, hrefKey }` |

`hrefKey` maps to `links`: `"email"` | `"linkedin"` | `"github"` | `"twitter"`. `icon` accepts `"mail"` | `"linkedin"` | `"github"` | `"x"`. Component: `components/sections/reach-section.tsx`.

### Contact page

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Page heading and supporting copy |
| `locationLine` | Location row (email still comes from `contact.email`) |
| `availability` | Availability row |
| `form` | Field labels, placeholders, button, reply note, success / error copy |

Email and social URLs come from `contact` / `links`. Page: `app/contact/page.tsx`. Form: `components/contact-form.tsx`.

---

## Projects (JSON workflow)

All projects read from one file:

**File:** `data/projects.json`

Helpers live in `lib/projects-data.ts` (types, published filter, SSG slugs, placeholders).

If this file is missing or invalid JSON, **`npm run build` fails** so you catch it before deploy.

### Required fields

`id`, `slug`, `title`, `description`, `category`, `tech`, `completed`

### Useful optional fields

| Field          | Purpose                                      |
| -------------- | -------------------------------------------- |
| `status`       | `"draft"` hides the project                  |
| `featured`     | Shown in the home Selected projects slider   |
| `tags`         | Display labels (defaults to `tech`)          |
| `label`        | Case-study pill (defaults to `category`)     |
| `role`         | Shown in case-study meta                     |
| `summary`      | Hero sentence (defaults to `description`)   |
| `caseStudy`    | `{ intro, sections[] }` long-form body     |
| `completionDate` | Sidebar date (defaults to `completed`)   |
| `client`       | Shown on the detail page                     |
| `duration`     | Shown on the detail page                     |
| `websiteUrl`   | Live site button                             |
| `githubUrl`    | Source button                                |
| `highlights`   | Fallback list if `caseStudy.sections` is empty |
| `coverImage`   | Path under `/public` or a full URL           |
| `screenshots`  | `{ homepage, secondary }` image overrides    |

### Enums

- `status`: `"draft"` or `"published"`
- `category` and `tech` are free-form strings / string arrays in this shell

Workflow: edit JSON → `npm run dev` → commit → push → host redeploys.

---

## Pages

| Route              | File                           | Notes                               |
| ------------------ | ------------------------------ | ----------------------------------- |
| `/`                | `app/page.tsx`                 | Hero + about + services + toolkit + experience + selected projects + reach |
| `/projects`        | `app/projects/page.tsx`        | Poster grid wired to JSON          |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Case study + `generateStaticParams` |
| `/contact`         | `app/contact/page.tsx`         | Split layout + UI-only form         |

Each page has a single `h1`. Navbar and footer come from the root layout.

---

## Contact page

**Files:** `app/contact/page.tsx` (server) and `components/contact-form.tsx` (client)

Heading, intro, location line, availability, and form copy live in `config/site.ts` → `contactPage`. Email and social URLs still come from `contact` and `links`.

### Wiring the form

The form validates in the browser and shows a success panel, but **nothing is sent** until you connect a provider.

**Recommended (easiest):** [Formspree](https://formspree.io) — replace the body of `sendInquiry` in `components/contact-form.tsx` with a `fetch` to your Formspree endpoint (copy-paste example is in the file header and in `DEPLOYMENT.md`).

Also works: Getform, Basin, or Resend + `app/api/contact/route.ts` with an API key in host env vars (never commit `.env` files).

Do not add a database, Prisma, or admin dashboard for the default product.

---

## Navigation & footer

- **Navbar:** `components/site-navbar.tsx` — desktop inline links; mobile sidemenu trigger. Brand, nav items, and drawer socials come from `config/site.ts`.
- **Sidemenu:** `components/ui/sidemenu.tsx` — slide-over panel (same 450ms motion as Dark React). Trigger uses `components/animated-burger-icon.tsx`.
- **Footer:** `components/site-footer.tsx` — name, credit line, and Home / Projects from `config/site.ts`

Edit config first; only change these components when designing a new layout.

---

## Images

| Asset | Path |
| ----- | ---- |
| About photo | `public/about/studio-desk.jpg` via `about.image` |
| Project covers | `public/` via each project’s `coverImage` |
| Other assets | `public/` |

If `coverImage` is omitted, an SVG placeholder is generated. Commit everything under `public/` before deploy.

---

## Colors & theme

**File:** `app/globals.css`

The default theme is a **light minimal placeholder**. Tokens live on `:root` as CSS variables (`--background`, `--foreground`, `--primary`, …). Tailwind maps them via `tailwind.config.ts`.

Prefer theme classes (`bg-background`, `text-muted-foreground`) over hardcoded hex in components.

---

## Typography

Default font is Inter, set in `app/layout.tsx` (`next/font/google`). Swap it there if you want a different typeface.

---

## Adding a new section

Home already includes the editorial hero, about strip, services cards, toolkit grid, experience chart, selected projects slider, and reach CTA. To add another section:

1. Create a file under `components/sections/`
2. Import it from `app/page.tsx`
3. Keep copy in `config/site.ts` / `data/projects.json` where possible

---

## Adding a new page

1. Add `app/your-page/page.tsx`
2. Add a nav item in `config/site.ts` → `navItems`
3. Keep a single `h1` and accessible landmarks

---

## Tips

- One source of truth for identity (`config/site.ts`) and projects (`data/projects.json`)
- Prefer small edits over rewrites
- Run `npm run build` before you deploy (it fails if `projects.json` is missing or invalid)
- Private Git repo + Vercel is the intended publish path (see `LICENSE.md` and `DEPLOYMENT.md`)
