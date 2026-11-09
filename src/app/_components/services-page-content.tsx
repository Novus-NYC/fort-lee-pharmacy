"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { siteData, type BilingualText } from "@/lib/site-data"

type ServiceId = (typeof siteData.services)[number]["id"]

const serviceDetails: Record<ServiceId, BilingualText> = {
  vaccines: {
    en: "Placeholder: who can be vaccinated, what to bring, and current stock.",
    ko: "임시: 접종 대상, 준비물, 재고 안내.",
  },
  prescriptions: {
    en: "Placeholder: how to request refills and how long fills usually take.",
    ko: "임시: 리필 요청 방법과 조제 소요 시간.",
  },
  "free-delivery": {
    en: "Placeholder: delivery area, days, and how to arrange it.",
    ko: "임시: 배달 지역, 요일, 신청 방법.",
  },
  "over-the-counter": {
    en: "Placeholder: featured brands and categories.",
    ko: "임시: 주요 브랜드와 품목.",
  },
  "medical-supplies": {
    en: "Placeholder: sizing help, rentals, and insurance coverage.",
    ko: "임시: 사이즈 상담, 대여, 보험 적용.",
  },
  "household-and-personal-care": {
    en: "Placeholder: product categories.",
    ko: "임시: 품목 안내.",
  },
}

export default function ServicesPageContent() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  return (
    <>
      <header className="pt-11 pb-2">
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="h-[2px] w-7 bg-current" />
            {isEnglish ? "서비스" : "Services"}
          </p>
          <h1
            className="text-[clamp(40px,6.5vw,76px)] font-extrabold leading-[1.05]"
            style={{
              fontFamily: isEnglish
                ? "var(--font-display)"
                : "var(--font-korean)",
            }}
          >
            {isEnglish ? "What we can do for you" : "저희가 도와드립니다"}
          </h1>
        </div>
      </header>

      <section
        aria-label={isEnglish ? "Pharmacy services" : "약국 서비스"}
        className="mt-6 w-full bg-[var(--color-blue)] py-11 text-white shadow-[0_0_0_100vmax(var(--color-blue))] [clip-path:inset(0_-100vmax)]"
      >
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <div className="mb-5">
            <p className="mb-[14px] text-base">
              {isEnglish
                ? "Questions about any of these? Ask the pharmacist, in Korean or English."
                : "궁금한 점은 약사에게 물어보세요. 한국어와 영어 모두 가능합니다."}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {siteData.services.map((service) => (
              <article
                key={service.id}
                className="group/card flex h-full min-w-0 flex-col rounded-[4px] border border-white/25 border-t-[6px] border-t-[#8FD3FF] bg-[var(--color-navy)] p-[18px] transition-transform duration-300 hover:-translate-y-1"
              >
                {/* label / title / description: 6px apart, no min-heights */}
                <div className="grid gap-1.5">
                  <span className="text-[17px] font-extrabold text-[#8FD3FF]">
                    {service.name[isEnglish ? "ko" : "en"]}
                  </span>
                  <h2
                    className={`m-0 text-[32px] font-extrabold transition-transform duration-300 group-hover/card:translate-x-[6px] ${
                      isEnglish ? "leading-[1.05]" : "leading-[1.2]"
                    }`}
                    style={{
                      fontFamily: isEnglish ? "var(--font-display)" : "var(--font-korean)",
                    }}
                  >
                    {service.name[language]}
                    {service.badge && (
                      <span className="ml-[10px] inline-block rounded-full bg-white px-[9px] py-[3px] align-middle text-xs font-bold leading-normal text-[var(--color-blue)]">
                        {service.badge[language]}
                      </span>
                    )}
                  </h2>
                  <p className="m-0 max-w-[52ch] text-[17px] leading-[1.55]">
                    {service.description[language]}
                  </p>
                </div>

                {/* expandable part: native <details> */}
                <details className="group/dtl mt-auto border-t border-dashed border-white/25 pt-0.5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                    <span>
                      {isEnglish
                        ? `More about ${service.name.en.toLowerCase()}`
                        : `${service.name.ko} 자세히 보기`}
                    </span>
                    <span aria-hidden="true" className="ml-auto text-2xl leading-none">
                      <span className="group-open/dtl:hidden">+</span>
                      <span className="hidden group-open/dtl:inline">−</span>
                    </span>
                  </summary>

                  <div className="animate-[services-reveal_350ms_ease] motion-reduce:animate-none">
                    <p className="mb-[14px] mt-1 max-w-[60ch] text-[17px] leading-[1.55]">
                      {serviceDetails[service.id][language]}
                    </p>
                    <a
                      href={siteData.phone.href}
                      className="inline-block rounded-[6px] border-2 border-current px-5 py-[11px] text-[15px] font-bold no-underline transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FD3FF]"
                    >
                      {isEnglish ? "Ask the pharmacist" : "약사에게 문의"}
                    </a>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="-mx-6 bg-[var(--color-paper)] px-6 py-[50px] text-[var(--color-navy)] shadow-[0_0_0_100vmax_var(--color-paper)] [clip-path:inset(0_-100vmax)]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-[22px]">
          <h2
            className="text-[clamp(28px,4vw,52px)] font-extrabold leading-tight"
            style={{
              fontFamily: isEnglish
                ? "var(--font-display)"
                : "var(--font-korean)",
            }}
          >
            {isEnglish
              ? "Moving your prescriptions to us?"
              : "처방전을 옮기고 싶으신가요?"}
          </h2>
          <Link
            href="/#contact-home"
            className="inline-flex min-h-11 items-center justify-center rounded-[4px] bg-[var(--color-red)] px-4 py-2 text-sm font-bold text-white no-underline transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue)]"
          >
            {isEnglish ? "Message the pharmacy" : "약국에 문의하기"}
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes services-reveal {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

      `}</style>
    </>
  )
}
