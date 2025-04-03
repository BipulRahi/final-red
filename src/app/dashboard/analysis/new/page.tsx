"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"

export default function AnalyzingPage() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState("Extracting text")
  const router = useRouter()

  useEffect(() => {
    // Simulate analysis progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Redirect to a dummy analysis page when complete
          setTimeout(() => {
            router.push("/dashboard/analysis/new-doc")
          }, 500)
          return 100
        }

        // Update the stage based on progress
        if (prev === 25) setStage("Identifying parties")
        if (prev === 50) setStage("Analyzing clauses")
        if (prev === 75) setStage("Generating summary")

        return prev + 1
      })
    }, 50)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Analyzing Document</h1>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <FileText className="h-16 w-16 text-primary" />
          </motion.div>

          <h2 className="mt-6 text-xl font-semibold">Analyzing your document</h2>
          <p className="text-muted-foreground mt-2">{stage}...</p>

          <div className="w-full max-w-md mt-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{stage}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mt-8 text-center max-w-md">
            <p className="text-sm text-muted-foreground">
              Our AI is analyzing your document to extract key information, identify parties, analyze clauses, and
              generate a comprehensive summary.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

