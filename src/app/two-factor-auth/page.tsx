"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Shield, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Alert, AlertDescription } from "@/src/components/ui/alert"

export default function TwoFactorAuthPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()
  const searchParams = useSearchParams()

  const returnUrl = searchParams.get("returnUrl") || "/dashboard"
  const action = searchParams.get("action") || "login" // login, disable

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleVerify = () => {
    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    setIsVerifying(true)
    setError(null)

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)

      // For demo purposes, accept any code
      if (action === "disable") {
        // If disabling 2FA, redirect to settings with success param
        router.push("/dashboard/settings?2fa=disabled")
      } else {
        // For login, redirect to dashboard or returnUrl
        router.push(returnUrl)
      }
    }, 1500)
  }

  const handleResendCode = () => {
    setCountdown(30)
    // Simulate resending code
    setError(null)
  }

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
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href={action === "disable" ? "/dashboard/settings" : "/login"}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="mx-auto w-full max-w-md p-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-2 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.2,
              }}
              className="rounded-full bg-primary/10 p-3 mb-2"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>

            <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
            <p className="text-sm text-muted-foreground">
              {action === "disable"
                ? "Enter the code from your authenticator app to disable 2FA"
                : "Enter the code from your authenticator app to continue"}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-2">
              {code.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <Input
                    id={`code-${index}`}
                    className="w-10 h-12 text-center text-lg"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoFocus={index === 0}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <Button onClick={handleVerify} className="w-full" disabled={isVerifying || code.join("").length !== 6}>
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-muted-foreground"
            >
              Didn't receive a code?{" "}
              {countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <Button variant="link" className="p-0 h-auto" onClick={handleResendCode}>
                  Resend code
                </Button>
              )}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

