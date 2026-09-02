/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Single source of truth for brand, navigation, contact, social links, and
 *   metadata. Navbar, footer, contact page, and root layout import this file.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Update name, shortName, role, description, and url to match your profile.
 *   2. Set contact.location and contact.email.
 *   3. Replace links.github, links.linkedin, links.twitter, and links.email.
 *   4. Add or remove navItems as needed (href should match a real route).
 *   5. Do not duplicate URLs in components — always read them from here.
 *
 * ============================================================================
 */

export type SiteConfig = typeof siteConfig

// ---------------------------------------------------------------------------
// EDITABLE CONTENT — update these to match your details
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: "John Doe",
  shortName: "John",
  role: "Front End Developer",
  description:
    "Junior front end developer portfolio — React, TypeScript, and small shipped UI projects.",
  url: "https://johndoe.dev",
  contact: {
    location: "United States",
    email: "john.doe@example.com",
  },

  // ---------------------------------------------------------------------------
  // NAVIGATION LINKS
  // ---------------------------------------------------------------------------
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],

  // ---------------------------------------------------------------------------
  // SOCIAL & CONTACT LINKS
  // ---------------------------------------------------------------------------
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:john.doe@example.com",
  },
}
