/**
 * ============================================================================
 * CONTACT FORM — UI-only stub
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Client form for /contact. Validates in the browser and shows a success
 *   state. Nothing is emailed until you wire sendInquiry to a provider.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Replace the body of sendInquiry with Formspree, Getform, or your API.
 *   2. See DEPLOYMENT.md for a copy-paste Formspree example.
 *   3. Edit labels and placeholders in config/site.ts → contactPage.form.
 *   4. Do not add a database or admin dashboard for the default product.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"

type FormValues = {
  name: string
  email: string
  message: string
}

const fieldClassName =
  "h-12 rounded-xl border-border bg-background px-4 text-sm shadow-none placeholder:text-muted-foreground/80 focus-visible:border-foreground/35 focus-visible:ring-1 focus-visible:ring-foreground/10 focus-visible:ring-offset-0"

async function sendInquiry(_values: FormValues): Promise<void> {
  // UI-only stub. Example (Formspree):
  // const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Accept: "application/json" },
  //   body: JSON.stringify(_values),
  // })
  // if (!res.ok) throw new Error("Failed to send")
  await new Promise((resolve) => setTimeout(resolve, 400))
}

export function ContactForm() {
  const copy = siteConfig.contactPage.form
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values: FormValues = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    }

    if (!values.name || !values.email || !values.message) {
      setStatus("error")
      return
    }

    setStatus("submitting")
    try {
      await sendInquiry(values)
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <p
        className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground"
        role="status"
      >
        {copy.successMessage}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {copy.nameLabel}
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          required
          className={fieldClassName}
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {copy.emailLabel}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          required
          className={fieldClassName}
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="message"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {copy.messageLabel}
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={copy.messagePlaceholder}
          className="min-h-[11.5rem] rounded-xl border-border bg-background px-4 py-3 text-sm shadow-none placeholder:text-muted-foreground/80 focus-visible:border-foreground/35 focus-visible:ring-1 focus-visible:ring-foreground/10 focus-visible:ring-offset-0"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {copy.errorMessage}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="group h-12 w-full rounded-xl text-sm font-medium shadow-none transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-zinc-800 hover:shadow-none motion-reduce:hover:translate-y-0"
      >
        {status === "submitting" ? copy.submittingLabel : copy.submitLabel}
        <ArrowRight
          aria-hidden="true"
          className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
        />
      </Button>
      <p className="text-sm text-muted-foreground">{copy.replyNote}</p>
    </form>
  )
}
