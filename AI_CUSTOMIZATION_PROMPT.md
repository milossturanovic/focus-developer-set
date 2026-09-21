# AI Customization Prompt

Copy the prompt below into ChatGPT, Claude, or Cursor after you unzip the template. Replace the bracketed placeholders with your details.

---

```text
I purchased the Focus Developer Set (Next.js 14 portfolio template). Help me customize it for my job search. The home hero, about section, services section, toolkit grid, experience chart, selected projects slider, reach CTA, projects grid, project case-study page, and contact page are already designed — do not rebuild them unless I ask.

Do not add a database, admin panel, or backend unless I ask.

My details:
- Name: [Your Name]
- Role/title: [e.g. Junior Frontend Developer]
- Location: [City, Country]
- Email: [your@email.com]
- GitHub: [URL]
- LinkedIn: [URL]
- Skills to highlight: [e.g. React, TypeScript, Tailwind]
- Target roles: [e.g. junior frontend, freelance web dev]

What is already built:
- Home (/) — editorial typography hero + about strip + services cards + toolkit grid + experience chart + selected projects slider + reach CTA
- Projects (/projects) — poster grid wired to data/projects.json
- Project detail (/projects/[slug]) — editorial case study (hero, cover, sidebar, share, next)
- Contact (/contact) — split editorial layout + UI-only form
- Navbar and footer (global layout)

Project workflow rules (important):
- All project content lives in data/projects.json — edit that file only for projects.
- Site branding, nav, social links, hero copy, about copy, services copy, toolkit copy, experience roles, selected-projects heading, projects-page heading, case-study labels, reach CTA, and contact-page copy live in config/site.ts.
- Page title and meta description in app/layout.tsx read from config/site.ts automatically.
- Home page (app/page.tsx) already composes designed sections — edit copy in config/site.ts → hero, about, services, toolkit, experience, selectedProjects, and reach, not the page layout.
- Projects page (app/projects/page.tsx) already uses the same poster cards as the homepage slider — edit heading copy in config/site.ts → projectsPage.
- Project detail (app/projects/[slug]/page.tsx) already uses the case-study layout — edit labels in config/site.ts → caseStudyPage and long-form copy in data/projects.json.
- Contact page (app/contact/page.tsx) already uses the split layout — edit copy in config/site.ts → contactPage. The form is UI-only in components/contact-form.tsx (wire sendInquiry when I ask).
- Footer name and Home / Projects links read from config/site.ts. Navbar social links also read from config/site.ts — do not duplicate URLs elsewhere.
- Missing coverImage values get SVG placeholders from lib/projects-data.ts.

Tasks (do in order):
1. Update config/site.ts with my real branding and links (name, role, description, url, contact, links, navItems, hero, about, services, toolkit, experience, selectedProjects, projectsPage, caseStudyPage, reach, contactPage). Replace public/resume.pdf with my CV (hero.secondaryCta.href).
2. Replace the sample projects in data/projects.json with [N] real or realistic portfolio projects. Keep valid slugs and required fields (id, slug, title, description, category, tech, completed). Fill optional fields where useful: featured, tags, label, role, summary, caseStudy, completionDate, client, duration, coverImage, screenshots.homepage, websiteUrl, githubUrl, highlights. Mark homepage slider cards with `"featured": true`. Card image = coverImage; case-study hero = screenshots.homepage.
3. List every file you changed and give me a short test checklist (npm run dev, npm run build, click /, /projects, a project slug, /contact).

Constraints:
- Keep TypeScript types valid.
- Do not break existing routes (/ , /projects, /projects/[slug], /contact).
- Do not introduce Supabase, Prisma, or env vars unless required for a feature I requested.
- Prefer small, focused edits over rewriting entire components.
```

---

## Tips

- Run **one step at a time** if the model makes mistakes (e.g. only `config/site.ts` and `data/projects.json` first).
- After AI edits, always run `npm run dev` and click through every page before deploying.
- Commit after each working batch: `git commit -am "Customize site config and projects"`.
- If you swap images, make sure files under `public/` are saved and committed so Vercel can serve them.

## More help

- `QUICK-START.md` — 15-minute setup checklist
- `CUSTOMIZATION.md` — file-by-file reference
- `DEPLOYMENT.md` — publish to Vercel
