/**
 * ============================================================================
 * PROJECT DETAIL — slug shell (SSG)
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Placeholder detail page for one project. Slugs come from
 *   data/projects.json via generateStaticParams.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit project content in data/projects.json.
 *   2. Missing images render as SVG placeholders automatically.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects-data"

type ProjectPageProps = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) {
    return { title: "Project" }
  }
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Project detail — replace with your design
      </p>
      <p className="mt-6">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          ← All projects
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {project.category} · {project.completed} · {project.client}
      </p>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Native img: coverImage may be a path, URL, or SVG data URI. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.screenshots.homepage}
        alt={`${project.title} preview`}
        className="mt-8 w-full rounded-lg border border-border"
      />

      {project.highlights && project.highlights.length > 0 ? (
        <ul className="mt-8 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {project.websiteUrl ? (
          <Button asChild>
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              Live site
            </a>
          </Button>
        ) : null}
        {project.githubUrl ? (
          <Button asChild variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  )
}
