/**
 * ============================================================================
 * HERO SECTION — editorial home intro
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Centered typography hero for the home page. Kicker, headline, bio, CTAs, and
 *   stats come from config/site.ts. A slow grayscale aurora and film grain
 *   sit behind the copy (CSS only; see .hero-atmosphere in globals.css).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy in config/site.ts → hero (not this file).
 *   2. Keep a single h1 on the home page.
 *   3. Replace public/resume.pdf with your CV (path: hero.secondaryCta.href).
 *   4. Tune aurora/grain in app/globals.css (.hero-aurora-band, .hero-grain).
 *
 * ============================================================================
 */

import Link from "next/link"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function HeroSection() {
  const { hero } = siteConfig

  return (
    <section
      aria-labelledby="home-heading"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-background"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-aurora">
          <div className="hero-aurora-band hero-aurora-band-a" />
          <div className="hero-aurora-band hero-aurora-band-b" />
          <div className="hero-aurora-band hero-aurora-band-c" />
          <div className="hero-aurora-band hero-aurora-band-d" />
        </div>
        <div className="hero-grain" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:px-8 sm:py-24">
        <span
          aria-hidden="true"
          className="mb-8 block h-px w-10 bg-foreground sm:mb-10"
        />

        {hero.kicker ? (
          <p className="mb-6 max-w-xl text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:mb-8">
            {hero.kicker}
          </p>
        ) : null}

        <h1
          id="home-heading"
          className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.08]"
        >
          {hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-10 sm:text-lg">
          {hero.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
          <Button
            asChild
            className="h-11 rounded-full px-8 text-sm font-medium shadow-none hover:shadow-none"
          >
            <Link href={hero.cta.href}>
              {hero.cta.label}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-border bg-background/70 px-8 text-sm font-medium shadow-none hover:bg-background hover:shadow-none"
          >
            <a
              href={hero.secondaryCta.href}
              download={hero.secondaryCta.download ? true : undefined}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              {hero.secondaryCta.label}
            </a>
          </Button>
        </div>

        <div className="mt-10 w-full max-w-4xl sm:mt-12">
          <div className="border-t border-border" />
          <dl className="grid grid-cols-1 gap-10 pt-8 sm:grid-cols-3 sm:gap-8 sm:pt-8">
            {hero.stats.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-2 text-base font-medium tracking-tight text-foreground sm:text-lg">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
