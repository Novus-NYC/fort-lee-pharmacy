"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

type Step = {
  title: {
    en: string
    ko: string
  }
  description: {
    en: string
    ko: string
  }
}

const steps: Step[] = [
  {
    title: {
      en: "Tell us your pharmacy",
      ko: "현재 약국을 알려주세요",
    },
    description: {
      en: "Share your medicines and where you fill them now, by phone or in person, in Korean or English.",
      ko: "복용 중인 약과 현재 약국을 전화나 방문으로 알려주세요. 한국어도 영어도 괜찮습니다.",
    },
  },
  {
    title: {
      en: "We move your prescriptions",
      ko: "처방전 이전은 저희가",
    },
    description: {
      en: "We contact your old pharmacy so you don’t have to.",
      ko: "기존 약국과의 연락은 저희가 합니다.",
    },
  },
  {
    title: {
      en: "Get your medicine",
      ko: "약 받기",
    },
    description: {
      en: "Pick it up in store, or have it delivered.",
      ko: "매장에서 받거나 배달로 받으세요.",
    },
  },
]

function PharmacyLineArt({
  className,
  color = "#1E3FA8",
}: {
  className: string
  color?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 40H108M16 40V20H104V40M12 40Q22 52 32 40Q42 52 52 40Q62 52 72 40Q82 52 92 40Q102 52 108 40M20 46V96M100 46V96M8 96H112M70 96V62H92V96M30 62H56V82H30Z" />
        <path d="M60 24v12M54 30h12" stroke="#9B3B35" />
      </g>
    </svg>
  )
}

