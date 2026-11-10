"use client"

import Link from "next/link"
import PharmacyLogo from "@/lib/components/pharmacy-logo"
import PhoneIcon from "@/lib/components/icons/phone-icon"
import { useStoreHoursStatus } from "@/lib/hooks/use-store-hours-status"
import { siteData } from "@/lib/site-data"
import { useLanguage } from "@/lib/language-context"

const weekdayNames = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  ko: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
}

function formatTime(time: string, language: "en" | "ko") {
  const match = time.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/)
  if (!match) return time

  const [, hourText, minute, period] = match
  const hour = period
    ? (Number(hourText) % 12) + (period === "PM" ? 12 : 0)
    : Number(hourText)

  if (language === "ko") {
    const period = hour < 12 ? "오전" : "오후"
    return `${period} ${hour % 12 || 12}:${minute}`
  }

  return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="min-w-0 text-left lg:flex-none">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-sky-300">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function Footer() {
  const { language } = useLanguage()
  const hoursStatus = useStoreHoursStatus()
  const isEnglish = language === "en"
  const hoursMessage = hoursStatus
    ? hoursStatus.isOpen
      ? isEnglish
        ? `Open now · Until ${formatTime(hoursStatus.closingTime, language)}`
        : `영업 중 · ${formatTime(hoursStatus.closingTime, language)}까지`
      : hoursStatus.nextOpeningTime
        ? isEnglish
          ? `Closed now · Opens ${
              hoursStatus.nextOpeningDay === "today"
                ? "today"
                : hoursStatus.nextOpeningDay === "tomorrow"
                  ? "tomorrow"
                  : hoursStatus.nextOpeningDay === null
                    ? ""
                    : weekdayNames.en[hoursStatus.nextOpeningDay]
            } at ${formatTime(hoursStatus.nextOpeningTime, language)}`
          : `영업 종료 · ${
              hoursStatus.nextOpeningDay === "today"
                ? "오늘"
                : hoursStatus.nextOpeningDay === "tomorrow"
                  ? "내일"
                  : hoursStatus.nextOpeningDay === null
                    ? ""
                    : weekdayNames.ko[hoursStatus.nextOpeningDay]
            } ${formatTime(hoursStatus.nextOpeningTime, language)} 오픈`
        : isEnglish
          ? "Closed now"
          : "영업 종료"
    : isEnglish
      ? "Checking hours"
      : "영업시간 확인 중"

  const columnTitles = isEnglish
    ? { visit: "Visit", hours: "Hours", contact: "Contact", explore: "Explore" }
    : { visit: "방문", hours: "영업시간", contact: "연락처", explore: "둘러보기" }

  return (
    <footer className="relative bg-[linear-gradient(180deg,_#0f1f5c,_#060b20_55%)] text-white">
      <div
        aria-hidden="true"
        className="h-[3px] bg-gradient-to-r from-[var(--color-blue)] via-[#3df0dc] to-[var(--color-coral)]"
      />
      <div className="mx-auto max-w-[var(--content-width)] px-6 pb-5 pt-10 sm:px-8 sm:pt-12">
        <div className="rounded-2xl border border-white/[0.13] bg-white/[0.05] p-5 sm:p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <Link
                href="/"
                className="inline-flex max-w-full items-center gap-2.5 no-underline"
              >
                <PharmacyLogo size={38} />
                <span className="min-w-0">
                  <span className="block truncate font-[var(--font-korean)] text-base font-extrabold leading-tight">
                    {siteData.name[language]}
                  </span>
                  <span className="block truncate text-xs text-white/75">
                    {siteData.name[isEnglish ? "ko" : "en"]}
                  </span>
                </span>
              </Link>
              <p className="mt-4 max-w-[42ch] text-sm text-white/75">
                {siteData.footerDescription[language]}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteData.phone.href}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-small)] bg-[var(--color-yellow)] px-4 py-2.5 text-sm font-bold text-[var(--color-navy)] no-underline hover:brightness-95 sm:flex-none"
                  aria-label={
                    isEnglish
                      ? `Call ${siteData.phone.display}`
                      : `${siteData.phone.display} 전화하기`
                  }
                >
                  <PhoneIcon />
                  {siteData.phone.display}
                </a>
                <Link
                  href="/pages/contact"
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[var(--radius-small)] border border-white/45 px-4 py-2.5 text-sm font-semibold text-white no-underline hover:border-white sm:flex-none"
                >
                  {isEnglish ? "Message us" : "문의하기"}
                </Link>
              </div>
              <div
                className={`inline-flex w-fit max-w-full flex-wrap items-center gap-[10px] self-center rounded-full border-[1.5px] bg-[#0b1636] px-4 py-2 text-sm font-bold leading-tight text-white md:self-end sm:text-[15px] ${
                  hoursStatus?.isOpen
                    ? "border-[#3df0dc66]"
                    : hoursStatus
                      ? "border-[#ff4d6d66]"
                      : "border-white/25"
                }`}
                role="status"
                aria-live="polite"
              >
                <span
                  aria-hidden="true"
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    hoursStatus
                      ? hoursStatus.isOpen
                        ? "bg-green-400 shadow-[0_0_10px_#4ade80]"
                        : "bg-[var(--color-coral)]"
                      : "bg-white/40"
                  }`}
                />
                <span className="min-w-0">{hoursMessage}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 border-b border-white/15 px-6 py-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:flex lg:items-start lg:justify-between lg:gap-0">
          <FooterColumn title={columnTitles.visit}>
            <address className="text-sm not-italic leading-relaxed text-white/75">
              <a
                href={siteData.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {siteData.address.street}
                <br />
                {siteData.address.city}, {siteData.address.state} {siteData.address.postalCode}
              </a>
            </address>
          </FooterColumn>

          <FooterColumn title={columnTitles.hours}>
            <dl className="text-sm">
              {siteData.hours.map((hour) => (
                <div
                  key={hour.label.en}
                  className="flex justify-between gap-3 border-b border-white/15 py-2 first:pt-0 last:border-b-0"
                >
                  <dt
                    className={
                      hoursStatus?.todayScheduleLabel?.en === hour.label.en
                        ? "text-[#3df0dc]"
                        : "text-white/75"
                    }
                  >
                    {hour.label[language]}
                    {hoursStatus?.todayScheduleLabel?.en === hour.label.en && (
                      <span className="ml-1 font-normal">
                        · {isEnglish ? "today" : "오늘"}
                      </span>
                    )}
                  </dt>
                  <dd
                    className={`m-0 text-right font-semibold ${
                      hoursStatus?.todayScheduleLabel?.en === hour.label.en
                        ? "text-[#3df0dc]"
                        : "text-white/90"
                    }`}
                  >
                    {hour.opensAt && hour.closesAt
                      ? `${formatTime(hour.opensAt, language)}–${formatTime(hour.closesAt, language)}`
                      : isEnglish
                        ? "Closed"
                        : "휴무"}
                  </dd>
                </div>
              ))}
            </dl>
          </FooterColumn>

          <FooterColumn title={columnTitles.contact}>
            <div className="flex flex-col items-start gap-2 text-sm text-white/75">
              <a
                href={siteData.phone.href}
                className="underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {isEnglish ? "Phone" : "전화"}: {siteData.phone.display}
              </a>
              <a
                href={siteData.fax.href}
                className="underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {isEnglish ? "Fax" : "팩스"}: {siteData.fax.display}
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="break-all underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {isEnglish ? "Email" : "이메일"}: {siteData.email}
              </a>
            </div>
          </FooterColumn>

          <FooterColumn title={columnTitles.explore}>
            <nav aria-label={isEnglish ? "Footer navigation" : "푸터 탐색"}>
              <ul className="flex w-full flex-col items-stretch gap-2 text-sm text-white/75">
                {siteData.navigation.map((item) => (
                  <li key={item.href} className="w-full">
                    <Link
                      href={item.href}
                      className="block w-full text-left hover:text-white hover:underline"
                    >
                      {item.label[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 pt-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 {siteData.name[language]} · {siteData.name[isEnglish ? "ko" : "en"]}
          </span>
          <a
            href={siteData.novusUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  )
}
