import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import BrandSlider from "@/components/brand-slider"
import { CaseStudies } from "@/components/case-studies"
import { Testimonials } from "@/components/testimonials"
import { SiteFooter } from "@/components/site-footer"
import  { Services } from "@/components/services"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <BrandSlider />
      <Services />
      <CaseStudies />
      <Testimonials />
      <SiteFooter />
    </>
  )
}
