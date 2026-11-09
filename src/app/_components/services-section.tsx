"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { siteData } from "@/lib/site-data"

export default function ServicesSection() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isEnglish = language === "en"

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home-services"
      aria-labelledby="home-services-heading"
      className="-mx-6 bg-[#1E3FA8] px-6 py-11 text-white shadow-[0_0_0_100vmax_#1E3FA8] [clip-path:inset(0_-100vmax)]"
    >
      <div className="mx-auto max-w-[1120px] px-[22px]">
        <div className="mb-[22px]">
          <p className="mb-[14px] flex items-center gap-3 text-sm font-semibold text-white/75">
            <span aria-hidden="true" className="h-[2px] w-8 bg-white/70" />
            {isEnglish ? "서비스" : "Services"}
          </p>
          <h2
            id="home-services-heading"
            className="mb-6 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.05]"
            style={{
              fontFamily: isEnglish
                ? "var(--font-big-shoulders), var(--font-noto-sans-kr), sans-serif"
                : "var(--font-noto-sans-kr), sans-serif",
            }}
          >
            {isEnglish
              ? "Everything for your family’s health"
              : "온 가족의 건강을 한곳에서"}
          </h2>
          <Link
            href="/pages/services"
            className="inline-flex min-h-11 items-center justify-center rounded-[4px] bg-[#FFD23F] px-5 py-[11px] text-[15px] font-bold text-[#0A1230] no-underline transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD23F]"
          >
            {isEnglish ? "See all services" : "서비스 전체 보기"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.services.map((service, index) => (
            <article
              key={service.id}
              className={`min-w-0 rounded-[4px] border border-white/25 border-t-[6px] border-t-[#8FD3FF] bg-[#0A1230] p-[18px] transition-[opacity,transform,background-color] duration-500 hover:bg-[#111a38] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="min-w-0">
                <span className="mb-2 block text-[15px] font-extrabold text-[#8FD3FF]">
                  {service.name[isEnglish ? "ko" : "en"]}
                </span>
                <h3
                  className="text-[30px] font-extrabold leading-[1.05]"
                  style={{
                    fontFamily: isEnglish
                      ? "var(--font-big-shoulders), var(--font-noto-sans-kr), sans-serif"
                      : "var(--font-noto-sans-kr), sans-serif",
                  }}
                >
                  {service.name[language]}
                  {service.badge && (
                    <span className="ml-2 inline-flex align-middle rounded-full bg-white px-[9px] py-[3px] text-xs font-bold leading-tight text-[#1E3FA8]">
                      {service.badge[language]}
                    </span>
                  )}
                </h3>
              </div>
              <p className="mb-0 mt-3 max-w-[52ch] text-base leading-relaxed">
                {service.description[language]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
