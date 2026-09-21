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
 *   4. Edit hero.kicker, hero.headline, hero.bio, hero.cta, hero.secondaryCta, and hero.stats.
 *   5. Edit about.title, about.paragraphs, and about.image.
 *   6. Edit services.title, services.intro, and services.items.
 *   7. Edit toolkit.title, toolkit.intro, and toolkit.groups (tools + marks).
 *   8. Edit experience.title, experience.intro, years, and roles.
 *   9. Edit selectedProjects.title and selectedProjects.intro. Cards come
 *      from data/projects.json (featured published projects).
 *  10. Edit projectsPage.title and projectsPage.intro for the /projects archive.
 *  11. Edit caseStudyPage labels for the /projects/[slug] detail page.
 *  12. Edit reach.title, reach.intro, details, CTAs, and channels.
 *  13. Edit contactPage.title, intro, locationLine, availability, and form copy.
 *  14. Add or remove navItems as needed (href should match a real route).
 *  15. Do not duplicate URLs in components — always read them from here.
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
  role: "Frontend Developer",
  description:
    "Frontend developer — React, TypeScript, APIs, and AI-assisted workflows. Practice projects shipped on GitHub and Vercel.",
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

  // ---------------------------------------------------------------------------
  // HERO — home page editorial section
  // ---------------------------------------------------------------------------
  hero: {
    /** Small line above the H1. */
    kicker: "React • TypeScript • APIs • AI-Assisted Workflows",
    /** Each string is a line in the H1. */
    headline: ["Building useful product interfaces", "with React"],
    bio: "I build responsive, data-driven interfaces with React, TypeScript, and REST APIs — focused on clean implementation, maintainable code, and the loading, error, and form states real products need.",
    cta: {
      label: "View projects",
      href: "/projects",
    },
    secondaryCta: {
      label: "Download resume",
      /** Put your PDF at public/resume.pdf (or change this path). */
      href: "/resume.pdf",
      download: true,
    },
    stats: [
      { label: "Frontend practice", value: "1+ Year" },
      { label: "Built & deployed", value: "4+ Projects" },
      { label: "Main stack", value: "React" },
    ],
  },

  // ---------------------------------------------------------------------------
  // ABOUT — home page editorial intro (between hero and services)
  //
  // Replace about.image.src with a photo under /public. Keep paragraphs short.
  // ---------------------------------------------------------------------------
  about: {
    title: "A frontend developer who can contribute on a product team",
    paragraphs: [
      "I build React interfaces that connect to real data — dashboards, internal tools, forms, and the loading and error states those screens need. The projects here are practice I shipped, not mockups.",
      "I use AI tools to plan, debug, refactor, and document, then I review the code myself before it goes on GitHub. I can work with design, backend, and QA. I am looking for a junior frontend role where I can keep contributing.",
    ],
    image: {
      src: "/about/studio-desk.jpg",
      alt: "Laptop, linen notebook, and pen on a white desk",
    },
  },

  // ---------------------------------------------------------------------------
  // SERVICES — home page three-card strip
  //
  // `items[].icon` accepts: "layers" | "microscope" | "compass"
  // ---------------------------------------------------------------------------
  services: {
    title: "How I Contribute",
    intro:
      "Three ways I show up on a frontend team: product interfaces, API-driven features, and careful use of AI while I still own the code.",
    items: [
      {
        id: "product-interfaces",
        icon: "layers",
        title: "Product Interfaces",
        description:
          "React interfaces for dashboards, internal tools, product workflows, and client-facing features — with reusable components and a structure that is ready to deploy.",
        deliverables: [
          "Reusable React components",
          "Responsive, accessible layouts",
          "Dashboards and internal tools",
        ],
      },
      {
        id: "api-driven",
        icon: "compass",
        title: "API-Driven Features",
        description:
          "REST API integration, forms, validation, loading states, error states, and real data handling so the UI behaves like a product, not a static page.",
        deliverables: [
          "REST API integration",
          "Forms and validation",
          "Loading and error states",
        ],
      },
      {
        id: "ai-assisted",
        icon: "microscope",
        title: "AI-Assisted Workflow",
        description:
          "I use tools like Cursor, ChatGPT, Claude, and GitHub Copilot to support planning, debugging, refactoring, and documentation — then I review and understand the final code.",
        deliverables: [
          "Planning and debugging support",
          "Refactoring and documentation",
          "Code I can still explain in review",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // TOOLKIT — home page grouped tool grid
  //
  // `groups[].tools[].mark` is a two-letter abbreviation shown in the tile
  // (generic, not a brand logo). Add or remove tools freely.
  // ---------------------------------------------------------------------------
  toolkit: {
    title: "The toolkit",
    intro:
      "The tools I use to build, review, and deploy frontend work — grouped by how they show up in a project.",
    groups: [
      {
        id: "core-frontend",
        label: "Core Frontend",
        tools: [
          { name: "HTML", mark: "Ht" },
          { name: "CSS", mark: "Cs" },
          { name: "JavaScript", mark: "Js" },
          { name: "TypeScript", mark: "Ts" },
          { name: "React", mark: "Re" },
          { name: "Next.js", mark: "Nx" },
        ],
      },
      {
        id: "ui-styling",
        label: "UI & Styling",
        tools: [
          { name: "Tailwind CSS", mark: "Tw" },
          { name: "Responsive", mark: "Rd" },
          { name: "Accessibility", mark: "Ax" },
          { name: "Components", mark: "Cm" },
          { name: "CSS Modules", mark: "Md" },
          { name: "Figma Basics", mark: "Fg" },
        ],
      },
      {
        id: "ai-workflow",
        label: "AI-Assisted Workflow",
        tools: [
          { name: "Cursor", mark: "Cu" },
          { name: "ChatGPT", mark: "Cg" },
          { name: "Claude", mark: "Cl" },
          { name: "GitHub Copilot", mark: "Cp" },
          { name: "Prompting", mark: "Pr" },
          { name: "AI Code Review", mark: "Cr" },
        ],
      },
      {
        id: "build-deploy",
        label: "Build & Deployment",
        tools: [
          { name: "Git", mark: "Gt" },
          { name: "GitHub", mark: "Gh" },
          { name: "Vercel", mark: "Vc" },
          { name: "npm", mark: "Np" },
          { name: "Vite", mark: "Vt" },
          { name: "Netlify", mark: "Nt" },
        ],
      },
      {
        id: "data-features",
        label: "Data & Features",
        tools: [
          { name: "REST APIs", mark: "Ra" },
          { name: "JSON", mark: "Jn" },
          { name: "Forms", mark: "Fm" },
          { name: "Dashboards", mark: "Db" },
          { name: "Automation", mark: "Au" },
          { name: "Loading states", mark: "Ld" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // EXPERIENCE — home page Gantt-style tenure chart
  //
  // `roles[].start` / `end` are years. Bars are scaled between axisStart
  // and axisEnd. type: "full-time" | "freelance"
  // ---------------------------------------------------------------------------
  experience: {
    title: "A short, honest timeline",
    intro:
      "From HTML and CSS in 2023 to React, APIs, freelance sites, and an AI-assisted workflow I still review myself.",
    axisStart: 2023,
    axisEnd: 2026,
    years: [2023, 2024, 2025, 2026],
    legend: {
      fullTime: "Practice and roles",
      freelance: "Freelance alongside",
    },
    roles: [
      {
        id: "foundations",
        company: "Frontend Foundations",
        role: "HTML, CSS, JavaScript, Git, responsive layouts",
        start: 2023,
        end: 2024,
        type: "full-time",
      },
      {
        id: "react-building",
        company: "React Project Building",
        role: "Components, hooks, forms, routing, APIs",
        start: 2024,
        end: 2025,
        type: "full-time",
      },
      {
        id: "ai-workflow",
        company: "AI-Assisted Workflow",
        role: "Cursor, ChatGPT, debugging, documentation, refactoring",
        start: 2025,
        end: 2026,
        type: "full-time",
      },
      {
        id: "freelance",
        company: "Freelance Web Projects",
        role: "React interfaces, dashboards, small sites, API-connected features",
        start: 2025,
        end: 2026,
        type: "freelance",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SELECTED PROJECTS — home page cinematic slider
  //
  // Card content (title, category, coverImage) lives in data/projects.json.
  // Mark a project `"featured": true` to include it here.
  // ---------------------------------------------------------------------------
  selectedProjects: {
    title: "Selected projects",
    intro:
      "React practice I shipped — dashboards, trackers, storefronts, and API-shaped data, each with a case study and a repo.",
  },

  // ---------------------------------------------------------------------------
  // PROJECTS PAGE — /projects archive
  //
  // Cards come from every published entry in data/projects.json.
  // ---------------------------------------------------------------------------
  projectsPage: {
    title: "Projects",
    intro:
      "React practice I shipped — each card is a case study covering data, states, the stack, and the repo.",
  },

  // ---------------------------------------------------------------------------
  // CASE STUDY PAGE — /projects/[slug]
  //
  // Project content lives in data/projects.json. These are UI labels only.
  // ---------------------------------------------------------------------------
  caseStudyPage: {
    backLabel: "All projects",
    infoTitle: "Project info",
    technologiesTitle: "Technologies",
    relatedTitle: "Related projects",
    highlightsTitle: "Highlights",
    livePreviewLabel: "View live preview",
    sourceLabel: "View source",
    shareLabel: "Share this project",
    nextLabel: "Next project",
  },

  // ---------------------------------------------------------------------------
  // REACH — home page contact CTA
  //
  // Channel `hrefKey` reads from links above: "email" | "linkedin" | "github" | "twitter"
  // `icon` accepts: "mail" | "linkedin" | "github" | "x"
  // ---------------------------------------------------------------------------
  reach: {
    title: "How to reach me",
    intro:
      "I am looking for junior frontend and React roles. Email is best for applications. LinkedIn and GitHub are up to date.",
    details: [
      { icon: "pin", text: "Based in the United States" },
      { icon: "clock", text: "Usually online weekdays, 9am to 5pm ET" },
    ],
    primaryCta: {
      label: "Email me",
      hrefKey: "email",
    },
    secondaryCta: {
      label: "Connect on LinkedIn",
      hrefKey: "linkedin",
    },
    channels: [
      {
        id: "email",
        icon: "mail",
        name: "Email",
        note: "Best for applications and conversations about junior frontend roles.",
        pill: "Same day",
        hrefKey: "email",
      },
      {
        id: "linkedin",
        icon: "linkedin",
        name: "LinkedIn",
        note: "Best for recruiting, intros, and work-related messages.",
        pill: "1 to 2 days",
        hrefKey: "linkedin",
      },
      {
        id: "github",
        icon: "github",
        name: "GitHub",
        note: "Project repos, commit history, and what I have actually shipped.",
        pill: "Active profile",
        hrefKey: "github",
      },
      {
        id: "x",
        icon: "x",
        name: "X",
        note: "Casual — not the place for applications or role conversations.",
        pill: "Occasionally",
        hrefKey: "twitter",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // CONTACT PAGE — /contact
  //
  // Email comes from contact.email / links.email. Social URLs come from links.
  // ---------------------------------------------------------------------------
  contactPage: {
    title: "Start a conversation",
    intro:
      "Whether you are hiring for a junior frontend role or want to talk about a project I built, I am happy to hear from you.",
    locationLine: "United States",
    availability: "Open to junior frontend roles",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder:
        "Tell me about the role, the stack, and the timeline.",
      submitLabel: "Send message",
      submittingLabel: "Sending…",
      replyNote: "I reply within two business days.",
      errorMessage: "Please fill in every field, then try again.",
      successMessage:
        "Thanks — this demo form is working. Wire sendInquiry before launch so messages actually arrive.",
    },
  },
}
