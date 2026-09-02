/**
 * ============================================================================
 * HOME PAGE — layout shell
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Placeholder home route. Navbar and footer come from the root layout.
 *   Replace the stubs below with real section components in the design phase.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Branding lives in config/site.ts — not in this file.
 *   2. Add designed sections under components/sections/ and import them here.
 *   3. Keep a single h1 on this page.
 *
 * ============================================================================
 */

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      {/* -------------------------------------------------------------
          HERO STUB — replace with your design
      ------------------------------------------------------------- */}
      <section aria-labelledby="home-heading">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Hero — replace with your design
        </p>
        <h1
          id="home-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{siteConfig.role}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects">View projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MAIN PLACEHOLDER — add sections during design phase
      ------------------------------------------------------------- */}
      <section
        aria-labelledby="home-placeholder-heading"
        className="mt-16 rounded-lg border border-dashed border-border p-6"
      >
        <h2
          id="home-placeholder-heading"
          className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
        >
          Home sections — stubs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Drop designed components into{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            components/sections/
          </code>{" "}
          and compose them here. Do not add a database or CMS for the default
          product.
        </p>
      </section>
    </div>
  )
}
