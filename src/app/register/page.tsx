"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { ThemeToggle } from "@/src/components/theme-toggle"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpVerified, setOtpVerified] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowOtp(true)
      setEmailSent(true)

      // Simulate email notification for account verification
      console.log(`Email notification: Account verification OTP sent to ${email}`)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    setOtpVerified(true)

    // Simulate redirect after successful verification
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  const handleResendCode = () => {
    setEmailSent(true)

    // Simulate email notification for resending OTP
    console.log(`Email notification: Account verification OTP resent to ${email}`)

    setTimeout(() => {
      setEmailSent(false)
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
            <Link href="/login" className="text-sm font-medium">
              Sign in
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
          {!showOtp ? (
            <>
              <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
              </div>
              <div className="grid gap-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
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
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mt-2">
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create account"}
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" type="button">
                    Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Sign in
                </Link>
              </div>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms & Conditions
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-2xl font-bold">Verify your email</h1>
                <p className="text-sm text-muted-foreground">We've sent a verification code to {email}</p>
              </div>

              {emailSent && (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Verification code sent successfully!
                  </AlertDescription>
                </Alert>
              )}

              {otpVerified ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold">Account verified!</h2>
                  <p className="text-sm text-muted-foreground">Redirecting you to login...</p>
                </div>
              ) : (
                <>
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

                  <div className="mt-4 text-center">
                    <Button variant="ghost" onClick={() => setShowOtp(false)}>
                      Back to registration
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

