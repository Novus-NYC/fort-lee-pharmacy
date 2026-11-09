import HomeHero from "@/app/_components/home-hero"
import ServicesSection from "@/app/_components/services-section"
import InfoBanner from "@/app/_components/info-banner"
import ReviewsSection from "@/app/_components/reviews-section"

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesSection />
      <InfoBanner />
      <ReviewsSection />
    </>
  )
}
