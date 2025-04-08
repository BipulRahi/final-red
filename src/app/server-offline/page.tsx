"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Shield, Server, RefreshCw } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Progress } from "@/src/components/ui/progress"

export default function ServerOfflinePage() {
  const [isChecking, setIsChecking] = useState(false)
  const [checkProgress, setCheckProgress] = useState(0)
  const router = useRouter()
  const [isServerOnline,setisServerOnline]=useState(false)

  // Add a countdown timer for next automatic check
  const [nextCheckCountdown, setNextCheckCountdown] = useState(30)
  async function check() {
    try {
      const response = await fetch('/api/colabData?action=health');
      console.log(response)
      if (response.ok) {
        setisServerOnline(true)

        router.replace("/dashboard")
        console.log('checked Colab status - everything fine');
        return;
      }
      else if(!response.ok){
        setisServerOnline(false)
        console.log("try again  ")
      }
      
    } catch (err) {
      setisServerOnline(false)
      console.log("error occur while chekcing health");
    }
  }



  const checkServerStatus = () => {
    setIsChecking(true)
    setCheckProgress(0)
    
    // Simulate checking server status
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setCheckProgress(progress)

      if (progress >= 100) {
        check()
        clearInterval(interval)
        setIsChecking(false)

        // Reset the countdown timer after manual check
        setNextCheckCountdown(30)
        // For demo purposes, we'll keep showing the offline page
        // In a real app, you would check with your backend API and redirect if the server is online
      }
    }, 200)
    
  }

  // Auto-check server status periodically
  useEffect(() => {
    // Countdown timer for next automatic check
    console.log("useeffect of server-offline")
    const countdownInterval = setInterval(() => {
      setNextCheckCountdown((prev) => {
        if (prev <= 1) {
          // When countdown reaches zero, perform the check
          if (!isChecking) {
            checkServerStatus()
          }
          return 30 // Reset to 30 seconds
        }
        return prev - 1
      })
    }, 1000)

    // Actual server status check interval
    const checkInterval = setInterval(() => {
      
      console.log("Checking server status automatically...")

      // If server is online, redirect to dashboard
      // const isServerOnline = Math.random() > 0.8; // Example random check
      if (isServerOnline) {
        router.replace("/dashboard");
      }
    }, 30000) // Check every 30 seconds

    return () => {
      clearInterval(checkInterval)
      clearInterval(countdownInterval)
    }
  }, [router, isChecking])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            ContractSafe
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12 flex flex-col items-center justify-center">
        <motion.div
          className="max-w-md w-full text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: 0.2,
            }}
            className="mx-auto rounded-full bg-red-100 dark:bg-red-900/30 p-6 w-24 h-24 flex items-center justify-center"
          >
            <Server className="h-12 w-12 text-red-500 dark:text-red-400" />
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold">Server Offline</h1>
            <p className="text-muted-foreground">
              The analysis server is currently offline. Please wait for an administrator to start the server.
            </p>
          </div>

          {isChecking ? (
            <div className="space-y-2">
              <p className="text-sm">Checking server status...</p>
              <Progress value={checkProgress} className="h-2" />
            </div>
          ) : (
            <Button onClick={checkServerStatus} className="mx-auto gap-2">
              <RefreshCw className="h-4 w-4" />
              Check Server Status
            </Button>
          )}

          {/* ADDED: Countdown timer for next automatic check */}
          <div className="mt-4 text-sm text-muted-foreground">
            Next automatic check in: <span className="font-bold">{nextCheckCountdown}</span> seconds
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              If you are an administrator, please{" "}
              <Link href="/login" className="text-primary hover:underline">
                log in
              </Link>{" "}
              to start the server.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

