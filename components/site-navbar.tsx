/**
 * ============================================================================
 * SITE NAVBAR
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Minimal site header. Brand name and links come from config/site.ts.
 *   Layout is a placeholder — restyle in the design phase.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Change brand text and nav items in config/site.ts — not here.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="rounded-sm text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className={cn("border-t border-border md:hidden", open ? "block" : "hidden")}>
        <nav
          className="mx-auto flex max-w-3xl flex-col gap-1 px-6 py-3 sm:px-8"
          aria-label="Mobile"
        >
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
