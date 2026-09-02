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
 *   3. Do not add a database or admin dashboard for the default product.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormValues = {
  name: string
  email: string
  message: string
}

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
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  )

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
      <p className="rounded-md border border-border bg-muted p-4 text-sm" role="status">
        Thanks — this demo form is working. Wire sendInquiry before launch so
        messages actually arrive.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Please fill in every field, then try again.
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}
