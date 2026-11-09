import type { BilingualText, BusinessHour, Weekday } from "@/lib/site-data"

export type StoreHoursStatus = {
  isOpen: boolean
  todayScheduleLabel: BilingualText | null
  closingTime: string
  nextOpeningDay: "today" | "tomorrow" | Weekday | null
  nextOpeningTime: string
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

const pharmacyTimeZone = "America/New_York"

function toMinutes(time: string) {
  const match = time.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
  if (!match) return null

  return Number(match[1]) * 60 + Number(match[2])
}

function formatTime(time: string) {
  const [hourText, minute] = time.split(":")
  const hour = Number(hourText)

  return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`
}

function getScheduleForDay(hours: BusinessHour[], day: Weekday) {
  return hours.find((schedule) => schedule.days.includes(day))
}

export function getStoreHoursStatus(
  hours: BusinessHour[],
  date: Date = new Date(),
): StoreHoursStatus {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: pharmacyTimeZone,
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const weekday = dateParts.find((part) => part.type === "weekday")?.value ?? ""
  const todayIndex = weekdays.indexOf(weekday) as Weekday
  const hour = Number(dateParts.find((part) => part.type === "hour")?.value)
  const minute = Number(dateParts.find((part) => part.type === "minute")?.value)
  const currentMinutes = (hour === 24 ? 0 : hour) * 60 + minute
  const todaySchedule = getScheduleForDay(hours, todayIndex)
  const todayScheduleLabel = todaySchedule?.label ?? null
  const todayOpensAt = todaySchedule?.opensAt
    ? toMinutes(todaySchedule.opensAt)
    : null
  const todayClosesAt = todaySchedule?.closesAt
    ? toMinutes(todaySchedule.closesAt)
    : null

  if (
    todayOpensAt !== null &&
    todayClosesAt !== null &&
    currentMinutes >= todayOpensAt &&
    currentMinutes < todayClosesAt
  ) {
    return {
      isOpen: true,
      todayScheduleLabel,
      closingTime: formatTime(todaySchedule?.closesAt ?? ""),
      nextOpeningDay: null,
      nextOpeningTime: "",
    }
  }

  for (let dayOffset = 0; dayOffset < weekdays.length; dayOffset += 1) {
    const targetDay = ((todayIndex + dayOffset) % weekdays.length) as Weekday
    const schedule = getScheduleForDay(hours, targetDay)
    const openingMinutes = schedule?.opensAt
      ? toMinutes(schedule.opensAt)
      : null

    if (!schedule || openingMinutes === null) continue
    if (dayOffset === 0 && currentMinutes >= openingMinutes) continue

    return {
      isOpen: false,
      todayScheduleLabel,
      closingTime: "",
      nextOpeningDay:
        dayOffset === 0
          ? "today"
          : dayOffset === 1
            ? "tomorrow"
            : targetDay,
      nextOpeningTime: formatTime(schedule.opensAt ?? ""),
    }
  }

  return {
    isOpen: false,
    todayScheduleLabel,
    closingTime: "",
    nextOpeningDay: null,
    nextOpeningTime: "",
  }
}
