/**
 * ============================================================================
 * PROJECTS PAGE — cinematic poster grid
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Archive of every published project, using the same poster cards as the
 *   homepage slider. Navbar and footer come from the root layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit heading / intro in config/site.ts → projectsPage.
 *   2. Edit cards in data/projects.json — not this file.
 *   3. Draft projects (status: "draft") are hidden automatically.
 *
 * ============================================================================
 */

import type { Metadata } from "next"

import { ProjectPosterCard } from "@/components/project-poster-card"
import { siteConfig } from "@/config/site"
import { getListProjects } from "@/lib/projects-data"

export const metadata: Metadata = {
  title: siteConfig.projectsPage.title,
  description: siteConfig.projectsPage.intro,
}

export default async function ProjectsPage() {
  const projects = await getListProjects()
  const { projectsPage } = siteConfig

  return (
    <section
      aria-labelledby="projects-heading"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <h1
          id="projects-heading"
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {projectsPage.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {projects.length === 0
            ? "No published projects yet. Add one in data/projects.json."
            : projectsPage.intro}
        </p>

        {projects.length > 0 ? (
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectPosterCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  titleAs="h2"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
