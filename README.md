# Focus Developer Set

A Next.js 14 portfolio **shell** for developers. Routes, config, and a JSON content workflow are in place — pages are labeled stubs so you (or an AI) can design the UI next.

Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)

---

## What's inside

- **Routes**: Home (`/`), `/projects`, `/projects/[slug]`, `/contact`
- **Global chrome**: Navbar + footer from `config/site.ts`
- **Content workflow**: Branding in `config/site.ts`, projects in `data/projects.json`
- **Contact form**: UI-only until you wire a provider
- **No backend, no database, no env vars required**

This is a **scaffold**, not a finished visual design. Home, projects, and contact are clearly marked as placeholders.

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
3. **Add images under `public/`** when you have them
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
│   ├── page.tsx                 # home shell
│   ├── contact/page.tsx
│   └── projects/
│       ├── page.tsx             # list shell
│       └── [slug]/page.tsx      # detail shell (SSG)
├── components/
│   ├── site-navbar.tsx
│   ├── site-footer.tsx
│   ├── contact-form.tsx
│   ├── sections/                # add designed sections here
│   └── ui/                      # shadcn primitives
├── config/site.ts
├── data/projects.json
├── lib/projects-data.ts
└── public/                      # buyer assets
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
