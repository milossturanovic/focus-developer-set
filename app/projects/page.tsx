/**
 * ============================================================================
 * PROJECTS PAGE — list shell
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Placeholder project list wired to data/projects.json. Navbar and footer
 *   come from the root layout. Replace this layout in the design phase.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit projects in data/projects.json — not this file.
 *   2. Draft projects (status: "draft") are hidden automatically.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"

import { getListProjects } from "@/lib/projects-data"

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects.",
}

export default async function ProjectsPage() {
  const projects = await getListProjects()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Projects list — replace with your design
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        Content comes from{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
          data/projects.json
        </code>
        . Add, edit, or hide projects there.
      </p>

      {projects.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No published projects yet. Add one in data/projects.json.
        </p>
      ) : (
        <ul className="mt-10 space-y-6">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="overflow-hidden rounded-lg border border-border">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {/* Native img: coverImage may be a path, URL, or SVG data URI. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {project.category} · {project.completed}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight">
                      {project.title}
                    </h2>
                    {project.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
