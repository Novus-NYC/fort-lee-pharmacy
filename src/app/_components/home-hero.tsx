"use client"

import Link from "next/link"
import PharmacyStorefrontIllustration from "@/lib/components/illustrations/pharmacy-storefront-illustration"
import PhoneIcon from "@/lib/components/icons/phone-icon"
import { useLanguage } from "@/lib/language-context"
import { useStoreHoursStatus } from "@/lib/hooks/use-store-hours-status"
import { siteData } from "@/lib/site-data"

const weekdayNames = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  ko: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
}

function formatStatusTime(time: string, language: "en" | "ko") {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/)
  if (!match) return time

  const [, hourText, minute, period] = match
  const hour = (Number(hourText) % 12) + (period === "PM" ? 12 : 0)

  return language === "ko"
    ? `${hour < 12 ? "오전" : "오후"} ${hour % 12 || 12}:${minute}`
    : `${hour % 12 || 12}:${minute} ${period}`
}

export default function HomeHero() {
  const { language } = useLanguage()
  const storeStatus = useStoreHoursStatus()
  const isEnglish = language === "en"

  const nextOpeningDay =
    storeStatus?.nextOpeningDay === "today"
      ? isEnglish
        ? "today"
        : "오늘"
      : storeStatus?.nextOpeningDay === "tomorrow"
        ? isEnglish
          ? "tomorrow"
          : "내일"
        : storeStatus?.nextOpeningDay === null ||
            storeStatus?.nextOpeningDay === undefined
          ? ""
          : weekdayNames[language][storeStatus.nextOpeningDay]

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="-my-12 flex min-h-[calc(100svh-76px)] items-center bg-[var(--color-navy)] py-12 max-[820px]:min-h-0 max-[820px]:py-[34px]"
    >
      <div className="mx-auto grid w-full grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] items-center gap-[44px] max-[820px]:grid-cols-1 max-[820px]:gap-0">
        <div
          style={{
            fontFamily:
              "var(--font-instrument-sans), var(--font-noto-sans-kr), sans-serif",
          }}
        >
          <h1
            id="home-hero-heading"
            className="text-balance text-[clamp(36px,4.9vw,68px)] font-black leading-none"
            style={{
              fontFamily: isEnglish
                ? "var(--font-big-shoulders), var(--font-noto-sans-kr), sans-serif"
                : "var(--font-noto-sans-kr), sans-serif",
            }}
          >
            {isEnglish
              ? "Your neighborhood pharmacy, in your language."
              : "우리 동네 약국, 우리말로 편하게."}
          </h1>
          <p className="mb-[22px] mt-[18px] max-w-[46ch] text-[18px] leading-[1.55] text-white">
            {isEnglish
              ? "Prescriptions, walk-in vaccines, and medical supplies with Korean and English service on Lemoine Avenue. 포트리 약국에 오신 것을 환영합니다."
              : "처방전, 예방접종, 의료용품까지. 르무안 애비뉴에서 한국어와 영어로 모십니다. Welcome to Fort Lee Pharmacy."}
          </p>
          <div className="flex flex-wrap gap-3 max-[420px]:flex-col">
            <a
              href={siteData.phone.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-small)] border-2 border-[var(--color-yellow)] bg-[var(--color-yellow)] px-5 py-[11px] text-[15px] font-bold text-[var(--color-navy)] no-underline hover:brightness-95 max-[420px]:w-full"
            >
              <PhoneIcon />
              {isEnglish ? "Call the pharmacy" : "전화하기"}
            </a>
            <Link
              href="/pages/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-small)] border-2 border-white/90 bg-transparent px-5 py-[11px] text-[15px] font-bold text-white no-underline hover:bg-white/10 max-[420px]:w-full"
            >
              {isEnglish ? "Visit or message us" : "방문 · 문의"}
            </Link>
          </div>
        </div>

        <figure className="relative mx-auto mt-11 w-full max-w-[420px] rotate-[1.5deg] max-[820px]:mt-11 lg:justify-self-end">
          <PharmacyStorefrontIllustration />

          <div
            className="absolute right-[-20px] top-[34%] z-10 grid w-28 justify-items-center gap-0.5 rounded-md border-2 border-white/95 bg-[#070d24] px-2 py-2 text-center shadow-[0_0_14px_#ff4d6d40]"
            role="status"
            aria-label={
              storeStatus
                ? storeStatus.isOpen
                  ? isEnglish
                    ? `Open now, until ${formatStatusTime(storeStatus.closingTime, language)}`
                    : `영업 중, ${formatStatusTime(storeStatus.closingTime, language)}까지`
                  : isEnglish
                    ? `Closed now, opens ${nextOpeningDay} at ${formatStatusTime(storeStatus.nextOpeningTime, language)}`
                    : `영업 종료, ${nextOpeningDay} ${formatStatusTime(storeStatus.nextOpeningTime, language)} 오픈`
                : isEnglish
                  ? "Checking pharmacy hours"
                  : "영업시간 확인 중"
            }
          >
            <span className="absolute -top-[55px] left-[14px] h-[54px] w-0.5 origin-bottom rotate-[48deg] bg-white/90" />
            <span className="absolute -top-[55px] right-[14px] h-[54px] w-0.5 origin-bottom rotate-[-48deg] bg-white/90" />
            <span className="absolute -top-[42px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#cfd4e0] shadow-inner" />
            <span
              className={`font-[var(--font-noto-sans-kr)] text-2xl font-black leading-none text-[#FF4D6D] ${
                storeStatus?.isOpen === false ? "opacity-40" : ""
              }`}
              style={{
                textShadow:
                  storeStatus?.isOpen === false ? "none" : "0 0 8px #FF4D6D99",
              }}
            >
              약
            </span>
            <span
              className={`mt-1 border-t-2 pt-1 text-base font-bold leading-none tracking-[0.14em] ${
                storeStatus?.isOpen
                  ? "border-[var(--color-yellow)] text-white"
                  : "border-white/40 text-white/70"
              }`}
            >
              {storeStatus
                ? storeStatus.isOpen
                  ? isEnglish
                    ? "OPEN"
                    : "영업 중"
                  : isEnglish
                    ? "CLOSED"
                    : "영업 종료"
                : isEnglish
                  ? "HOURS"
                  : "영업시간"}
            </span>
            <span className="text-[12px] leading-tight text-white/90">
              {storeStatus
                ? storeStatus.isOpen
                  ? isEnglish
                    ? `Until ${formatStatusTime(storeStatus.closingTime, language)}`
                    : `${formatStatusTime(storeStatus.closingTime, language)}까지`
                  : isEnglish
                    ? `Opens ${nextOpeningDay} at ${formatStatusTime(storeStatus.nextOpeningTime, language)}`
                    : `${nextOpeningDay} ${formatStatusTime(storeStatus.nextOpeningTime, language)} 오픈`
                : isEnglish
                  ? "Checking hours"
                  : "영업시간 확인 중"}
            </span>
          </div>

          <span
            className="absolute -bottom-[-10px] left-[-18px] z-10 rotate-[-3deg] rounded-[4px] bg-[var(--color-coral)] px-[14px] py-[1px] text-[22px] font-black text-[var(--color-navy)] shadow-[0_0_22px_#ff4d6d88,4px_4px_0_#0a1230]"
            style={{
              fontFamily:
                "var(--font-big-shoulders), var(--font-noto-sans-kr), sans-serif",
            }}
          >
            {isEnglish ? "Free delivery" : "무료 배달"}
          </span>
        </figure>
      </div>
    </section>
  )
}
