/**
 * ============================================================================
 * ABOUT SECTION — editorial photo + bio
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home-page about strip between the hero and services. Heading, paragraphs,
 *   and image path come from config/site.ts.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy in config/site.ts → about (not this file).
 *   2. Replace public/about/studio-desk.jpg and update about.image.
 *   3. Keep this short — experience already covers tenure.
 *
 * ============================================================================
 */

import { siteConfig } from "@/config/site"

export function AboutSection() {
  const { about, contact } = siteConfig

  return (
    <section
      aria-labelledby="about-heading"
      id="about"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-3xl">
          {/* Native img: path under /public, URL, or data URI. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about.image.src}
            alt={about.image.alt}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <h2
            id="about-heading"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {about.title}
          </h2>
          <div className="mt-5 max-w-2xl space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {contact.location}
          </p>
        </div>
      </div>
    </section>
  )
}
