# AI Customization Prompt

Copy the prompt below into ChatGPT, Claude, or Cursor after you unzip the template. Replace the bracketed placeholders with your details.

---

```text
I purchased the Focus Developer Set (Next.js 14 portfolio shell). Help me customize it for my job search.

This is a scaffold: routes and content workflow exist, but home / projects / contact are placeholder layouts. Do not clone another Portfolio Sets product’s sections unless I request a specific design.

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
- Home (/) — navbar + hero stub + section placeholder
- Projects (/projects) — list wired to data/projects.json
- Project detail (/projects/[slug]) — SSG detail stub
- Contact (/contact) — info from config + UI-only form
- Navbar and footer (global layout)

Project workflow rules (important):
- All project content lives in data/projects.json — edit that file only for projects.
- Site branding, nav, and social links live in config/site.ts.
- Page title and meta description in app/layout.tsx read from config/site.ts automatically.
- Contact form is UI-only in components/contact-form.tsx (wire sendInquiry when I ask).
- Footer and navbar social links read from config/site.ts — do not duplicate URLs elsewhere.
- Missing coverImage values get SVG placeholders from lib/projects-data.ts.

Tasks (do in order):
1. Update config/site.ts with my real branding and links (name, role, description, url, contact, links, navItems).
2. Replace the 2 placeholder projects in data/projects.json with [N] real or realistic portfolio projects. Keep valid slugs and required fields (id, slug, title, description, category, tech, completed). Fill optional fields where useful: featured, tags, client, duration, coverImage, websiteUrl, githubUrl, highlights.
3. Only if I ask: design unique sections under components/sections/ and compose them in app/page.tsx. Keep the light-minimal tokens in app/globals.css unless I specify a theme.
4. List every file you changed and give me a short test checklist (npm run dev, npm run build, click /, /projects, a project slug, /contact).

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
