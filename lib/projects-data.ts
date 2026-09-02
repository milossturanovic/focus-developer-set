/**
 * ============================================================================
 * PROJECTS DATA — JSON FILE + RUNTIME HELPERS
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Typed loader and helpers for data/projects.json. Pages import these
 *   functions — they never read the JSON file directly.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit project content in data/projects.json only (not this file).
 *   2. Required fields: id, slug, title, description, category, tech, completed.
 *   3. status "draft" hides a project everywhere. Omit status or use "published".
 *   4. Missing images get SVG placeholders automatically.
 *
 * ============================================================================
 */

import { cache } from "react"
import { readFile } from "fs/promises"
import { join } from "path"

// ---------------------------------------------------------------------------
// SHARED TYPES — used by JSON, list UI, and the detail page
// ---------------------------------------------------------------------------

/** Shape stored in `data/projects.json` (the only file you edit for projects). */
export type JsonProject = {
  id: string
  slug: string
  /** "draft" hides the project everywhere. Defaults to "published". */
  status?: "draft" | "published"
  /** When true, eligible for featured helpers (use when you add a homepage strip). */
  featured?: boolean
  title: string
  description: string
  category: string
  tech: string[]
  /** Display tags shown on cards (defaults to `tech`). */
  tags?: string[]
  /** Short completion label, e.g. "Oct 2024". */
  completed: string
  client?: string
  duration?: string
  /** Path under /public, full URL, or data URI. Defaults to a generated SVG. */
  coverImage?: string
  websiteUrl?: string
  githubUrl?: string
  highlights?: string[]
  impact?: { title: string; description: string }[]
  /** Override the auto-generated detail-page screenshots. */
  screenshots?: { homepage?: string; secondary?: string }
}

/** Rich shape consumed by the single-project page. */
export type ProjectDetail = {
  slug: string
  title: string
  category: string
  client: string
  duration: string
  completed: string
  websiteUrl?: string
  githubUrl?: string
  description: string
  tech: string[]
  highlights?: string[]
  impact?: { title: string; description: string }[]
  coverImage: string
  screenshots: {
    homepage: string
    secondary: string
  }
}

/** Card shape used by the /projects list page. */
export type ListProjectCard = {
  id: string
  slug: string
  title: string
  category: string
  tech: string[]
  image: string
  completed: string
  description?: string
  href?: { live?: string; github?: string }
}

/** Lightweight card shape for featured strips (optional on home). */
export type FeaturedProjectCard = {
  id: string
  slug: string
  title: string
  completed: string
  tags: string[]
  image: string
  description?: string
}

const DATA_PATH = join(process.cwd(), "data", "projects.json")

// ---------------------------------------------------------------------------
// SVG PLACEHOLDERS (used when JSON omits image fields)
// ---------------------------------------------------------------------------

function makeScreenshot(label: string, accent = "#e8e8ec") {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${accent};stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#f4f4f5;stop-opacity:1"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect x="60" y="40" width="200" height="30" rx="4" fill="#00000010"/>
      <rect x="60" y="90" width="520" height="60" rx="8" fill="#00000012"/>
      <rect x="60" y="170" width="380" height="20" rx="4" fill="#00000010"/>
      <rect x="60" y="200" width="300" height="20" rx="4" fill="#00000008"/>
      <rect x="60" y="340" width="1160" height="320" rx="16" fill="#00000008"/>
      <text x="640" y="500" font-family="Arial,sans-serif" font-size="18" fill="#666" text-anchor="middle">${label}</text>
    </svg>`
  )}`
}

function hrefFromLinks(p: JsonProject): ListProjectCard["href"] {
  const live = p.websiteUrl?.trim()
  const github = p.githubUrl?.trim()
  if (live || github) {
    return { live: live || undefined, github: github || undefined }
  }
  return undefined
}

// ---------------------------------------------------------------------------
// LOAD (cached per render)
// ---------------------------------------------------------------------------

export const loadJsonProjects = cache(async (): Promise<JsonProject[]> => {
  let raw: string
  try {
    raw = await readFile(DATA_PATH, "utf8")
  } catch (error) {
    throw new Error(
      `[projects-data] Could not read data/projects.json. Ensure the file exists at the project root.\n${String(error)}`
    )
  }

  let parsed: { projects?: JsonProject[] }
  try {
    parsed = JSON.parse(raw) as { projects?: JsonProject[] }
  } catch (error) {
    throw new Error(
      `[projects-data] data/projects.json is not valid JSON.\n${String(error)}`
    )
  }

  if (!parsed.projects || !Array.isArray(parsed.projects)) {
    throw new Error(
      '[projects-data] data/projects.json must contain a { "projects": [...] } array.'
    )
  }

  return parsed.projects
})

export async function getPublishedJsonProjects(): Promise<JsonProject[]> {
  const all = await loadJsonProjects()
  return all.filter((p) => (p.status ?? "published") === "published")
}

// ---------------------------------------------------------------------------
// MAPPERS — JSON → page-specific shapes
// ---------------------------------------------------------------------------

export function toProjectDetail(p: JsonProject): ProjectDetail {
  const homepage =
    p.screenshots?.homepage?.trim() ||
    p.coverImage?.trim() ||
    makeScreenshot(`${p.title} — preview`)
  const secondary =
    p.screenshots?.secondary?.trim() ||
    makeScreenshot(`${p.title} — detail`)

  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    client: p.client?.trim() || "Personal project",
    duration: p.duration?.trim() || "—",
    completed: p.completed,
    websiteUrl: p.websiteUrl?.trim() || undefined,
    githubUrl: p.githubUrl?.trim() || undefined,
    description: p.description,
    tech: p.tags?.length ? p.tags : p.tech,
    highlights: p.highlights,
    impact: p.impact,
    coverImage: p.coverImage?.trim() || homepage,
    screenshots: { homepage, secondary },
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDetail | undefined> {
  const published = await getPublishedJsonProjects()
  const raw = published.find((p) => p.slug === slug)
  return raw ? toProjectDetail(raw) : undefined
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const published = await getPublishedJsonProjects()
  return published.map((p) => p.slug)
}

export async function getListProjects(): Promise<ListProjectCard[]> {
  const published = await getPublishedJsonProjects()
  return published.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    tech: p.tech,
    image: p.coverImage?.trim() || makeScreenshot(p.title),
    completed: p.completed,
    description: p.description,
    href: hrefFromLinks(p),
  }))
}

export async function getFeaturedProjects(
  limit = 3
): Promise<FeaturedProjectCard[]> {
  const published = await getPublishedJsonProjects()
  const featured = published.filter((p) => p.featured)
  const ordered = featured.length > 0 ? featured : published
  return ordered.slice(0, limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    completed: p.completed,
    tags: p.tags?.length ? p.tags : p.tech,
    image: p.coverImage?.trim() || makeScreenshot(p.title),
    description: p.description,
  }))
}
