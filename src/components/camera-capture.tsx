"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { Camera, Image, RefreshCw, AlertTriangle } from "lucide-react"
import { useMobile } from "@/src/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog"

export default function CameraCapture() {
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const isMobile = useMobile()

  const startCamera = useCallback(async () => {
    try {
      // First check if permission was previously denied
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter((device) => device.kind === "videoinput")

      if (cameras.length === 0) {
        setShowPermissionDialog(true)
        return
      }

      // Try to access the camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setCameraActive(true)
      setPermissionDenied(false)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setPermissionDenied(true)
      setShowPermissionDialog(true)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }, [])

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageDataUrl)

        // Stop camera after capturing
        stopCamera()
      }
    }
  }, [stopCamera])

  const resetCapture = useCallback(() => {
    setCapturedImage(null)
    startCamera()
  }, [startCamera])

  const handleUpload = useCallback(() => {
    if (!capturedImage) return

    setUploading(true)

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          // Redirect to analysis page after upload completes
          router.push("/dashboard/analysis/new")
        }, 500)
      }
    }, 300)
  }, [capturedImage, router])

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        {!cameraActive && !capturedImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Camera className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
          </div>
        )}

        {cameraActive && (
          <motion.video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {capturedImage && (
          <motion.img
            src={capturedImage}
            alt="Captured document"
            className="w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex justify-center gap-2">
        {!cameraActive && !capturedImage && (
          <Button onClick={startCamera} className="gap-2">
            <Camera className="h-4 w-4" />
            Start Camera
          </Button>
        )}

        {cameraActive && (
          <Button onClick={captureImage} className="gap-2">
            <Camera className="h-4 w-4" />
            Capture
          </Button>
        )}

        {capturedImage && !uploading && (
          <>
            <Button variant="outline" onClick={resetCapture} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retake
            </Button>
            <Button onClick={handleUpload} className="gap-2">
              <Image className="h-4 w-4" />
              Use Photo
            </Button>
          </>
        )}
      </div>

      {uploading && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>
      )}

      {/* Camera Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Camera Access Required</DialogTitle>
            <DialogDescription>
              {permissionDenied
                ? "Camera access was denied. Please enable camera access in your browser settings to use this feature."
                : "We need access to your camera to capture documents for analysis."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <AlertTriangle className="h-16 w-16 text-amber-500" />
          </div>
          <DialogFooter>
            {permissionDenied ? (
              <div className="flex flex-col w-full gap-2">
                <p className="text-sm text-muted-foreground mb-2">
                  To enable camera access:
                  <br />
                  1. Click on the camera icon in your address bar
                  <br />
                  2. Select "Allow" for camera access
                  <br />
                  3. Refresh the page
                </p>
                <Button onClick={() => setShowPermissionDialog(false)}>Got it</Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setShowPermissionDialog(false)
                  startCamera()
                }}
              >
                Allow Camera Access
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

