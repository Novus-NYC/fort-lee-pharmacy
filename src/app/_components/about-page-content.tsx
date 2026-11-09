"use client"

import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { siteData } from "@/lib/site-data"

function formatTime(time: string | null, language: "en" | "ko") {
  if (time === null) {
    return language === "en" ? "Closed" : "휴무"
  }

  const [hourText, minute] = time.split(":")
  const hour = Number(hourText) % 12 || 12

  return `${hour}:${minute}`
}

export default function AboutPageContent() {
  const { language } = useLanguage()
  const isEnglish = language === "en"
  const deliveryService = siteData.services.find(
    (service) => service.id === "free-delivery",
  )

  if (!deliveryService) {
    throw new Error("Missing free-delivery service data for the About page.")
  }

  const facts = [
    {
      label: isEnglish ? "Languages" : "언어",
      value: siteData.languages[language],
    },
    {
      label: isEnglish ? "Insurance" : "보험",
      value: isEnglish ? "Medicare and Medicaid" : "메디케어와 메디케이드",
    },
    {
      label: isEnglish ? "Payment" : "결제",
      value: isEnglish
        ? siteData.paymentMethods.en.replace(" and ", ", ")
        : siteData.paymentMethods.ko,
    },
    {
      label: isEnglish ? "Access" : "출입",
      value: isEnglish ? "Wheelchair accessible" : "휠체어 접근 가능",
    },
    {
      label: isEnglish ? "Delivery" : "배달",
      value: isEnglish
        ? `${deliveryService.name.en.replace("Free delivery", "Free")}, ask us`
        : "무료, 문의하세요",
    },
  ]

  return (
    <>
      <header className="pt-11 pb-2">
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="h-[2px] w-7 bg-current" />
            {isEnglish ? "소개" : "About"}
          </p>
          <h1
            className="text-[clamp(40px,6.5vw,76px)] font-extrabold leading-[1.05]"
            style={{
              fontFamily: isEnglish
                ? "var(--font-display)"
                : "var(--font-korean)",
            }}
          >
            {isEnglish
              ? "A Fort Lee pharmacy that speaks your language"
              : "우리말이 통하는 포트리 약국"}
          </h1>
        </div>
      </header>

      <section className="py-11">
        <div className="mx-auto grid max-w-[1120px] grid-cols-[0.9fr_1.1fr] items-start gap-10 px-[22px] max-[820px]:grid-cols-1 max-[820px]:gap-8">
          <div className="about-storefront-frame relative w-full">
            <Image
              src={siteData.storefrontImage}
              alt={
                isEnglish
                  ? "Fort Lee Pharmacy storefront on Lemoine Avenue"
                  : "르무안 애비뉴에 있는 포트리 약국 외관"
              }
              fill
              priority
              sizes="(max-width: 820px) calc(100vw - 44px), 45vw"
              style={{
                objectFit: "cover",
                objectPosition: "50% 30%",
                border: "3px solid #fff",
                boxShadow: "10px 10px 0 var(--color-blue)",
              }}
            />
          </div>

          <div>
            <div className="space-y-3">
              <p>
                {isEnglish
                  ? `${siteData.name.en} is a neighborhood pharmacy on Lemoine Avenue, serving families in Korean and English.`
                  : "포트리 약국은 르무안 애비뉴에서 한국어와 영어로 이웃 가족과 함께하는 동네 약국입니다."}
              </p>
              <p className="text-white/75">
                {isEnglish
                  ? "Placeholder: the owner’s story and why the pharmacy serves Korean and English speaking families."
                  : "임시: 약사님의 이야기와 두 언어로 상담하는 이유를 넣어 주세요."}
              </p>
            </div>

            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 border-t-2 border-white/25">
              {facts.map((fact) => (
                <Fragment key={fact.label}>
                  <dt className="m-0 border-b border-white/25 py-3 font-bold opacity-75">
                    {fact.label}
                  </dt>
                  <dd className="m-0 border-b border-white/25 py-3">{fact.value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-blue)] py-11 text-white shadow-[0_0_0_100vmax_var(--color-blue)] [clip-path:inset(0_-100vmax)]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-[0.9fr_1.1fr] items-center gap-10 px-[22px] max-[820px]:grid-cols-1 max-[820px]:gap-8">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <span aria-hidden="true" className="h-[2px] w-7 bg-current" />
              {isEnglish ? "영업시간" : "Hours"}
            </p>
            <h2
              className="mb-5 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.05]"
              style={{
                fontFamily: isEnglish
                  ? "var(--font-display)"
                  : "var(--font-korean)",
              }}
            >
              {isEnglish
                ? "Come by any day but Sunday"
                : "일요일을 제외하고 언제든 오세요"}
            </h2>
            <Link
              href="/pages/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-[4px] bg-[var(--color-yellow)] px-5 py-[11px] text-[15px] font-bold text-[var(--color-navy)] no-underline transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isEnglish
                ? "Get directions and contact"
                : "오시는 길 · 문의"}
            </Link>
          </div>

          <div className="max-w-[560px] rounded-[6px] border-2 border-white/20 bg-[#050a1c] px-[22px] py-[18px] text-[20px] font-bold text-[#7CFF6B]">
            <h3
              className="mb-[6px] border-b-2 border-[#7CFF6B]/40 pb-[10px] text-center text-[24px] font-extrabold tracking-[0.2em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isEnglish ? "HOURS" : "영업시간"}
            </h3>
            <dl className="m-0">
              {siteData.hours.map((businessHour) => (
                <div
                  key={businessHour.label.en}
                  className="flex justify-between gap-3 py-1.5 font-bold"
                >
                  <dt>{businessHour.label[language]}</dt>
                  <dd className="m-0 text-right">
                    {businessHour.opensAt && businessHour.closesAt
                      ? `${formatTime(businessHour.opensAt, language)}–${formatTime(
                          businessHour.closesAt,
                          language,
                        )}`
                      : formatTime(null, language)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-storefront-frame {
          height: 520px;
        }

        @media (max-width: 820px) {
          .about-storefront-frame {
            height: 300px;
          }
        }
      `}</style>
    </>
  )
}
