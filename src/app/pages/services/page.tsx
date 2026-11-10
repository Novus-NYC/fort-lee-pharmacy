import type { Metadata } from "next"
import ServicesPageContent from "@/app/_components/services-page-content"

export const metadata: Metadata = {
  title: "Services | Fort Lee Pharmacy & Surgicals",
  description:
    "Explore pharmacy services at Fort Lee Pharmacy & Surgicals in Fort Lee, New Jersey.",
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
