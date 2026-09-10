/**
 * ============================================================================
 * PROJECT POSTER CARD
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Shared cinematic 4:5 poster used by the homepage slider and the /projects
 *   grid. Overlay copy, hover zoom, and the CASE STUDY treatment live here
 *   so both surfaces stay in sync.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Card content (title, category, coverImage) comes from data/projects.json.
 *   2. Links go to /projects/[slug].
 *
 * ============================================================================
 */

"use client"

import type { MouseEvent } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type ProjectPosterCardProps = {
  slug: string
  title: string
  category: string
  image: string
  /** Page list uses h2; homepage slider uses h3. */
  titleAs?: "h2" | "h3"
  className?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function ProjectPosterCard({
  slug,
  title,
  category,
  image,
  titleAs: TitleTag = "h3",
  className,
  onClick,
}: ProjectPosterCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      draggable={false}
      className={cn(
        "group relative block aspect-[4/5] overflow-hidden rounded-lg shadow-none outline-none transition-[transform,box-shadow] duration-500 ease-out [-webkit-user-drag:none] hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none",
        className
      )}
      onClick={onClick}
      onDragStart={(event) => event.preventDefault()}
    >
      {/* Native img: coverImage may be a path, URL, or SVG data URI. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/25 motion-reduce:transition-none"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <p className="text-[15px] font-medium text-white/75">{category}</p>
          <TitleTag className="mt-2 line-clamp-3 text-[1.625rem] font-semibold leading-[1.15] tracking-tight text-white/95 transition-colors duration-500 ease-out group-hover:text-white sm:text-[1.75rem] lg:text-[1.9rem]">
            {title}
          </TitleTag>
        </div>
        <span className="mt-6 inline-flex items-center rounded-md border border-white/55 bg-transparent px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[background-color,color,border-color] duration-500 ease-out group-hover:border-white group-hover:bg-white group-hover:text-zinc-900">
          Case study
          <ArrowUpRight
            aria-hidden="true"
            className="ml-0 h-3.5 w-0 shrink-0 translate-x-[-2px] translate-y-[2px] opacity-0 transition-all duration-500 ease-out group-hover:ml-1.5 group-hover:w-3.5 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:w-0 motion-reduce:opacity-0"
          />
        </span>
      </div>
    </Link>
  )
}
