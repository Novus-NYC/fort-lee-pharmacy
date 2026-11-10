import type { Metadata } from "next"
import AboutPageContent from "@/app/_components/about-page-content"

export const metadata: Metadata = {
  title: "About | Fort Lee Pharmacy & Surgicals",
  description:
    "Learn about Fort Lee Pharmacy & Surgicals, a neighborhood pharmacy serving Fort Lee in Korean and English.",
}

export default function AboutPage() {
  return <AboutPageContent />
}
