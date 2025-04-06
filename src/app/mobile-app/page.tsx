"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Shield, ArrowLeft, Smartphone, QrCode, Mail, Check } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Input } from "@/src/components/ui/input"
import { useState } from "react"
import { Alert, AlertDescription } from "@/src/components/ui/alert"

export default function MobileAppPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // In a real app, you would send this to your backend
      console.log("Notify when app is available:", email)
    }
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
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Coming Soon
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">ContractSafe Mobile App</h1>
            <p className="text-xl text-muted-foreground">
              Analyze contracts on the go. Scan documents with your phone camera and get instant insights.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p>Scan documents with your phone camera</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p>Get instant analysis and risk assessment</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p>Access your documents anywhere, anytime</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p>Share analysis with your team instantly</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-3">Get notified when we launch</h3>
              {submitted ? (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Thanks! We'll notify you when the app is available.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Notify Me</Button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-primary/60 rounded-[40px] p-4 shadow-xl w-[280px] h-[560px] flex flex-col">
                <div className="bg-black rounded-[32px] flex-1 overflow-hidden relative">
                  {/* App mockup screen */}
                  <div className="absolute inset-0 bg-background flex flex-col">
                    <div className="h-12 bg-primary flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary-foreground" />
                        <span className="text-sm font-bold text-primary-foreground">ContractSafe</span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 flex flex-col gap-4">
                      <motion.div
                        className="bg-muted rounded-lg p-3 flex items-center gap-3"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div className="text-xs">
                          <p className="font-medium">Scan Document</p>
                          <p className="text-muted-foreground">Use your camera</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-muted rounded-lg p-3 flex items-center gap-3"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <QrCode className="h-5 w-5 text-primary" />
                        <div className="text-xs">
                          <p className="font-medium">Recent Documents</p>
                          <p className="text-muted-foreground">View your history</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="mt-auto bg-primary/10 rounded-lg p-4 text-center"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <p className="text-xs font-medium">Coming Soon to</p>
                        <div className="flex justify-center gap-4 mt-2">
                          <div className="h-8 w-8 bg-background rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.33-.92 3.57-.84 1.5.12 2.63.64 3.38 1.64-3.03 1.72-2.39 5.5.69 6.71-.84 1.94-1.99 3.85-2.72 4.68ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.33-1.94 4.23-3.74 4.25Z" />
                            </svg>
                          </div>
                          <div className="h-8 w-8 bg-background rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                              <path d="M3.609 1.814L13.792 12l-10.183 10.186c-2.05-2.048-2.05-5.372-2.05-10.186 0-4.814 0-8.138 2.05-10.186zm10.183 0l10.183 10.186-10.183 10.186L3.61 12 13.792 1.814z" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Phone notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl" />
              </div>

              {/* Phone shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[220px] h-[20px] bg-black/20 rounded-full blur-xl" />

              {/* Animated elements */}
              <motion.div
                className="absolute -right-10 top-20 bg-primary/20 backdrop-blur-sm rounded-lg p-3 border border-primary/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="text-xs font-medium">Document analyzed!</p>
              </motion.div>

              <motion.div
                className="absolute -left-12 bottom-40 bg-green-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <p className="text-xs font-medium">Low risk contract</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 ContractSafe. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm font-medium">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

