/**
 * ============================================================================
 * PROJECT CASE STUDY — single project layout (/projects/[slug])
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Editorial case-study layout: hero, lifted cover, long-form body,
 *   sticky sidebar (info, technologies, related), share links, and next
 *   project. Server-rendered — no client JavaScript.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit the labels in config/site.ts → caseStudyPage.
 *   2. Edit project content in data/projects.json: summary, caseStudy,
 *      client, completionDate, role, tags, coverImage.
 *   3. Share links use siteConfig.url — set it to your real domain.
 *
 * ============================================================================
 */

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Clock,
  Facebook,
  Github,
  Linkedin,
  Mail,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import type { CaseStudyPageData } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.739L1.254 2.25H8.08l4.253 5.622L18.244 2.25z" />
    </svg>
  )
}

/** Sidebar row icons, matched to the meta labels built in lib/projects-data.ts. */
const META_ICONS: Record<string, LucideIcon> = {
  Client: User,
  Date: Calendar,
  Role: Briefcase,
  Category: Tag,
  Timeline: Clock,
}

function SidebarCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-border bg-background p-6">
      <h2 className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <span className="mt-3 block h-px w-8 bg-foreground" aria-hidden="true" />
      <div className="mt-5">{children}</div>
    </section>
  )
}

function ShareLinks({
  shareLabel,
  shareUrl,
  title,
}: {
  shareLabel: string
  shareUrl: string
  title: string
}) {
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      name: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      name: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      name: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg border border-border bg-muted/50 px-6 py-4">
      <p className="text-sm font-medium text-foreground">{shareLabel}</p>
      <ul className="flex list-none items-center gap-2">
        {targets.map((target) => {
          const Icon = target.icon
          return (
            <li key={target.name}>
              <a
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={target.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ProjectCaseStudy({ project }: { project: CaseStudyPageData }) {
  const labels = siteConfig.caseStudyPage
  const shareUrl = `${siteConfig.url.replace(/\/$/, "")}/projects/${project.slug}`

  return (
    <article className="bg-background">
      {/* ---------------------------------------------------------------
          HERO — category, title, summary
      --------------------------------------------------------------- */}
      <header className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {labels.backLabel}
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-12">
            <p className="inline-flex items-center rounded-full border border-border bg-background px-3.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {project.label}
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
              {project.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {project.summary}
            </p>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------
          COVER IMAGE — lifted over the hero edge
      --------------------------------------------------------------- */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <figure className="-mt-16 overflow-hidden rounded-lg border border-border bg-muted sm:-mt-20">
          {/* Native img: path, URL, or SVG data URI. Scales to width; keeps native ratio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt={`${project.title} preview`}
            className="block h-auto w-full"
          />
        </figure>
      </div>

      {/* ---------------------------------------------------------------
          BODY — long-form content + sticky sidebar
      --------------------------------------------------------------- */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div className="min-w-0">
            <ul className="flex list-none flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-6">
              {project.meta.map((item) => {
                const Icon = META_ICONS[item.label] ?? Tag
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{item.label}: </span>
                    {item.value}
                  </li>
                )
              })}
            </ul>

            <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.intro}
            </p>

            {project.sections.length > 0 ? (
              <div className="mt-10 space-y-9">
                {project.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            ) : project.highlights.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {labels.highlightsTitle}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.websiteUrl || project.githubUrl ? (
              <div className="mt-12 flex flex-wrap gap-3">
                {project.websiteUrl ? (
                  <Button
                    asChild
                    className="h-11 rounded-lg px-6 text-sm font-medium shadow-none transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-zinc-800 hover:shadow-none motion-reduce:hover:translate-y-0"
                  >
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {labels.livePreviewLabel}
                      <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-lg border-border bg-background px-6 text-sm font-medium shadow-none hover:border-foreground/30 hover:bg-zinc-50 hover:text-foreground"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                      {labels.sourceLabel}
                    </a>
                  </Button>
                ) : null}
              </div>
            ) : null}

            <div className="mt-12">
              <ShareLinks
                shareLabel={labels.shareLabel}
                shareUrl={shareUrl}
                title={project.title}
              />
            </div>
          </div>

          {/* -------------------------------------------------------------
              SIDEBAR
          ------------------------------------------------------------- */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <SidebarCard title={labels.infoTitle}>
              <dl className="space-y-5">
                {project.meta.map((item) => {
                  const Icon = META_ICONS[item.label] ?? Tag
                  return (
                    <div key={item.label}>
                      <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </SidebarCard>

            {project.technologies.length > 0 ? (
              <SidebarCard title={labels.technologiesTitle}>
                <ul className="flex list-none flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}

            {project.related.length > 0 ? (
              <SidebarCard title={labels.relatedTitle}>
                <ul className="list-none space-y-4">
                  {project.related.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/projects/${related.slug}`}
                        className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <span className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={related.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                            {related.title}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {related.year}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}
          </aside>
        </div>

        {/* -------------------------------------------------------------
            NEXT PROJECT
        ------------------------------------------------------------- */}
        {project.next ? (
          <nav
            aria-label="Project navigation"
            className={cn(
              "mt-14 border-t border-border pt-8 sm:mt-16",
              "flex justify-end"
            )}
          >
            <Link
              href={`/projects/${project.next.slug}`}
              className="group inline-flex items-center gap-4 rounded-lg px-2 py-2 text-right transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {labels.nextLabel}
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground sm:text-lg">
                  {project.next.title}
                </span>
              </span>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </nav>
        ) : null}
      </div>
    </article>
  )
}
