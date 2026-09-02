/**
 * ============================================================================
 * SITE FOOTER
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Minimal footer rendered from the root layout on every page.
 *   Name, email, and social URLs come from config/site.ts only.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit name, contact.email, and links in config/site.ts.
 *   2. Do not hardcode social URLs here.
 *
 * ============================================================================
 */

import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

import { siteConfig } from "@/config/site"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.739L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { name: "GitHub", href: siteConfig.links.github, icon: Github },
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { name: "X", href: siteConfig.links.twitter, icon: XIcon },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const { name, contact, links } = siteConfig

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <a
            href={links.email}
            className="mt-1 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {contact.email}
          </a>
        </div>

        <ul className="flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon
            return (
              <li key={social.name}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mx-auto max-w-3xl border-t border-border px-6 py-4 sm:px-8">
        <p className="text-xs text-muted-foreground">
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
