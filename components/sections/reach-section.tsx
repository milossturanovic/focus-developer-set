/**
 * ============================================================================
 * REACH SECTION — homepage contact CTA
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Split closer after Selected projects: message + CTAs on the left,
 *   ranked contact channels on the right. Copy lives in config/site.ts.
 *   URLs come from links (never duplicated here).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit copy in config/site.ts → reach.
 *   2. Channel hrefKey maps to links.email | linkedin | github | twitter.
 *
 * ============================================================================
 */

import Link from "next/link"
import { Clock, Github, Linkedin, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type HrefKey = keyof typeof siteConfig.links
type ChannelIcon = "mail" | "linkedin" | "github" | "x"
type DetailIcon = "pin" | "clock"

function hrefFor(key: HrefKey) {
  return siteConfig.links[key]
}

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

function DetailGlyph({ icon }: { icon: string }) {
  const name = icon as DetailIcon
  const className = "mt-0.5 size-3.5 shrink-0 text-muted-foreground"
  if (name === "clock") {
    return <Clock className={className} strokeWidth={1.75} />
  }
  return <MapPin className={className} strokeWidth={1.75} />
}

function ChannelGlyph({ icon }: { icon: string }) {
  const name = icon as ChannelIcon
  const className =
    "size-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
  if (name === "linkedin") {
    return <Linkedin className={className} strokeWidth={1.75} />
  }
  if (name === "github") {
    return <Github className={className} strokeWidth={1.75} />
  }
  if (name === "x") {
    return <XIcon className={className} />
  }
  return <Mail className={className} strokeWidth={1.75} />
}

export function ReachSection() {
  const { reach, contact } = siteConfig

  return (
    <section
      aria-labelledby="reach-heading"
      id="reach"
      className="bg-background px-6 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2
            id="reach-heading"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {reach.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {reach.intro}
          </p>

          <ul className="mt-8 space-y-2.5">
            {reach.details.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <DetailGlyph icon={item.icon} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-lg px-6 text-sm font-medium shadow-none transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-zinc-800 hover:shadow-none motion-reduce:hover:translate-y-0 sm:min-w-[9.5rem]"
            >
              <Link href={hrefFor(reach.primaryCta.hrefKey as HrefKey)}>
                {reach.primaryCta.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg border-border bg-background px-6 text-sm font-medium shadow-none hover:border-foreground/30 hover:bg-zinc-50 hover:text-foreground sm:min-w-[9.5rem]"
            >
              <Link
                href={hrefFor(reach.secondaryCta.hrefKey as HrefKey)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {reach.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-background">
          <ul className="divide-y divide-border">
            {reach.channels.map((channel) => {
              const href = hrefFor(channel.hrefKey as HrefKey)
              const note =
                channel.icon === "mail"
                  ? `${contact.email} — ${channel.note}`
                  : channel.note
              const external = href.startsWith("http")

              return (
                <li key={channel.id}>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3 px-5 py-5 transition-colors duration-300 ease-out hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:items-center sm:gap-4 sm:px-6"
                  >
                    <span className="flex min-w-0 flex-1 items-start gap-3">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center sm:mt-0">
                        <ChannelGlyph icon={channel.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold tracking-tight text-foreground transition-colors duration-300">
                          {channel.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {note}
                        </span>
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-foreground/20 group-hover:bg-white group-hover:text-foreground"
                      )}
                    >
                      {channel.pill}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
