/**
 * ============================================================================
 * SERVICES SECTION — three editorial cards
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home-page capabilities strip: heading, intro, and three bordered cards.
 *   Copy and deliverables come from config/site.ts. Icons are inline SVG.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy in config/site.ts → services (not this file).
 *   2. Icon keys: "layers" | "microscope" | "compass".
 *
 * ============================================================================
 */

import { siteConfig } from "@/config/site"

type ServiceIconName = "layers" | "microscope" | "compass"

function ServiceIcon({ name }: { name: string }) {
  const icon = name as ServiceIconName
  const className = "h-5 w-5 text-foreground"

  if (icon === "layers") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </svg>
    )
  }

  if (icon === "microscope") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 1 0 0-14h-1" />
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

export function ServicesSection() {
  const { services } = siteConfig

  return (
    <section
      aria-labelledby="services-heading"
      id="services"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="services-heading"
          className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {services.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {services.intro}
        </p>

        <ul className="mt-14 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 md:gap-5 lg:mt-16 lg:gap-6">
          {services.items.map((item) => (
            <li
              key={item.id}
              className="rounded-3xl border border-border bg-background p-8 shadow-none sm:p-9"
            >
              <article>
                <ServiceIcon name={item.icon} />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {item.deliverables.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
