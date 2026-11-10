"use client"

import ContactSection from "@/app/_components/contact-section"
import { useLanguage } from "@/lib/language-context"

const quickAnswers = [
  {
    question: {
      en: "Do I need an appointment for a vaccine?",
      ko: "예방접종은 예약이 필요한가요?",
    },
    answer: {
      en: "No. Walk-ins are welcome. Call if you want to check that a specific vaccine is in stock.",
      ko: "아니요. 예약 없이 방문하셔도 됩니다. 특정 백신 재고는 전화로 확인하세요.",
    },
  },
  {
    question: {
      en: "Do you deliver?",
      ko: "배달도 하나요?",
    },
    answer: {
      en: "Yes, free delivery is available. Call us to arrange it.",
      ko: "네, 무료 배달이 가능합니다. 전화로 문의해 주세요.",
    },
  },
  {
    question: {
      en: "Do you accept Medicare and Medicaid?",
      ko: "메디케어와 메디케이드를 받나요?",
    },
    answer: {
      en: "Insurance coverage can vary. Please call us to confirm whether your plan is accepted.",
      ko: "보험 적용 여부는 다를 수 있습니다. 이용 가능한 보험은 전화로 확인해 주세요.",
    },
  },
  {
    question: {
      en: "Can I speak Korean with the pharmacist?",
      ko: "약사님과 한국어로 상담할 수 있나요?",
    },
    answer: {
      en: "Yes. We serve customers in Korean and English.",
      ko: "네, 한국어와 영어로 상담해 드립니다.",
    },
  },
]

export default function ContactPageContent() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  return (
    <>
      <header className="pt-11 pb-2">
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="h-[2px] w-7 bg-current" />
            {isEnglish ? "문의" : "Contact"}
          </p>
          <h1
            id="contact-page-heading"
            className="text-[clamp(40px,6.5vw,76px)] font-extrabold leading-[1.05]"
            style={{
              fontFamily: isEnglish
                ? "var(--font-display)"
                : "var(--font-korean)",
            }}
          >
            {isEnglish ? "Visit, call, or write" : "방문, 전화, 문의"}
          </h1>
        </div>
      </header>

      <div className="overflow-x-clip">
        <ContactSection asForm />
      </div>

      <section
        aria-labelledby="contact-faq-heading"
        className="bg-[var(--color-paper)] py-11 text-[var(--color-navy)] shadow-[0_0_0_100vmax_var(--color-paper)] [clip-path:inset(0_-100vmax)]"
      >
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)]/70">
            <span aria-hidden="true" className="h-[2px] w-7 bg-current" />
            {isEnglish ? "자주 묻는 질문" : "FAQ"}
          </p>
          <h2
            id="contact-faq-heading"
            className="mb-5 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.05]"
            style={{
              fontFamily: isEnglish
                ? "var(--font-display)"
                : "var(--font-korean)",
            }}
          >
            {isEnglish ? "Quick answers" : "빠른 답변"}
          </h2>

          <div className="border-t-2 border-[var(--color-navy)]/20">
            {quickAnswers.map((item) => (
              <details
                key={item.question.en}
                className="border-b-2 border-[var(--color-navy)]/20 py-1.5"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                  {item.question[language]}
                </summary>
                <p className="max-w-[60ch] pb-3 text-[16px] leading-relaxed">
                  {item.answer[language]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
