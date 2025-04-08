
"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Shield, Camera, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Skeleton } from "@/src/components/ui/skeleton"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFacialLogin, setShowFacialLogin] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [show2FA, setShow2FA] = useState(false)
  const [totpCode, setTotpCode] = useState(["", "", "", "", "", ""])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  // const [ser,setser]=useState(false)
  const router = useRouter()

  
// async function check() {
//   try {
//     const response = await fetch('/api/colabData?action=health');
//     console.log(response)
//     if (!response.ok) {
//       setser(false)
//       router.replace("/server-offline")
//       throw new Error('Failed to check Colab status');
//     }
//     else if(response.ok){
//       setser(true)
//     }
    
//   } catch (err) {
//     setser(false)
//     console.log("error occur while chekcing health");
//   }
// }





  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraActive(false)
    setCameraLoading(false)
  }, [])

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    // Simulate API call for Google login
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, check if admin is in the email
      if (email.includes("admin") || email === "") {
        // Redirect to admin dashboard
        router.push("/admin")
      } else {
        // Redirect to user dashboard - no 2FA needed for Google login
        router.push("/dashboard")
      }
    }, 1500)
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call for password login
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, check if 2FA is active (we'll assume it's active for this demo)
      const is2FAActive = true

      if (is2FAActive) {
        // Show 2FA verification
        setShow2FA(true)
      } else {
        // Redirect to dashboard if 2FA is not active
        router.push("/dashboard")
      }
    }, 1500)
  }

  const handleTotpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newCode = [...totpCode]
    newCode[index] = value
    setTotpCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`totp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const verifyTotp = () => {
    setIsLoading(true)

    // Simulate API call to verify TOTP
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, we'll consider any complete code as valid
      if (totpCode.every((digit) => digit !== "")) {
        router.push("/dashboard")
      } else {
        alert("Please enter a complete verification code")
      }
    }, 1500)
  }

  const startFacialLogin = () => {
    setShowFacialLogin(true)
  }

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to verify if email is in admin list
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, check if admin is in the email
      if (email.includes("admin")) {
        startCamera()
      } else {
        alert("Email not found in admin list")
      }
    }, 1000)
  }

  const startCamera = useCallback(async () => {
    setCameraLoading(true)
    setCameraError(null)

    try {
      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Request camera with specific constraints for better performance
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                setCameraActive(true)
                setCameraLoading(false)
              })
              .catch((err) => {
                console.error("Error playing video:", err)
                setCameraError("Failed to start video stream")
                setCameraLoading(false)
              })
          }
        }
      }

      setPermissionDenied(false)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraLoading(false)

      if ((err as DOMException).name === "NotAllowedError") {
        setPermissionDenied(true)
      } else if ((err as DOMException).name === "NotFoundError") {
        setCameraError("No camera found on your device")
      } else {
        setCameraError("Failed to access camera")
      }
    }
  }, [])

  const resetFacialLogin = useCallback(() => {
    stopCamera()
    setShowFacialLogin(false)
    setVerifying(false)
    setVerificationSuccess(false)
    setCameraError(null)
  }, [stopCamera])

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Add a smooth animation effect before capture
      const captureAnimation = () => {
        // Flash effect
        document.body.style.transition = "background-color 0.1s ease"
        document.body.style.backgroundColor = "rgba(255, 255, 255, 0.1)"

        setTimeout(() => {
          document.body.style.backgroundColor = ""

          // Draw the image
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          // Stop camera after capturing
          stopCamera()

          // Show verification process
          setVerifying(true)

          // Simulate verification
          setTimeout(() => {
            setVerifying(false)
            setVerificationSuccess(true)

            // Redirect after successful verification
            setTimeout(() => {
              router.push("/admin")
            }, 1500)
          }, 2000)
        }, 100)
      }

      captureAnimation()
    }
  }, [stopCamera, router])

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
            <Link href="/register" className="text-sm font-medium">
              Register
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
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>

          <AnimatePresence mode="wait">
            {show2FA ? (
              <motion.div
                key="2fa-verification"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex flex-col items-center space-y-2 text-center">
                  <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the verification code from your authenticator app
                  </p>
                </div>

                <div className="flex justify-center space-x-2 py-4">
                  {totpCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`totp-${index}`}
                      className="w-10 h-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleTotpChange(index, e.target.value)}
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <Button onClick={verifyTotp} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </Button>
                  <Button variant="ghost" onClick={() => setShow2FA(false)} className="w-full">
                    Back to Login
                  </Button>
                </div>
              </motion.div>
            ) : !showFacialLogin ? (
              <motion.div
                key="login-options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <Tabs defaultValue="user">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="user">User</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  </TabsList>

                  <TabsContent value="user" className="mt-4 space-y-4">
                    <form onSubmit={handlePasswordLogin} className="space-y-4">
                      <div className="space-y-2">
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
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/reset-password" className="text-sm underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing in...
                          </span>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      )}
                      <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
                    </Button>
                  </TabsContent>

                  <TabsContent value="admin" className="mt-4 space-y-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      )}
                      <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={startFacialLogin}
                    >
                      <Camera className="h-4 w-4" />
                      <span>Facial Recognition Login</span>
                    </Button>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="facial-login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Facial Recognition</h2>
                  <Button variant="ghost" size="sm" onClick={resetFacialLogin}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {!cameraActive && !verifying && !verificationSuccess ? (
                    <motion.form
                      key="email-form"
                      onSubmit={verifyEmail}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">Enter your admin email to verify your identity</p>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          "Continue"
                        )}
                      </Button>
                    </motion.form>
                  ) : cameraActive || cameraLoading  ? (
                    <motion.div
                      key="camera-view"
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        {cameraLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background/80 backdrop-blur-sm">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Camera className="h-8 w-8 text-primary" />
                            </motion.div>
                            <p className="mt-2 text-sm">Initializing camera...</p>
                          </div>
                        )}

                        {cameraError && !cameraLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background/80 backdrop-blur-sm">
                            <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                              <X className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <p className="mt-2 text-sm text-center px-4">{cameraError}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={() => {
                                setCameraError(null)
                                startCamera()
                              }}
                            >
                              Try Again
                            </Button>
                          </div>
                        )}

                        {/* Camera placeholder when loading */}
                        {cameraLoading && (
                          <div className="absolute inset-0 z-0">
                            <Skeleton className="h-full w-full" />
                          </div>
                        )}

                        <motion.video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: cameraActive ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        />
                        <canvas ref={canvasRef} className="hidden" />
                      </div>

                      <motion.div
                        className="flex justify-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                          scale: cameraActive ? 1 : 0.9,
                          opacity: cameraActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          onClick={captureImage}
                          className="rounded-full h-16 w-16 p-0 flex items-center justify-center"
                          disabled={!cameraActive || cameraLoading}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Camera className="h-6 w-6" />
                        </Button>
                      </motion.div>

                      <p className="text-center text-sm text-muted-foreground">
                        {cameraActive
                          ? "Position your face in the center and click the button"
                          : "Camera is initializing..."}
                      </p>
                    </motion.div>
                  ) : verifying ? (
                    <motion.div
                      key="verifying"
                      className="py-8 flex flex-col items-center justify-center space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      >
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                      </motion.div>
                      <p className="text-center font-medium">Verifying your identity...</p>
                      <p className="text-center text-sm text-muted-foreground">This will only take a moment</p>
                    </motion.div>
                  ) : verificationSuccess ? (
                    <motion.div
                      key="success"
                      className="py-8 flex flex-col items-center justify-center space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-green-600 dark:text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      </motion.div>
                      <p className="text-center font-medium text-lg">Identity Verified!</p>
                      <p className="text-center text-sm text-muted-foreground">Redirecting to admin dashboard...</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {permissionDenied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <AlertDescription className="flex flex-col gap-2">
                        <p>
                          Camera access was denied. Please enable camera access in your browser settings to use facial
                          recognition.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPermissionDenied(false)
                            startCamera()
                          }}
                          className="self-end"
                        >
                          Try Again
                        </Button>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center text-sm"
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
