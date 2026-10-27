/**
 * ============================================================================
 * PROJECT DETAIL PAGE — case study route
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Static case-study route. Slugs come from data/projects.json (SSG).
 *   Navbar and footer are rendered by the root layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit project fields in data/projects.json (summary, caseStudy, client,
 *      completionDate, role, tags, coverImage, websiteUrl, githubUrl).
 *   2. Edit section labels in config/site.ts → caseStudyPage.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectCaseStudy } from "@/components/project-case-study"
import {
  getAllProjectSlugs,
  getProjectCaseStudy,
} from "@/lib/projects-data"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectCaseStudy(slug)
  if (!project) {
    return { title: "Project" }
  }
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectCaseStudy(slug)
  if (!project) notFound()

  return <ProjectCaseStudy project={project} />
}
