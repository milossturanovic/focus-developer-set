/**
 * ============================================================================
 * SITE NAVBAR
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Sticky header with brand, desktop inline links, and a mobile-only
 *   sidemenu. Drawer animations and hash-scroll match Dark React.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Change brand text and nav items in config/site.ts — not here.
 *   2. Social icons in the drawer read from config/site.ts → links.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

import { AnimatedBurgerIcon } from "@/components/animated-burger-icon"
import { Button } from "@/components/ui/button"
import {
  Sidemenu,
  SidemenuContent,
  SidemenuHeader,
  SidemenuTitle,
  SidemenuTrigger,
} from "@/components/ui/sidemenu"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const SHEET_DURATION_MS = 450
const SCROLL_DURATION_MS = 800
const MENU_ID = "site-sidemenu"

function smoothScrollToElement(el: Element, durationMs: number) {
  const start = window.scrollY
  const target = el.getBoundingClientRect().top + start
  const distance = target - start
  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
    window.scrollTo(0, start + distance * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function SiteNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => {
      if (media.matches) setSheetOpen(false)
    }
    closeOnDesktop()
    media.addEventListener("change", closeOnDesktop)
    return () => media.removeEventListener("change", closeOnDesktop)
  }, [])

  const closeSheet = React.useCallback(() => setSheetOpen(false), [])

  const handleAnchorClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) smoothScrollToElement(el, SCROLL_DURATION_MS)
      }
    },
    []
  )

  const handleSidemenuNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault()
        closeSheet()
        window.setTimeout(() => {
          const el = document.querySelector(href)
          if (el) smoothScrollToElement(el, SCROLL_DURATION_MS)
        }, SHEET_DURATION_MS)
      } else {
        closeSheet()
      }
    },
    [closeSheet]
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-200",
        "border-b border-border/40",
        isScrolled ? "bg-background/60 backdrop-blur-lg" : "bg-background/0"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {siteConfig.navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {item.title}
                </a>
              )
            )}
          </nav>

          <Sidemenu open={sheetOpen} onOpenChange={setSheetOpen}>
            <SidemenuTrigger asChild className="md:hidden">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={sheetOpen ? "Close menu" : "Open menu"}
                aria-expanded={sheetOpen}
                aria-controls={MENU_ID}
              >
                <AnimatedBurgerIcon open={sheetOpen} className="h-5 w-5" />
              </Button>
            </SidemenuTrigger>
            <SidemenuContent
              id={MENU_ID}
              side="right"
              duration={SHEET_DURATION_MS}
            >
              <SidemenuHeader className="pr-10">
                <SidemenuTitle>{siteConfig.shortName}</SidemenuTitle>
                <p className="text-sm text-muted-foreground">{siteConfig.role}</p>
              </SidemenuHeader>
              <div className="mt-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-3" aria-label="Sidemenu">
                  {siteConfig.navItems.map((item) =>
                    item.href.startsWith("/") ? (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeSheet}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleSidemenuNavClick(e, item.href)}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                      >
                        {item.title}
                      </a>
                    )
                  )}
                </nav>

                <a
                  href={siteConfig.links.email}
                  onClick={closeSheet}
                  className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {siteConfig.links.email.replace(/^mailto:/, "")}
                </a>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      onClick={closeSheet}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      onClick={closeSheet}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={siteConfig.links.email}
                      aria-label="Email"
                      onClick={closeSheet}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </SidemenuContent>
          </Sidemenu>
        </div>
      </div>
    </header>
  )
}
