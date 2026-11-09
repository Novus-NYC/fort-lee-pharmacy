"use client"

import { useLanguage } from "@/lib/language-context"
import { siteData } from "@/lib/site-data"

const addressQuery = [
  siteData.address.street,
  siteData.address.city,
  siteData.address.state,
  siteData.address.postalCode,
].join(", ")

const mapEmbedUrl = new URL("https://www.google.com/maps")
mapEmbedUrl.searchParams.set("q", addressQuery)
mapEmbedUrl.searchParams.set("output", "embed")

function formatHours(time: string, language: "en" | "ko") {
  const [hourText, minute] = time.split(":")
  const hourValue = Number(hourText)
  const period = hourValue >= 12 ? "PM" : "AM"
  const hour = hourValue % 12 || 12

  return language === "en"
    ? `${hour}:${minute} ${period}`
    : `${period === "AM" ? "오전" : "오후"} ${hour}:${minute}`
}

export default function ContactSection() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  return (
    <section
      id="contact-home"
      aria-labelledby="home-contact-heading"
      className="-mx-6 bg-[var(--color-blue)] px-6 py-11 text-white shadow-[0_0_0_100vmax_var(--color-blue)] [clip-path:inset(0_-100vmax)]"
    >
      <div className="mx-auto grid max-w-[1120px] grid-cols-[1fr_1.15fr] items-start gap-x-10 gap-y-6 px-[22px] max-[820px]:grid-cols-1">
        <div className="min-w-0">
          <h2
            id="home-contact-heading"
            className="mb-[14px] text-[clamp(30px,3.6vw,46px)] font-extrabold leading-[1.05]"
            style={{
              fontFamily: isEnglish
                ? "var(--font-display)"
                : "var(--font-korean)",
            }}
          >
            {isEnglish
              ? "Questions about a prescription? Stop by or write."
              : "처방전이 궁금하세요? 방문하거나 문의하세요."}
          </h2>

          <address className="mb-[10px] not-italic text-[19px] font-semibold">
            {siteData.address.street}
            <br />
            {siteData.address.city}, {siteData.address.state}{" "}
            {siteData.address.postalCode}
          </address>

          <p className="mb-[10px]">
            <a className="underline underline-offset-2" href={siteData.phone.href}>
              {siteData.phone.display}
            </a>
            <br />
            {isEnglish ? "Fax" : "팩스"} {siteData.fax.display}
            <br />
            <a
              className="underline underline-offset-2"
              href={`mailto:${siteData.email}`}
            >
              {siteData.email}
            </a>
          </p>

          <dl className="mt-[14px] border-t border-white/25">
            {siteData.hours.map((hours) => (
              <div
                key={hours.label.en}
                className="flex justify-between gap-3 border-b border-white/25 py-[9px]"
              >
                <dt>{hours.label[language]}</dt>
                <dd className="m-0 text-right">
                  {hours.opensAt && hours.closesAt
                    ? `${formatHours(hours.opensAt, language)}–${formatHours(hours.closesAt, language)}`
                    : isEnglish
                      ? "Closed"
                      : "휴무"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 rounded-[6px] bg-[var(--color-paper)] p-[22px] text-[var(--color-navy)]">
          <div className="grid gap-[14px]">
            <div>
              <h3
                className="mb-1 text-[30px] font-extrabold leading-tight"
                style={{
                  fontFamily: isEnglish
                    ? "var(--font-display)"
                    : "var(--font-korean)",
                }}
              >
                {isEnglish ? "Send us a message" : "메시지 보내기"}
              </h3>
              <p className="text-[13px] text-[#0A1230]/70">
                {isEnglish
                  ? "* Required. Please include a phone number or email so we can reply."
                  : "* 필수 항목입니다. 답변받으실 전화번호 또는 이메일을 남겨 주세요."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-[14px] max-[820px]:grid-cols-1">
              <label className="grid gap-1 text-[13px] font-bold">
                {isEnglish ? "Name *" : "이름 *"}
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="min-h-12 w-full rounded-[8px] border-2 border-[var(--color-navy)] bg-white px-3 py-[10px] text-base font-normal text-[#0b1220] focus:border-[var(--color-blue)] focus:outline-none focus:ring-[3px] focus:ring-[var(--color-blue)]/20"
                />
              </label>
              <label className="grid gap-1 text-[13px] font-bold">
                {isEnglish ? "Phone" : "전화번호"}
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="min-h-12 w-full rounded-[8px] border-2 border-[var(--color-navy)] bg-white px-3 py-[10px] text-base font-normal text-[#0b1220] focus:border-[var(--color-blue)] focus:outline-none focus:ring-[3px] focus:ring-[var(--color-blue)]/20"
                />
              </label>
            </div>

            <label className="grid gap-1 text-[13px] font-bold">
              {isEnglish ? "Email" : "이메일"}
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="min-h-12 w-full rounded-[8px] border-2 border-[var(--color-navy)] bg-white px-3 py-[10px] text-base font-normal text-[#0b1220] focus:border-[var(--color-blue)] focus:outline-none focus:ring-[3px] focus:ring-[var(--color-blue)]/20"
              />
            </label>

            <label className="grid gap-1 text-[13px] font-bold">
              {isEnglish ? "How can we help? *" : "무엇을 도와드릴까요? *"}
              <textarea
                name="message"
                rows={4}
                className="min-h-[110px] w-full resize-y rounded-[8px] border-2 border-[var(--color-navy)] bg-white px-3 py-[10px] text-base font-normal text-[#0b1220] focus:border-[var(--color-blue)] focus:outline-none focus:ring-[3px] focus:ring-[var(--color-blue)]/20"
              />
            </label>

            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-[var(--color-red)] px-5 py-[11px] text-[15px] font-bold text-white"
            >
              {isEnglish ? "Send message" : "보내기"}
            </button>
          </div>
        </div>

        <div className="col-span-2 min-w-0 max-[820px]:col-span-1">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold">
              {isEnglish ? "Find us" : "오시는 길"}
            </h3>
            <a
              href={siteData.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold underline underline-offset-2"
            >
              {isEnglish ? "Open in Google Maps" : "Google 지도에서 열기"}
            </a>
          </div>
          <div className="h-[380px] min-h-[300px] overflow-hidden rounded-[12px] bg-[var(--color-paper)] max-[820px]:h-[340px]">
            <iframe
              title={
                isEnglish
                  ? "Google Maps showing Fort Lee Pharmacy at 1562 Lemoine Avenue"
                  : "1562 Lemoine Avenue 포트리 약국 위치 Google 지도"
              }
              src={mapEmbedUrl.toString()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
