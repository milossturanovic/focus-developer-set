/**
 * ============================================================================
 * SITE FOOTER
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Single-row footer on every page: name, credit line, Home / Projects.
 *   Name and routes come from config/site.ts.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit the display name in config/site.ts → name.
 *   2. Home and Projects hrefs come from navItems.
 *
 * ============================================================================
 */

import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  const year = new Date().getFullYear()
  const { name, navItems } = siteConfig
  const links = navItems.filter(
    (item) => item.href === "/" || item.href === "/projects"
  )

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-3 px-6 py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-8 sm:px-8 sm:py-7">
        <p className="text-sm font-medium tracking-tight text-foreground">
          {name}
        </p>

        <p className="text-sm text-muted-foreground sm:whitespace-nowrap sm:text-center">
          © {year} {name}. Built with Next.js and Tailwind CSS.
        </p>

        <nav aria-label="Footer">
          <ul className="flex items-center gap-4 sm:justify-end">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
