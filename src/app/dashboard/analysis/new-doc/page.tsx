"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to a dummy analysis page
    router.push("/dashboard/analysis/1")
  }, [router])

  return null
}

