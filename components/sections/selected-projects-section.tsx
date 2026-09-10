/**
 * ============================================================================
 * SELECTED PROJECTS — cinematic portrait slider
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home-page project gallery: editorial heading, three visible portrait
 *   cards on desktop, overlay copy, and understated pagination. Header copy
 *   lives in config/site.ts; cards come from data/projects.json.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit title / intro in config/site.ts → selectedProjects.
 *   2. Edit cards in data/projects.json (featured: true, coverImage, category).
 *   3. Links go to /projects/[slug].
 *
 * ============================================================================
 */

"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ProjectPosterCard } from "@/components/project-poster-card"
import { siteConfig } from "@/config/site"
import type { FeaturedProjectCard } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

const DRAG_THRESHOLD = 8

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

type SelectedProjectsSectionProps = {
  projects: FeaturedProjectCard[]
}

export function SelectedProjectsSection({
  projects,
}: SelectedProjectsSectionProps) {
  const { selectedProjects } = siteConfig
  const trackRef = useRef<HTMLDivElement>(null)
  const didDragRef = useRef(false)
  const snapTimerRef = useRef<number | null>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startScroll: number
  } | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)

  const maxIndex = Math.max(0, projects.length - slidesPerView)

  const getStep = useCallback(() => {
    const track = trackRef.current
    const first = track?.children[0] as HTMLElement | undefined
    if (!track || !first) return 0
    const styles = getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    return first.getBoundingClientRect().width + gap
  }, [])

  const slideScrollLeft = useCallback((index: number) => {
    const track = trackRef.current
    const slide = track?.children[index] as HTMLElement | undefined
    if (!track || !slide) return 0
    return (
      slide.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft
    )
  }, [])

  const measure = useCallback(() => {
    const track = trackRef.current
    const first = track?.children[0] as HTMLElement | undefined
    if (!track || !first) return
    const step = getStep()
    if (step <= 0) return
    const visible = Math.round((track.clientWidth + (step - first.getBoundingClientRect().width)) / step)
    setSlidesPerView(Math.max(1, Math.min(projects.length, visible)))
  }, [getStep, projects.length])

  const syncIndex = useCallback(() => {
    const track = trackRef.current
    const step = getStep()
    if (!track || step <= 0) return
    const next = Math.round(track.scrollLeft / step)
    setActiveIndex(Math.max(0, Math.min(next, maxIndex)))
  }, [getStep, maxIndex])

  const restoreSnap = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    track.style.scrollSnapType = ""
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(index, maxIndex))
      const left = slideScrollLeft(clamped)
      const reduce = prefersReducedMotion()

      track.style.scrollSnapType = "none"
      track.scrollTo({
        left,
        behavior: reduce ? "auto" : "smooth",
      })
      setActiveIndex(clamped)

      if (reduce) {
        restoreSnap()
        return
      }

      if (snapTimerRef.current) {
        window.clearTimeout(snapTimerRef.current)
      }

      const onEnd = () => {
        restoreSnap()
        track.removeEventListener("scrollend", onEnd)
        if (snapTimerRef.current) {
          window.clearTimeout(snapTimerRef.current)
          snapTimerRef.current = null
        }
      }
      track.addEventListener("scrollend", onEnd)
      snapTimerRef.current = window.setTimeout(onEnd, 750)
    },
    [maxIndex, restoreSnap, slideScrollLeft]
  )

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return

    const resize = new ResizeObserver(() => {
      measure()
      syncIndex()
    })
    resize.observe(track)
    track.addEventListener("scroll", syncIndex, { passive: true })
    return () => {
      resize.disconnect()
      track.removeEventListener("scroll", syncIndex)
    }
  }, [measure, syncIndex])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return
    const track = trackRef.current
    if (!track) return
    didDragRef.current = false
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: track.scrollLeft,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag || !track || event.pointerId !== drag.pointerId) return
    const delta = event.clientX - drag.startX
    if (!didDragRef.current && Math.abs(delta) > DRAG_THRESHOLD) {
      didDragRef.current = true
      track.dataset.dragging = "true"
      track.style.scrollSnapType = "none"
      track.setPointerCapture(event.pointerId)
    }
    if (didDragRef.current) {
      track.scrollLeft = drag.startScroll - delta
    }
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag || event.pointerId !== drag.pointerId) return
    dragRef.current = null
    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
    if (!track) return
    delete track.dataset.dragging
    if (!didDragRef.current) {
      restoreSnap()
      return
    }
    const step = getStep()
    if (step <= 0) {
      restoreSnap()
      return
    }
    const nearest = Math.round(track.scrollLeft / step)
    const clamped = Math.max(0, Math.min(nearest, maxIndex))
    scrollToIndex(clamped)
  }

  const preventClickAfterDrag = (event: MouseEvent) => {
    if (!didDragRef.current) return
    event.preventDefault()
    event.stopPropagation()
    didDragRef.current = false
  }

  return (
    <section
      aria-labelledby="selected-projects-heading"
      id="selected-projects"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-8">
          <h2
            id="selected-projects-heading"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {selectedProjects.title}
          </h2>
          {projects.length > 0 ? (
            <div className="hidden shrink-0 items-center gap-3 pt-1 sm:flex">
              <SliderArrow
                direction="prev"
                disabled={activeIndex <= 0}
                onClick={() => scrollToIndex(activeIndex - 1)}
              />
              <SliderArrow
                direction="next"
                disabled={activeIndex >= maxIndex}
                onClick={() => scrollToIndex(activeIndex + 1)}
              />
            </div>
          ) : null}
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {projects.length === 0
            ? "No featured projects yet. Mark a project as featured in data/projects.json."
            : selectedProjects.intro}
        </p>

        {projects.length > 0 ? (
          <>
            <div
              ref={trackRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Selected projects"
              className="mt-14 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pt-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] select-none lg:mt-16 lg:gap-6 [&::-webkit-scrollbar]:hidden data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="w-[82%] shrink-0 cursor-grab snap-start md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <ProjectPosterCard
                    slug={project.slug}
                    title={project.title}
                    category={project.category}
                    image={project.image}
                    className="cursor-grab"
                    onClick={preventClickAfterDrag}
                  />
                </article>
              ))}
            </div>

            <div
              className="mt-10 flex items-center justify-center gap-2.5"
              role="group"
              aria-label="Project slides"
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={project.id}
                    type="button"
                    aria-label={`Show ${project.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "size-2 rounded-full transition-[background-color,box-shadow] duration-300 ease-out",
                      isActive
                        ? "bg-foreground shadow-[0_0_0_1.5px_hsl(var(--foreground))]"
                        : "bg-zinc-300 hover:bg-zinc-400"
                    )}
                    onClick={() => scrollToIndex(index)}
                  />
                )
              })}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

function SliderArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next"
  disabled: boolean
  onClick: () => void
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous projects" : "Next projects"}
      onClick={onClick}
      className="inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon className="size-6" strokeWidth={1.75} />
    </button>
  )
}
