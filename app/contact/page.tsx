/**
 * ============================================================================
 * CONTACT PAGE — stub
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Contact info from config/site.ts plus a UI-only form. Navbar and footer
 *   come from the root layout. Replace this layout in the design phase.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit name, email, location, and social links in config/site.ts.
 *   2. The form does not send messages until you wire a provider.
 *   3. Do not add a database or admin API for the default product.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"

import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
}

export default function ContactPage() {
  const { name, role, contact, links } = siteConfig

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Contact — replace with your design
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Contact
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        {name}, {role}. Location and email come from config — the form is a
        UI stub until you connect a provider.
      </p>

      <dl className="mt-10 space-y-4 text-sm">
        <div>
          <dt className="font-medium">Email</dt>
          <dd className="mt-1">
            <a
              href={links.email}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {contact.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium">Location</dt>
          <dd className="mt-1 text-muted-foreground">{contact.location}</dd>
        </div>
        <div>
          <dt className="font-medium">Social</dt>
          <dd className="mt-1 flex flex-wrap gap-4">
            <Link
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              GitHub
            </Link>
            <Link
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              LinkedIn
            </Link>
          </dd>
        </div>
      </dl>

      <div className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">Send a message</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo form — connect a provider in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
            components/contact-form.tsx
          </code>{" "}
          before launch.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
