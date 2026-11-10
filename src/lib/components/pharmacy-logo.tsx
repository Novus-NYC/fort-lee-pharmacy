type PharmacyLogoProps = {
  size?: number
}

export default function PharmacyLogo({ size = 48 }: PharmacyLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#FFFFFF" />
      <path
        d="M10 35 18 19Q24 31 30 19L38 35M18 19v16M30 19v16M9 37h30"
        fill="none"
        stroke="#1E3FA8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 6v10M19 11h10"
        stroke="#FF4D6D"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
