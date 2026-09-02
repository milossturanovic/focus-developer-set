# Customization Guide

How to personalize the Focus Developer Set portfolio shell.

## Table of contents

1. [Site configuration](#site-configuration)
2. [Projects (JSON workflow)](#projects-json-workflow)
3. [Pages (shells)](#pages-shells)
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
  role: "Front End Developer",
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

Consumed by navbar, footer, contact, and `app/layout.tsx` metadata. Do not duplicate URLs elsewhere.

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
| `featured`     | Eligible for a homepage strip later          |
| `tags`         | Display labels (defaults to `tech`)          |
| `client`       | Shown on the detail page                     |
| `duration`     | Shown on the detail page                     |
| `websiteUrl`   | Live site button                             |
| `githubUrl`    | Source button                                |
| `highlights`   | Bullet list on the detail page               |
| `coverImage`   | Path under `/public` or a full URL           |
| `screenshots`  | `{ homepage, secondary }` image overrides    |

### Enums

- `status`: `"draft"` or `"published"`
- `category` and `tech` are free-form strings / string arrays in this shell

Workflow: edit JSON → `npm run dev` → commit → push → host redeploys.

---

## Pages (shells)

Placeholder routes — replace the layout in the design phase:

| Route              | File                           | Notes                               |
| ------------------ | ------------------------------ | ----------------------------------- |
| `/`                | `app/page.tsx`                 | Hero stub + section placeholder     |
| `/projects`        | `app/projects/page.tsx`        | List wired to JSON                  |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Detail + `generateStaticParams`     |
| `/contact`         | `app/contact/page.tsx`         | Info from config + UI-only form     |

Each page has a single `h1`. Navbar and footer come from the root layout.

---

## Contact page

**Files:** `app/contact/page.tsx` (server) and `components/contact-form.tsx` (client)

Email, location, and social links come from `config/site.ts`.

### Wiring the form

The form validates in the browser and shows a success panel, but **nothing is sent** until you connect a provider.

**Recommended (easiest):** [Formspree](https://formspree.io) — replace the body of `sendInquiry` in `components/contact-form.tsx` with a `fetch` to your Formspree endpoint (copy-paste example is in the file header and in `DEPLOYMENT.md`).

Also works: Getform, Basin, or Resend + `app/api/contact/route.ts` with an API key in host env vars (never commit `.env` files).

Do not add a database, Prisma, or admin dashboard for the default product.

---

## Navigation & footer

- **Navbar:** `components/site-navbar.tsx` — reads `siteConfig.navItems` and `siteConfig.name`
- **Footer:** `components/site-footer.tsx` — name, email, and socials from `config/site.ts` only

Edit config first; only change these components when designing a new layout.

---

## Images

| Asset | Path |
| ----- | ---- |
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

Home is a stub. To add a designed section:

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
