"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Separator } from "@/src/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Shield, ArrowLeft, QrCode, Copy, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Alert, AlertDescription } from "@/src/components/ui/alert"

export default function SettingsPage() {
  const [name, setName] = useState("John Smith")
  const [email, setEmail] = useState("john@example.com")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showQrCode, setShowQrCode] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [twoFactorVerified, setTwoFactorVerified] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if 2FA was just disabled
  useEffect(() => {
    if (searchParams.get("2fa") === "disabled") {
      setTwoFactorEnabled(false)
      setSuccessMessage("Two-factor authentication has been disabled successfully")
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }
  }, [searchParams])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Profile updated successfully")
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Notification preferences updated successfully")
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Password updated successfully")
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleToggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowQrCode(true)
    } else {
      // If 2FA is enabled, redirect to verification page to disable it
      router.push("/two-factor-auth?action=disable&returnUrl=/dashboard/settings")
    }
  }

  const handleVerifyTwoFactor = () => {
    // Simulate verification
    setTwoFactorVerified(true)
    setTwoFactorEnabled(true)

    setTimeout(() => {
      setShowQrCode(false)
      setSuccessMessage("Two-factor authentication enabled successfully")
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 2000)
  }

  const copyBackupCode = () => {
    navigator.clipboard.writeText("ABCD-EFGH-IJKL-MNOP")
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            ContractSafe
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/documents" className="text-sm font-medium">
              Documents
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium text-primary">
              Settings
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                  <AlertDescription className="text-green-800 dark:text-green-300">{successMessage}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" placeholder="Your company name" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveNotifications}>
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="risk-alerts">Risk Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified about high-risk contract clauses</p>
                        </div>
                        <Switch id="risk-alerts" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="document-notifications">Document Analysis Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when document analysis is complete
                          </p>
                        </div>
                        <Switch id="document-notifications" defaultChecked />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          "Save preferences"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSecurity}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          id="two-factor"
                          checked={twoFactorEnabled}
                          onCheckedChange={() => handleToggleTwoFactor()}
                        />
                      </div>

                      <AnimatePresence>
                        {showQrCode && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 border rounded-md overflow-hidden"
                          >
                            <h3 className="font-semibold mb-4">Set up Two-Factor Authentication</h3>
                            <div className="flex flex-col items-center space-y-4">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15,
                                  delay: 0.2,
                                }}
                                className="bg-white p-4 rounded-md relative"
                              >
                                <QrCode className="h-32 w-32" />
                                <motion.div
                                  className="absolute inset-0 flex items-center justify-center"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5, duration: 0.3 }}
                                >
                                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                    <div className="text-center">
                                      <p className="font-medium text-sm">Scan with your</p>
                                      <p className="font-medium text-sm">authenticator app</p>
                                    </div>
                                  </div>
                                </motion.div>
                              </motion.div>
                              <p className="text-sm text-center text-muted-foreground">
                                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                              </p>

                              <div className="w-full">
                                <Label htmlFor="verification-code" className="mb-2 block">
                                  Enter verification code
                                </Label>
                                <div className="flex gap-2">
                                  <Input
                                    id="verification-code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="000000"
                                    className="flex-1"
                                  />
                                  <Button onClick={handleVerifyTwoFactor} disabled={!verificationCode}>
                                    Verify
                                  </Button>
                                </div>
                              </div>

                              <AnimatePresence>
                                {twoFactorVerified && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                  >
                                    <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                                      <AlertDescription className="text-green-800 dark:text-green-300">
                                        Two-factor authentication enabled successfully!
                                      </AlertDescription>
                                    </Alert>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="w-full p-4 border rounded-md"
                              >
                                <Label className="mb-2 block">Backup codes</Label>
                                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                                  <code className="text-sm">ABCD-EFGH-IJKL-MNOP</code>
                                  <Button variant="ghost" size="sm" onClick={copyBackupCode}>
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Save these backup codes in a secure place. You can use them to sign in if you lose
                                  access to your authenticator app.
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {twoFactorEnabled && !showQrCode && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4 border rounded-md bg-muted/30"
                        >
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <p className="text-sm font-medium">Two-factor authentication is enabled</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 ml-7">
                            To disable two-factor authentication, you will need to verify your identity with a code from
                            your authenticator app.
                          </p>
                        </motion.div>
                      )}
                    </div>
                    <div className="mt-6">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </span>
                        ) : (
                          "Update password"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

