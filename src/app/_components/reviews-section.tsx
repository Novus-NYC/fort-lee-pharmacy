"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { siteData } from "@/lib/site-data"

const reviews = [
  {
    en: "Placeholder review. Replace with a real Google review.",
    ko: "임시 후기입니다. 실제 구글 후기로 교체하세요.",
  },
  {
    en: "Placeholder review. Short and specific works best.",
    ko: "임시 후기입니다. 짧고 구체적인 후기가 좋습니다.",
  },
  {
    en: "Placeholder review. Keep only if the owner shares real ones.",
    ko: "임시 후기입니다. 실제 후기를 받은 경우에만 유지하세요.",
  },
]

export default function ReviewsSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const revealTimerRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setIsVisible(true)
        setIsRevealing(true)
        observer.disconnect()
        revealTimerRef.current = window.setTimeout(
          () => setIsRevealing(false),
          1800,
        )
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current)
      }
    }
  }, [])

  const isEnglish = language === "en"

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reviews-heading"
      className="bg-[var(--color-navy)] px-0 py-11 text-white"
    >
      <div className="mx-auto max-w-[1120px] px-[22px]">
        <p className="mb-2 flex items-center gap-3 text-sm font-semibold text-white/75">
          <span aria-hidden="true" className="h-[2px] w-9 bg-white/80" />
          {isEnglish ? "고객 후기" : "Reviews"}
        </p>
        <h2
          id="reviews-heading"
          className="mb-4 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.05]"
          style={{
            fontFamily: isEnglish
              ? "var(--font-display)"
              : "var(--font-korean)",
          }}
        >
          {isEnglish ? "Filled by your neighbors" : "이웃들이 남긴 후기"}
        </h2>
        <p className="mb-5 -mt-2 text-base opacity-85">
          {isEnglish
            ? "Google rating: [4.x] from [N] reviews (placeholder)"
            : "구글 평점: [4.x] / 후기 [N]개 (임시)"}
        </p>

        <div className="grid grid-cols-1 gap-[18px] max-[820px]:grid-cols-1 min-[821px]:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={review.en}
              className={`flex min-w-0 flex-col overflow-hidden rounded-[6px] bg-[var(--color-paper)] text-[var(--color-navy)] transition-[opacity,transform] duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[14px] opacity-0"
              } ${isVisible ? "hover:-translate-y-1.5" : ""}`}
              style={{
                transitionDelay: isRevealing ? `${index * 70}ms` : "0ms",
              }}
            >
              <div className="flex items-center justify-between gap-2 bg-[var(--color-red)] px-4 py-[10px] text-sm font-bold text-white">
                <span>{siteData.name.ko}</span>
                <span>{siteData.phone.display}</span>
              </div>

              <dl className="grid grid-cols-[auto_1fr] gap-x-[14px] gap-y-1 px-5 pt-3 text-[15px]">
                <dt className="font-bold text-[#5b6070]">
                  {isEnglish ? "Patient" : "환자"}
                </dt>
                <dd className="m-0 font-semibold">[Name]</dd>
                <dt className="font-bold text-[#5b6070]">
                  {isEnglish ? "Filled" : "날짜"}
                </dt>
                <dd className="m-0 font-semibold">[Date]</dd>
              </dl>

              <p className="px-5 pb-[18px] pt-[10px] text-[18px] leading-relaxed">
                “{review[language]}”
              </p>

              <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-[#0A1230]/30 px-5 py-[10px]">
                <span
                  role="img"
                  aria-label={
                    isEnglish
                      ? "Placeholder rating: five stars shown in the design reference"
                      : "임시 평점: 디자인 참고용 별 다섯 개"
                  }
                  className="font-bold tracking-[2px] text-[var(--color-red)]"
                >
                  ★★★★★
                </span>
                <span
                  aria-hidden="true"
                  className="h-6 w-[90px] bg-[repeating-linear-gradient(90deg,#0A1230_0_2px,transparent_2px_4px,#0A1230_4px_5px,transparent_5px_8px)]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
