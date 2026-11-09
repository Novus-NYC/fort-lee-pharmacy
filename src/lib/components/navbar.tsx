"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import PharmacyLogo from "@/lib/components/pharmacy-logo"
import { useLanguage } from "@/lib/language-context"
import { siteData } from "@/lib/site-data"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, toggleLanguage } = useLanguage()
  const languageLabel = language === "en" ? "한국어" : "English"
  const phoneHref = `tel:${siteData.phone.replaceAll("-", "")}`

  useEffect(() => {
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    document.addEventListener("keydown", closeMenuOnEscape)
    document.body.style.overflow = menuOpen ? "hidden" : ""

    return () => {
      document.removeEventListener("keydown", closeMenuOnEscape)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const isActive = (href: string) => pathname === href

  return (
    <nav className="site-nav sticky top-0 z-50 border-b border-white/20 bg-[var(--color-blue)] text-white">
      <div className="mx-auto flex min-h-[var(--nav-height)] max-w-[var(--content-width)] items-center gap-1 px-3 sm:gap-3 sm:px-6">
        <Link
          href="/"
          className="mr-auto flex min-w-0 flex-1 items-center gap-[clamp(0.35rem,1.5vw,0.5rem)] no-underline"
          onClick={closeMenu}
        >
          <span className="flex h-[clamp(30px,9vw,38px)] w-[clamp(30px,9vw,38px)] shrink-0 [&>svg]:h-full [&>svg]:w-full">
            <PharmacyLogo size={38} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[clamp(0.72rem,3.8vw,1rem)] font-bold leading-tight">
              {siteData.name.ko}
            </span>
            <span className="block truncate text-[clamp(0.5rem,2.5vw,0.6875rem)] text-white/80">
              {siteData.name.en}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 text-[15px] font-semibold md:flex">
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b-2 py-2 ${
                isActive(item.href)
                  ? "border-[var(--color-yellow)]"
                  : "border-transparent hover:border-[var(--color-yellow)]"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label[language]}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-[var(--radius-small)] border border-white/55 bg-transparent px-2 text-[clamp(0.65rem,2.8vw,0.8125rem)] font-bold sm:min-h-9 sm:px-3"
          onClick={toggleLanguage}
          aria-label={`Switch language to ${language === "en" ? "Korean" : "English"}`}
        >
          {languageLabel}
        </button>

        <a
          href={phoneHref}
          className="hidden min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-small)] border-2 border-[var(--color-yellow)] bg-[var(--color-yellow)] px-4 text-[15px] font-bold text-[var(--color-navy)] no-underline hover:brightness-95 md:inline-flex"
        >
          <Image
            src="/phone-icon.svg"
            alt=""
            width={14}
            height={14}
            className="h-3.5 w-3.5 shrink-0 object-contain"
          />
          {siteData.phone}
        </a>

        <a
          href={phoneHref}
          className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-[var(--radius-small)] border-2 border-[var(--color-yellow)] bg-[var(--color-yellow)] px-2 text-sm font-bold text-[var(--color-navy)] no-underline hover:brightness-95 md:hidden"
          aria-label={`Call ${siteData.phone}`}
        >
          <Image
            src="/phone-icon.svg"
            alt=""
            width={14}
            height={14}
            className="h-3.5 w-3.5 shrink-0 object-contain"
          />
          <span>Call</span>
        </a>

        <button
          type="button"
          className="inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-[var(--radius-small)] border border-white/60 bg-transparent text-xl md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-white/20 bg-[var(--color-navy)] px-6 py-5 md:hidden"
      >
        <div className="mx-auto flex max-w-[var(--content-width)] flex-col gap-3 text-lg font-semibold">
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b py-3 ${
                isActive(item.href)
                  ? "border-[var(--color-yellow)]"
                  : "border-white/20"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={closeMenu}
            >
              {item.label[language]}
            </Link>
          ))}
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-2 self-start rounded-[var(--radius-small)] border border-white/60 px-3 text-sm"
            onClick={toggleLanguage}
            aria-label={`Switch language to ${language === "en" ? "Korean" : "English"}`}
          >
            {languageLabel}
          </button>
          <a
            href={phoneHref}
            className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-small)] bg-[var(--color-yellow)] px-4 text-base font-bold text-[var(--color-navy)] no-underline"
            onClick={closeMenu}
          >
            <Image
              src="/phone-icon.svg"
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 shrink-0 object-contain"
            />
            Call
          </a>
        </div>
      </div>
    </nav>
  )
}
