"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import PharmacyLogo from "@/lib/components/pharmacy-logo"
import { siteData, type BusinessHour } from "@/lib/site-data"

const addressParts = siteData.address.en.split(", ")
const streetAddress = addressParts[0]
const cityAddress = addressParts.slice(1).join(", ")
const pharmacyTimeZone = "America/New_York"

type HoursStatus = {
  today: string
  isOpen: boolean
  message: string
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function getHoursStatus(hours: BusinessHour[], date: Date): HoursStatus {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: pharmacyTimeZone,
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const weekday = dateParts.find((part) => part.type === "weekday")?.value
  const hour = Number(dateParts.find((part) => part.type === "hour")?.value)
  const minute = Number(dateParts.find((part) => part.type === "minute")?.value)
  const weekdayIndex = weekdays.indexOf(weekday ?? "")
  const currentMinutes = (hour === 24 ? 0 : hour) * 60 + minute

  const getScheduleForDay = (dayIndex: number) =>
    hours.find((schedule) => {
    const [startDay, endDay] = schedule.days.en.split(/[–-]/).map((day) => day.trim())
    const startIndex = weekdays.indexOf(startDay)
    const endIndex = endDay ? weekdays.indexOf(endDay) : startIndex

    return dayIndex >= startIndex && dayIndex <= endIndex
  })

  const toMinutes = (hours: string, minutes: string, period: string) => {
    const hourInDay = Number(hours) % 12 + (period === "PM" ? 12 : 0)
    return hourInDay * 60 + Number(minutes)
  }

  const todaySchedule = getScheduleForDay(weekdayIndex)
  const todayTime = todaySchedule?.hours.en.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)–(\d{1,2}):(\d{2})\s*(AM|PM)$/,
  )

  if (todaySchedule && todayTime) {
    const openMinutes = toMinutes(todayTime[1], todayTime[2], todayTime[3])
    const closeMinutes = toMinutes(todayTime[4], todayTime[5], todayTime[6])

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        today: todaySchedule.days.en,
        isOpen: true,
        message: `Open now · Until ${todayTime[4]}:${todayTime[5]} ${todayTime[6]}`,
      }
    }
  }

  for (let dayOffset = 0; dayOffset < weekdays.length; dayOffset += 1) {
    const targetDayIndex = (weekdayIndex + dayOffset) % weekdays.length
    const schedule = getScheduleForDay(targetDayIndex)
    const openingTime = schedule?.hours.en.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)–(\d{1,2}):(\d{2})\s*(AM|PM)$/,
    )

    if (!schedule || !openingTime) {
      continue
    }

    const openingMinutes = toMinutes(openingTime[1], openingTime[2], openingTime[3])
    if (dayOffset === 0 && currentMinutes >= openingMinutes) {
      continue
    }

    const dayLabel =
      dayOffset === 0
        ? "today"
        : dayOffset === 1
          ? "tomorrow"
          : weekdays[targetDayIndex]

    return {
      today: todaySchedule?.days.en ?? "",
      isOpen: false,
      message: `Closed now · Opens ${dayLabel} at ${openingTime[1]}:${openingTime[2]} ${openingTime[3]}`,
    }
  }

  return {
    today: todaySchedule?.days.en ?? "",
    isOpen: false,
    message: "Closed now",
  }
}

function PhoneIcon() {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
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
  const [hoursStatus, setHoursStatus] = useState<HoursStatus | null>(null)

  useEffect(() => {
    const updateHoursStatus = () => {
      setHoursStatus(getHoursStatus(siteData.hours, new Date()))
    }

    updateHoursStatus()
    const intervalId = window.setInterval(updateHoursStatus, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

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
                  <span className="block truncate font-[var(--font-noto-sans-kr)] text-base font-extrabold leading-tight">
                    {siteData.name.ko}
                  </span>
                  <span className="block truncate text-xs text-white/75">
                    {siteData.name.en}
                  </span>
                </span>
              </Link>
              <p className="mt-4 max-w-[42ch] text-sm text-white/75">
                {siteData.footerDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${siteData.phone.replaceAll("-", "")}`}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-small)] bg-[var(--color-yellow)] px-4 py-2.5 text-sm font-bold text-[var(--color-navy)] no-underline hover:brightness-95 sm:flex-none"
                  aria-label={`Call ${siteData.phone}`}
                >
                  <PhoneIcon />
                  {siteData.phone}
                </a>
                <Link
                  href="/pages/contact"
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[var(--radius-small)] border border-white/45 px-4 py-2.5 text-sm font-semibold text-white no-underline hover:border-white sm:flex-none"
                >
                  Message us
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
                <span className="min-w-0">{hoursStatus?.message ?? "Checking hours"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 border-b border-white/15 px-6 py-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:flex lg:items-start lg:justify-between lg:gap-0">
          <FooterColumn title="Visit">
            <address className="text-sm not-italic leading-relaxed text-white/75">
              <a
                href={siteData.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {streetAddress}
                <br />
                {cityAddress}
              </a>
            </address>
          </FooterColumn>

          <FooterColumn title="Hours">
            <dl className="text-sm">
              {siteData.hours.map((hour) => (
                <div
                  key={hour.days.en}
                  className="flex justify-between gap-3 border-b border-white/15 py-2 first:pt-0 last:border-b-0"
                >
                  <dt
                    className={
                      hoursStatus?.today === hour.days.en
                        ? "text-[#3df0dc]"
                        : "text-white/75"
                    }
                  >
                    {hour.days.en === "Monday–Friday" ? "Mon–Fri" : hour.days.en}
                    {hoursStatus?.today === hour.days.en && (
                      <span className="ml-1 font-normal">· today</span>
                    )}
                  </dt>
                  <dd
                    className={`m-0 text-right font-semibold ${
                      hoursStatus?.today === hour.days.en
                        ? "text-[#3df0dc]"
                        : "text-white/90"
                    }`}
                  >
                    {hour.hours.en}
                  </dd>
                </div>
              ))}
            </dl>
          </FooterColumn>

          <FooterColumn title="Contact">
            <div className="flex flex-col items-start gap-2 text-sm text-white/75">
              <a
                href={`tel:${siteData.phone.replaceAll("-", "")}`}
                className="underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {siteData.phone}
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="break-all underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {siteData.email}
              </a>
            </div>
          </FooterColumn>

          <FooterColumn title="Explore">
            <nav aria-label="Footer navigation" className="w-full">
              <ul className="flex w-full flex-col items-stretch gap-2 text-sm text-white/75">
                {siteData.navigation.map((item) => (
                  <li key={item.href} className="w-full">
                    <Link
                      href={item.href}
                      className="block w-full text-left hover:text-white hover:underline"
                    >
                      {item.label.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 pt-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 {siteData.name.en} · {siteData.name.ko}
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
