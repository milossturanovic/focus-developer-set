/**
 * ============================================================================
 * TOOLKIT SECTION — grouped tool grid
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home-page toolkit strip: editorial heading, intro, and labeled
 *   columns of compact tool tiles. Copy lives in config/site.ts.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy in config/site.ts → toolkit (not this file).
 *   2. Keep marks as two-letter abbreviations — no brand logos.
 *
 * ============================================================================
 */

import { siteConfig } from "@/config/site"

export function ToolkitSection() {
  const { toolkit } = siteConfig

  return (
    <section
      aria-labelledby="toolkit-heading"
      id="toolkit"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="toolkit-heading"
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {toolkit.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {toolkit.intro}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-12">
          {toolkit.groups.map((group) => (
            <div key={group.id}>
              <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {group.label}
              </h3>
              <ul className="grid list-none grid-cols-3 gap-3 p-0">
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="group relative rounded-2xl border border-border bg-background p-4 pr-5 shadow-none transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[0_12px_28px_-14px_rgba(24,24,27,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-lg bg-muted text-[11px] font-medium text-zinc-600 transition-colors duration-200 ease-out group-hover:bg-foreground group-hover:text-background"
                    >
                      {tool.mark}
                    </span>
                    <p className="mt-3 pr-3 text-sm font-medium tracking-tight text-foreground transition-transform duration-200 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0">
                      {tool.name}
                    </p>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 right-3 text-muted-foreground opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-80 motion-reduce:group-hover:opacity-0"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className="size-2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3.5 8.5 8.5 3.5" />
                        <path d="M4.5 3.5h4v4" />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
