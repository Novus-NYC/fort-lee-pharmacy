"use client"

import { useEffect, useState } from "react"
import { getStoreHoursStatus, type StoreHoursStatus } from "@/lib/store-hours"
import { siteData } from "@/lib/site-data"

export function useStoreHoursStatus() {
  const [status, setStatus] = useState<StoreHoursStatus | null>(null)

  useEffect(() => {
    const updateStatus = () => {
      setStatus(getStoreHoursStatus(siteData.hours, new Date()))
    }

    updateStatus()
    const intervalId = window.setInterval(updateStatus, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  return status
}
