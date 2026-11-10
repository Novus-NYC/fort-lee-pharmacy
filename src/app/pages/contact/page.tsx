import type { Metadata } from "next"
import ContactPageContent from "@/app/_components/contact-page-content"

export const metadata: Metadata = {
  title: "Contact | Fort Lee Pharmacy & Surgicals",
  description:
    "Visit, call, or write Fort Lee Pharmacy & Surgicals. Find our address, hours, and quick answers to common questions.",
}

export default function ContactPage() {
  return <ContactPageContent />
}
