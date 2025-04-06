"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Shield, ArrowLeft, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { ThemeToggle } from "@/src/components/theme-toggle"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetComplete, setResetComplete] = useState(false)
  const router = useRouter()

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setResetSent(true)
      setShowOtpVerification(true)

      // Simulate email notification for password reset
      console.log(`Email notification: Password reset code sent to ${email}`)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    setShowOtpVerification(false)
    setShowNewPassword(true)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setResetComplete(true)

      // Simulate email notification for successful password reset
      console.log(`Email notification: Password reset successful for ${email}`)

      // Redirect after successful reset
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }, 1500)
  }

  const handleResendCode = () => {
    // Simulate resending code
    setResetSent(true)

    // Simulate email notification for resending reset code
    console.log(`Email notification: Password reset code resent to ${email}`)

    setTimeout(() => {
      setResetSent(false)
    }, 5000)
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
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>
            </Link>
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
          {!showOtpVerification && !showNewPassword && !resetComplete ? (
            <>
              <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a code to reset your password
                </p>
              </div>
              <form onSubmit={handleSendResetLink} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset code"}
                </Button>
              </form>
            </>
          ) : showOtpVerification ? (
            <>
              <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-2xl font-bold">Verify your email</h1>
                <p className="text-sm text-muted-foreground">We've sent a verification code to {email}</p>
              </div>

              {resetSent && (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Reset code sent successfully!
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      className="w-10 h-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  ))}
                </div>
                <Button onClick={handleVerifyOtp} className="w-full">
                  Verify
                </Button>
                <p className="text-sm text-muted-foreground">
                  Didn't receive a code?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={handleResendCode}>
                    Resend code
                  </Button>
                </p>
              </div>
            </>
          ) : showNewPassword ? (
            <>
              <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-2xl font-bold">Set new password</h1>
                <p className="text-sm text-muted-foreground">Create a new password for your account</p>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset password"}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold">Password reset successful</h1>
              <p className="text-sm text-muted-foreground">
                Your password has been reset successfully. You will be redirected to the login page.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

