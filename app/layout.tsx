/**
 * ============================================================================
 * ROOT LAYOUT
 * ============================================================================
 *
 * WHAT THIS IS:
 *   App-wide layout: fonts, metadata, navbar, footer, and page children.
 *   Home, projects, and contact pages render inside `<main>`.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Title and description come from config/site.ts — edit that file.
 *   2. Font is Inter via next/font. Swap in this file if needed.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { siteConfig } from "@/config/site"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteNavbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