export default function InfoBanner() {
  const { language } = useLanguage()
  const journeyRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(1)
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    const journey = journeyRef.current
    if (!journey) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )
    let animationFrame: number | null = null
    let scrollStopTimer: number | undefined

    const updateProgress = () => {
      const progress = reducedMotion.matches
        ? 1
        : Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight * 0.78 -
                journey.getBoundingClientRect().top) /
                (window.innerHeight * 0.5),
            ),
          )

      journey.style.setProperty(
        "--journey-progress",
        `${(progress * 100).toFixed(1)}%`,
      )

      const nextStage = progress >= 0.97 ? 3 : progress >= 0.5 ? 2 : 1
      setActiveStage((currentStage) =>
        currentStage === nextStage ? currentStage : nextStage,
      )
    }

    const scheduleProgressUpdate = () => {
      if (reducedMotion.matches) {
        updateProgress()
        return
      }

      setIsMoving(true)
      window.clearTimeout(scrollStopTimer)
      scrollStopTimer = window.setTimeout(() => setIsMoving(false), 150)

      if (animationFrame !== null) return
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null
        updateProgress()
      })
    }

    const handleMotionPreferenceChange = () => {
      setIsMoving(false)
      updateProgress()
    }

    updateProgress()
    window.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    })
    window.addEventListener("resize", scheduleProgressUpdate)
    reducedMotion.addEventListener("change", handleMotionPreferenceChange)

    return () => {
      window.removeEventListener("scroll", scheduleProgressUpdate)
      window.removeEventListener("resize", scheduleProgressUpdate)
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange)
      window.clearTimeout(scrollStopTimer)
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <section
      aria-labelledby="info-banner-heading"
      className="-mx-6 border-t-[3px] border-[#1E3FA8] bg-[#F3EFE6] px-6 py-11 text-[#0A1230] shadow-[0_0_0_100vmax_#F3EFE6] [clip-path:inset(0_-100vmax)]"
    >
      <div className="mx-auto max-w-[1120px] px-[22px]">
        <p className="mb-2 flex items-center gap-3 text-sm font-semibold text-[#0A1230]/75">
          <span aria-hidden="true" className="h-[3px] w-9 bg-[#0A1230]" />
          {language === "en" ? "처음 오셨나요?" : "New to us?"}
        </p>
        <h2
          id="info-banner-heading"
          className="mb-5 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.05]"
          style={{
            fontFamily:
              language === "en"
                ? "var(--font-display)"
                : "var(--font-korean)",
          }}
        >
          {language === "en"
            ? "Switching pharmacies is easy"
            : "약국 옮기기, 어렵지 않아요"}
        </h2>

        <div
          ref={journeyRef}
          data-info-journey=""
          data-moving={isMoving}
          role="group"
          aria-label={
            language === "en"
              ? "Three steps to transfer your prescriptions"
              : "처방전을 이전하는 세 단계"
          }
          className="[--journey-progress:0%]"
        >
          <div
            aria-hidden="true"
            className="relative my-[34px] h-[110px] max-[820px]:h-24"
          >
            <div className="absolute bottom-4 left-[calc((100%-48px)/6)] right-[calc((100%-48px)/6)] h-0 max-[820px]:left-11 max-[820px]:right-11">
              <span className="absolute inset-x-0 top-[-1.5px] border-t-[3px] border-dashed border-[#0A1230]/30" />
              <span className="absolute left-0 top-[-1.5px] h-[3px] w-[var(--journey-progress)] rounded-full bg-[#1E3FA8]" />
              <PharmacyLineArt className="absolute bottom-[-2px] left-0 h-[74px] w-[88px] -translate-x-1/2 max-[820px]:h-[54px] max-[820px]:w-16" />
              <span
                className={`absolute left-1/2 top-[-10px] h-5 w-5 -translate-x-1/2 rounded-full border-[3px] transition-colors duration-500 ${
                  activeStage >= 2
                    ? "border-[#9B3B35] bg-[#9B3B35]"
                    : "border-[#1E3FA8] bg-[#F3EFE6]"
                }`}
              />
              <PharmacyLineArt
                className={`absolute bottom-[-2px] left-full h-[74px] w-[88px] -translate-x-1/2 transition-opacity duration-500 max-[820px]:h-[54px] max-[820px]:w-16 ${
                  activeStage === 3 ? "opacity-100" : "opacity-45"
                }`}
                color={activeStage === 3 ? "#9B3B35" : "#1E3FA8"}
              />
              <span
                className="absolute bottom-[-2px] left-[var(--journey-progress)] z-10 h-[72px] w-14 -translate-x-1/2"
                style={{ transition: "none" }}
              >
                <svg
                  viewBox="0 0 56 72"
                  className="h-full w-full overflow-visible"
                  aria-hidden="true"
                >
                  <g
                    fill="none"
                    stroke="#1E3FA8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="28" cy="11" r="7" fill="#F3EFE6" />
                    <path d="M28 18Q30 30 28 42M28 24L17 36M28 24L39 33" />
                    <path
                      className="info-journey__leg"
                      d="M28 42L22 66"
                    />
                    <path
                      className="info-journey__leg info-journey__leg--reverse"
                      d="M28 42L34 66"
                    />
                    <g strokeWidth="2.6" fill="#F3EFE6">
                      <rect x="37" y="33" width="14" height="17" rx="2" />
                      <path
                        d="M44 38v7M40.5 41.5h7"
                        stroke="#9B3B35"
                      />
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <ol className="mt-5 grid list-none grid-cols-3 gap-6 p-0 max-[820px]:grid-cols-1">
            {steps.map((step, index) => {
              const stage = index + 1
              const isActive = stage <= activeStage

              return (
                <li
                  key={step.title.en}
                  className={`border-t-2 pt-3 transition-[opacity,border-color] duration-500 motion-reduce:opacity-100 motion-reduce:transition-none ${
                    isActive
                      ? "border-[#9B3B35] opacity-100"
                      : "border-[#0A1230]/15 opacity-[.35]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="mb-2 inline-grid h-[30px] w-[30px] place-items-center rounded-full bg-[#9B3B35] text-base font-extrabold text-white"
                  >
                    {stage}
                  </span>
                  <h3
                    className="mb-1.5 text-2xl font-extrabold"
                    style={{
                      fontFamily:
                        language === "en"
                          ? "var(--font-display)"
                          : "var(--font-korean)",
                    }}
                  >
                    {step.title[language]}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {step.description[language]}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <style jsx global>{`
        @keyframes info-journey-walk {
          from {
            transform: rotate(-26deg);
          }
          to {
            transform: rotate(26deg);
          }
        }

        [data-info-journey][data-moving="true"] .info-journey__leg {
          transform-origin: 28px 42px;
          animation: info-journey-walk 0.5s ease-in-out infinite alternate;
        }

        [data-info-journey][data-moving="true"]
          .info-journey__leg--reverse {
          animation-direction: alternate-reverse;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-info-journey] li {
            border-top-color: #9b3b35 !important;
            opacity: 1 !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}
