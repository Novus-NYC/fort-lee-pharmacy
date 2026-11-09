"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Language = "en" | "ko"

type LanguageContextValue = {
  language: Language
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "ko"
    document.body.classList.toggle("ko", language === "ko")
  }, [language])

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "ko" : "en",
    )
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}
