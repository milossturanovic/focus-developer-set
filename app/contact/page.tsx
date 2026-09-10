/**
 * ============================================================================
 * CONTACT PAGE — split editorial layout
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Two-column contact page: intro + info panel + socials on the left,
 *   UI-only form on the right. Navbar and footer come from the root layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy in config/site.ts → contactPage.
 *   2. Email, location, and social URLs come from contact / links — do not
 *      duplicate them here.
 *   3. The form does not send messages until you wire sendInquiry.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact",
  description: siteConfig.contactPage.intro,
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.739L1.254 2.25H8.08l4.253 5.622L18.244 2.25z" />
    </svg>
  )
}

const SOCIALS = [
  { name: "GitHub", hrefKey: "github" as const, icon: Github },
  { name: "LinkedIn", hrefKey: "linkedin" as const, icon: Linkedin },
  { name: "X", hrefKey: "twitter" as const, icon: XIcon },
]

export default function ContactPage() {
  const { contact, links, contactPage } = siteConfig

  const details = [
    {
      label: "Email",
      value: contact.email,
      href: links.email,
    },
    {
      label: "Location",
      value: contactPage.locationLine,
    },
    {
      label: "Availability",
      value: contactPage.availability,
    },
  ]

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1
            id="contact-heading"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {contactPage.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {contactPage.intro}
          </p>

          <dl className="mt-10 overflow-hidden rounded-3xl border border-border bg-background">
            {details.map((item) => (
              <div
                key={item.label}
                className="border-b border-border px-6 py-5 transition-colors duration-200 last:border-b-0 hover:bg-zinc-50"
              >
                <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
                <dd className="mt-1.5 text-[0.95rem] font-medium tracking-tight text-foreground">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon
              return (
                <li key={social.name}>
                  <Link
                    href={links[social.hrefKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
                  >
                    <Icon className="size-4" />
                    {social.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="sr-only">
            Send a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </section>
  )
}
