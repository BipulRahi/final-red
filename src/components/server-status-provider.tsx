"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { checkServerStatus, type ServerStatus } from "@/src/lib/server-status"

type ServerStatusContextType = {
  status: ServerStatus
  isLoading: boolean
  checkStatus: () => Promise<ServerStatus>
}

const ServerStatusContext = createContext<ServerStatusContextType | undefined>(undefined)

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus>("offline")
  const [isLoading, setIsLoading] = useState(true)

  const checkStatusAndUpdate = async () => {
    setIsLoading(true)
    try {
      const currentStatus = await checkServerStatus()
      setStatus(currentStatus)
      return currentStatus
    } catch (error) {
      console.error("Error checking server status:", error)
      return "offline" as ServerStatus
    } finally {
      setIsLoading(false)
    }
  }

  // Check status on mount
  useEffect(() => {
    checkStatusAndUpdate()

    // Set up periodic checking
    const interval = setInterval(() => {
      checkStatusAndUpdate()
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <ServerStatusContext.Provider value={{ status, isLoading, checkStatus: checkStatusAndUpdate }}>
      {children}
    </ServerStatusContext.Provider>
  )
}

export function useServerStatus() {
  const context = useContext(ServerStatusContext)
  if (context === undefined) {
    throw new Error("useServerStatus must be used within a ServerStatusProvider")
  }
  return context
}

