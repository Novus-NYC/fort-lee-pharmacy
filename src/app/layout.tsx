import "./globals.css"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"
import { LanguageProvider } from "@/lib/language-context"

import {
  Big_Shoulders,
  Instrument_Sans,
  Noto_Sans_KR,
} from "next/font/google"

const displayFont = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  weight: ["800", "900"],
  adjustFontFallback: false,
})

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "600", "700"],
})

const koreanFont = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "800"],
})

export const metadata = {
  title: "Fort Lee Pharmacy & Surgicals",
  description:
    "A neighborhood pharmacy on Lemoine Avenue in Fort Lee, New Jersey."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${koreanFont.variable} min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}