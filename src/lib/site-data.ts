export type BilingualText = {
  en: string
  ko: string
}

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type BusinessHour = {
  days: readonly Weekday[]
  label: BilingualText
  opensAt: string | null
  closesAt: string | null
}

export type Service = {
  id: string
  name: BilingualText
  description: BilingualText
  badge?: BilingualText
}

export type NavigationItem = {
  label: BilingualText
  href: string
}

export type ContactNumber = {
  display: string
  href: string
}

export type Address = {
  street: string
  city: string
  state: string
  postalCode: string
}

export type SiteData = {
  name: BilingualText
  description: BilingualText
  footerDescription: BilingualText
  phone: ContactNumber
  fax: ContactNumber
  email: string
  address: Address
  hours: BusinessHour[]
  services: Service[]
  navigation: NavigationItem[]
  languages: BilingualText
  paymentMethods: BilingualText
  mapUrl: string
  storefrontImage: string
  novusUrl: string
}

export const siteData = {
  name: {
    en: "Fort Lee Pharmacy & Surgicals",
    ko: "포트리 약국",
  },
  description: {
    en: "A neighborhood pharmacy on Lemoine Avenue in Fort Lee, New Jersey.",
    ko: "뉴저지 포트리 르무안 애비뉴에 있는 동네 약국입니다.",
  },
  footerDescription: {
    en: "Your neighborhood pharmacy in Fort Lee, in Korean and English.",
    ko: "포트리 이웃을 위한 약국. 한국어와 영어로 모십니다.",
  },
  phone: {
    display: "201-346-9202",
    href: "tel:2013469202",
  },
  fax: {
    display: "201-346-9212",
    href: "fax:2013469212",
  },
  email: "fortleepharmacy@gmail.com",
  address: {
    street: "1562 Lemoine Avenue",
    city: "Fort Lee",
    state: "NJ",
    postalCode: "07024",
  },
  hours: [
    {
      days: [1, 2, 3, 4, 5],
      label: {
        en: "Mon–Fri",
        ko: "월요일–금요일",
      },
      opensAt: "09:00",
      closesAt: "18:00",
    },
    {
      days: [6],
      label: {
        en: "Saturday",
        ko: "토요일",
      },
      opensAt: "09:00",
      closesAt: "16:00",
    },
    {
      days: [0],
      label: {
        en: "Sunday",
        ko: "일요일",
      },
      opensAt: null,
      closesAt: null,
    },
  ],
  services: [
    {
      id: "vaccines",
      name: {
        en: "Vaccines",
        ko: "예방접종",
      },
      description: {
        en: "COVID-19 (Pfizer and Moderna), flu, shingles, pneumococcal, and Tdap. No appointment needed.",
        ko: "코로나19(화이자·모더나), 독감, 대상포진, 폐렴구균, Tdap 접종. 예약 없이 방문하세요.",
      },
      badge: {
        en: "Walk-ins welcome",
        ko: "예약 불필요",
      },
    },
    {
      id: "prescriptions",
      name: {
        en: "Prescriptions",
        ko: "처방전",
      },
      description: {
        en: "Transfer, fill, and refill. Call us with questions.",
        ko: "처방전 이전, 조제, 리필. 궁금한 점은 전화로 문의하세요.",
      },
    },
    {
      id: "free-delivery",
      name: {
        en: "Free delivery",
        ko: "무료 배달",
      },
      description: {
        en: "Can’t make it in? Ask us about delivery to your door.",
        ko: "오시기 어려우신가요? 집까지 배달해 드립니다.",
      },
    },
    {
      id: "over-the-counter",
      name: {
        en: "Over-the-counter",
        ko: "일반의약품",
      },
      description: {
        en: "Medicines, vitamins, and Korean health supplements.",
        ko: "일반의약품, 비타민, 한국 건강기능식품.",
      },
    },
    {
      id: "medical-supplies",
      name: {
        en: "Medical supplies",
        ko: "의료용품",
      },
      description: {
        en: "Wheelchairs, walkers, canes, crutches and more.",
        ko: "휠체어, 보행기, 지팡이, 목발 등.",
      },
    },
    {
      id: "household-and-personal-care",
      name: {
        en: "Household & personal care",
        ko: "생활용품",
      },
      description: {
        en: "Everyday essentials close to home.",
        ko: "집 가까이에서 만나는 생활필수품.",
      },
    },
  ],
  navigation: [
    {
      label: {
        en: "Home",
        ko: "홈",
      },
      href: "/",
    },
    {
      label: {
        en: "Services",
        ko: "서비스",
      },
      href: "/pages/services",
    },
    {
      label: {
        en: "About",
        ko: "소개",
      },
      href: "/pages/about",
    },
    {
      label: {
        en: "Contact",
        ko: "문의",
      },
      href: "/pages/contact",
    },
  ],
  languages: {
    en: "Korean and English",
    ko: "한국어 및 영어",
  },
  paymentMethods: {
    en: "Visa and Mastercard",
    ko: "Visa 및 Mastercard",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=1562+Lemoine+Avenue+Fort+Lee+NJ+07024",
  storefrontImage: "/storefront.webp",
  novusUrl: "https://novusnyc.org",
} satisfies SiteData