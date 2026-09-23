# Focus Developer Set

A light, editorial developer portfolio template built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Designed pages are included — edit content in config and JSON, then deploy.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)

---

## What's inside

- **Routes**: Home (`/`), `/projects`, `/projects/[slug]`, `/contact`
- **Home**: Editorial hero (projects + resume CTAs), about, how I contribute, toolkit, experience chart, selected projects slider, reach
- **Projects page**: Poster grid wired to `data/projects.json`
- **Case study pages**: Long-form detail with cover, sidebar, share, and next-project nav
- **Contact page**: Split layout and a message form (UI-only until you wire a provider)
- **Global chrome**: Navbar + footer from `config/site.ts`
- **Content workflow**: Branding in `config/site.ts`, projects in `data/projects.json`
- **No backend, no database, no env vars required**

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build
npm run start
```

---

## How to edit your portfolio

1. **Edit `config/site.ts`** — name, role, email, social links, nav
2. **Edit `data/projects.json`** — add, edit, or hide projects (`status: "draft"`)
3. **Swap images under `public/`** (covers, case-study heroes, about photo, `resume.pdf`)
4. **Run `npm run dev`** to preview
5. **`git commit` and `git push`** — your host redeploys

No CMS, no database, no admin login.

### Project schema

Required: `id`, `slug`, `title`, `description`, `category`, `tech`, `completed`.

Optional: `featured`, `status`, `tags`, `client`, `duration`, `coverImage`, `screenshots`, `highlights`, `impact`, `websiteUrl`, `githubUrl`.

`status`: `"published"` (default) or `"draft"` (hidden).

Full schema: top of `lib/projects-data.ts`.

---

## Where to edit

| What you want to change | File |
| ----------------------- | ---- |
| Site name, role, email, social | `config/site.ts` |
| Page title & meta description | `config/site.ts` (via layout) |
| Hero headline, bio, CTAs, stats | `config/site.ts` → `hero` |
| About heading, paragraphs, photo | `config/site.ts` → `about` |
| How I Contribute heading, cards | `config/site.ts` → `services` |
| Toolkit heading, groups, tools | `config/site.ts` → `toolkit` |
| Experience heading, years, roles | `config/site.ts` → `experience` |
| Selected projects heading / intro | `config/site.ts` → `selectedProjects` |
| Projects page heading / intro | `config/site.ts` → `projectsPage` |
| Case study labels | `config/site.ts` → `caseStudyPage` |
| Contact page heading, panel, form copy | `config/site.ts` → `contactPage` |
| Reach heading, channels, CTAs | `config/site.ts` → `reach` |
| Nav links | `config/site.ts` → `navItems` |
| Projects (every page) | `data/projects.json` |
| Contact form wiring | `components/contact-form.tsx` |
| Theme colors | `app/globals.css` |
| Home layout | `app/page.tsx` + `components/sections/` |

See `CUSTOMIZATION.md` for details.

---

## Project structure

```
focus-developer-set/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                 # home sections + featured projects
│   ├── contact/page.tsx
│   └── projects/
│       ├── page.tsx             # projects archive
│       └── [slug]/page.tsx      # case study (SSG)
├── components/
│   ├── site-navbar.tsx
│   ├── site-footer.tsx
│   ├── contact-form.tsx
│   ├── project-poster-card.tsx
│   ├── project-case-study.tsx
│   ├── animated-burger-icon.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── services-section.tsx
│   │   ├── toolkit-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── selected-projects-section.tsx
│   │   └── reach-section.tsx
│   └── ui/                      # shadcn primitives + sidemenu
├── config/site.ts
├── data/projects.json
├── lib/projects-data.ts
└── public/                      # buyer assets (about photo, project covers)
```

---

## Documentation

| File | Purpose |
| ---- | ------- |
| `QUICK-START.md` | 15-minute setup checklist |
| `CUSTOMIZATION.md` | File-by-file edit guide |
| `DEPLOYMENT.md` | Vercel-first deploy guide |
| `AI_CUSTOMIZATION_PROMPT.md` | Copy-paste AI prompt |
| `LICENSE.md` | Terms + Git hosting exception |

---

## License

See `LICENSE.md`. You may deploy from a **private** Git repo. Do not publish the template source publicly or redistribute the zip.
