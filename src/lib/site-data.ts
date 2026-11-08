export type BilingualText = {
  en: string
  ko: string
}

export type BusinessHour = {
  days: BilingualText
  hours: BilingualText
}

export type Service = {
  name: BilingualText
  description: BilingualText
  badge?: BilingualText
}

export type NavigationItem = {
  label: BilingualText
  href: string
}

export type SiteData = {
  name: BilingualText
  description: BilingualText
  phone: string
  secondaryPhone: string
  email: string
  address: BilingualText
  hours: BusinessHour[]
  services: Service[]
  navigation: NavigationItem[]
  languages: BilingualText
  paymentMethods: BilingualText
  mapUrl: string
  storefrontImage: string
  novusUrl: string
}

export const siteData: SiteData = {
  name: {
    en: "Fort Lee Pharmacy & Surgicals",
    ko: "포트리 약국",
  },
  description: {
    en: "A neighborhood pharmacy on Lemoine Avenue in Fort Lee, New Jersey.",
    ko: "뉴저지 포트리 르무안 애비뉴에 있는 동네 약국입니다.",
  },
  phone: "201-346-9202",
  secondaryPhone: "201-346-9212",
  email: "fortleepharmacy@gmail.com",
  address: {
    en: "1562 Lemoine Avenue, Fort Lee, NJ 07024",
    ko: "1562 Lemoine Avenue, Fort Lee, NJ 07024",
  },
  hours: [
    {
      days: {
        en: "Monday–Friday",
        ko: "월요일–금요일",
      },
      hours: {
        en: "9:00 AM–6:00 PM",
        ko: "오전 9시–오후 6시",
      },
    },
    {
      days: {
        en: "Saturday",
        ko: "토요일",
      },
      hours: {
        en: "9:00 AM–4:00 PM",
        ko: "오전 9시–오후 4시",
      },
    },
    {
      days: {
        en: "Sunday",
        ko: "일요일",
      },
      hours: {
        en: "Closed",
        ko: "휴무",
      },
    },
  ],
  services: [
    {
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
      href: "/services",
    },
    {
      label: {
        en: "About",
        ko: "소개",
      },
      href: "/about",
    },
    {
      label: {
        en: "Contact",
        ko: "문의",
      },
      href: "/contact",
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
}
