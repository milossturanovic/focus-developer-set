/**
 * ============================================================================
 * EXPERIENCE SECTION — Gantt-style tenure chart
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home-page experience timeline. Heading, years, and roles come from
 *   config/site.ts. Bar width is proportional to start/end years.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy and roles in config/site.ts → experience (not this file).
 *   2. Keep start/end as whole years; bars scale between axisStart and axisEnd.
 *   3. type is "full-time" (black bar) or "freelance" (gray bar).
 *
 * ============================================================================
 */

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

function yearPercent(year: number, axisStart: number, axisEnd: number) {
  const span = axisEnd - axisStart
  if (span <= 0) return 0
  return ((year - axisStart) / span) * 100
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value))
}

function YearGrid({
  years,
  axisStart,
  axisEnd,
  className,
}: {
  years: number[]
  axisStart: number
  axisEnd: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0", className)}
    >
      {years.map((year) => {
        const left = clampPercent(yearPercent(year, axisStart, axisEnd))
        return (
          <span
            key={year}
            className="absolute inset-y-0 w-px bg-zinc-200/90"
            style={{ left: `${left}%` }}
          />
        )
      })}
    </div>
  )
}

export function ExperienceSection() {
  const { experience } = siteConfig
  const { axisStart, axisEnd, years, roles, legend } = experience

  return (
    <section
      aria-labelledby="experience-heading"
      id="experience"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="experience-heading"
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {experience.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {experience.intro}
        </p>

        <figure className="mt-14 lg:mt-16">
          <figcaption className="sr-only">
            Experience from {axisStart} to {axisEnd}, drawn to scale.
          </figcaption>

          <div className="rounded-3xl border border-border bg-background px-4 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="grid grid-cols-[minmax(7.5rem,9.5rem)_minmax(0,1fr)] gap-x-3 sm:grid-cols-[13.5rem_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10">
              <div className="col-start-2 pb-3 sm:pb-4">
                <div className="relative h-5 sm:h-6">
                  {years.map((year) => {
                    const left = clampPercent(
                      yearPercent(year, axisStart, axisEnd)
                    )
                    const isLast = year === years[years.length - 1]
                    return (
                      <span
                        key={year}
                        className={cn(
                          "absolute top-0 text-[10px] tabular-nums text-muted-foreground sm:text-xs",
                          isLast ? "-translate-x-full" : "-translate-x-1/2"
                        )}
                        style={{ left: `${left}%` }}
                      >
                        {year}
                      </span>
                    )
                  })}
                </div>
              </div>

              {roles.map((item) => {
                const left = clampPercent(
                  yearPercent(item.start, axisStart, axisEnd)
                )
                const right = clampPercent(
                  yearPercent(item.end, axisStart, axisEnd)
                )
                const width = Math.max(right - left, 0)

                return (
                  <div
                    key={item.id}
                    className="group col-span-2 grid grid-cols-subgrid items-center rounded-xl px-1.5 py-2.5 transition-colors duration-300 ease-out hover:bg-zinc-50 sm:px-2 sm:py-3"
                  >
                    <div className="min-w-0 pr-1">
                      <p className="truncate text-[13px] font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-zinc-950 sm:text-sm">
                        {item.company}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] leading-snug text-muted-foreground sm:text-xs">
                        {item.role}
                      </p>
                    </div>
                    <div className="relative z-10 flex h-9 items-center sm:h-10">
                      <YearGrid
                        years={years}
                        axisStart={axisStart}
                        axisEnd={axisEnd}
                        className="-inset-y-2.5 sm:-inset-y-3"
                      />
                      <span
                        title={`${item.company}, ${item.start}–${item.end}`}
                        aria-label={`${item.company}, ${item.role}, ${item.start} to ${item.end}`}
                        className={cn(
                          "relative h-2.5 rounded-full shadow-none transition-[transform,background-color,box-shadow] duration-300 ease-out sm:h-3",
                          item.type === "freelance"
                            ? "bg-zinc-300 group-hover:bg-zinc-400"
                            : "bg-foreground group-hover:bg-zinc-800",
                          "group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_14px_-8px_rgba(24,24,27,0.45)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:shadow-none"
                        )}
                        style={{
                          marginLeft: `${left}%`,
                          width: `${width}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 sm:mt-7 sm:gap-x-8 sm:pt-6">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-6 rounded-full bg-foreground sm:h-2.5 sm:w-7"
                />
                <span className="text-[11px] text-muted-foreground sm:text-xs">
                  {legend.fullTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-6 rounded-full bg-zinc-300 sm:h-2.5 sm:w-7"
                />
                <span className="text-[11px] text-muted-foreground sm:text-xs">
                  {legend.freelance}
                </span>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}
