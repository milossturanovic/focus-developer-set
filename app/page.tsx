/**
 * ============================================================================
 * HOME PAGE
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home route. Navbar and footer come from the root layout. Sections are
 *   composed below; copy lives in config/site.ts. Featured project cards
 *   come from data/projects.json.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit hero copy in config/site.ts → hero.
 *   2. Edit about copy and image in config/site.ts → about.
 *   3. Edit services copy in config/site.ts → services.
 *   4. Edit toolkit copy in config/site.ts → toolkit.
 *   5. Edit experience copy and roles in config/site.ts → experience.
 *   6. Edit selected-projects heading in config/site.ts → selectedProjects.
 *   7. Edit reach copy and channels in config/site.ts → reach.
 *   8. Mark homepage cards with `"featured": true` in data/projects.json.
 *   9. Keep a single h1 on this page (it lives in the hero).
 *
 * ============================================================================
 */

import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ReachSection } from "@/components/sections/reach-section"
import { SelectedProjectsSection } from "@/components/sections/selected-projects-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ToolkitSection } from "@/components/sections/toolkit-section"
import { getFeaturedProjects } from "@/lib/projects-data"

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects(5)

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ToolkitSection />
      <ExperienceSection />
      <SelectedProjectsSection projects={featuredProjects} />
      <ReachSection />
    </>
  )
}
