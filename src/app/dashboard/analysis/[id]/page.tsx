"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Badge } from "@/src/components/ui/badge"
import {
  FileText,
  AlertTriangle,
  Info,
  ArrowLeft,
  Download,
  Share2,
  Building,
  Users,
  Calendar,
  MessageSquare,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Alert, AlertDescription } from "@/src/components/ui/alert"

export default function AnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<any>(null)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareEmail, setShareEmail] = useState("")
  const [shareMessage, setShareMessage] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  useEffect(() => {
    // Simulate API call to get analysis data
    const timer = setTimeout(() => {
      setAnalysis({
        id: params.id,
        title: "Rental Agreement.pdf",
        date: "April 1, 2024",
        extractedText: `This RENTAL AGREEMENT (the "Agreement") is made and entered into as of April 1, 2024, by and between ABC Properties LLC ("Landlord") and John Smith ("Tenant").

1. PREMISES: Landlord hereby leases to Tenant and Tenant hereby leases from Landlord for residential purposes only, the premises located at 123 Main Street, Apt 4B, Anytown, USA ("Premises").

2. TERM: The term of this Agreement shall be for a period of 12 months, commencing on April 15, 2024 and ending on April 14, 2025.

3. RENT: Tenant agrees to pay monthly rent of $1,500.00, due on the 1st day of each month.

4. LATE CHARGES: If rent is not paid by the 5th day of the month, Tenant agrees to pay a late charge of $100.00 plus $10.00 per day for each additional day rent remains unpaid.

5. SECURITY DEPOSIT: Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of $3,000.00 as a security deposit.

6. UTILITIES: Tenant shall be responsible for payment of all utilities and services, except for water and trash which shall be provided by Landlord.

7. MAINTENANCE: Tenant shall maintain the Premises in a clean and sanitary condition and shall not make any alterations to the Premises without Landlord's prior written consent.

8. TERMINATION: Either party may terminate this Agreement upon 60 days written notice. If Tenant terminates before the end of the term, Tenant shall be responsible for rent until the end of the term or until the Premises are re-rented, whichever occurs first.

9. GOVERNING LAW: This Agreement shall be governed by the laws of the State of [State].

10. ENTIRE AGREEMENT: This Agreement constitutes the entire agreement between the parties.`,
        parties: [
          { name: "ABC Properties LLC", role: "Landlord" },
          { name: "John Smith", role: "Tenant" },
        ],
        summary:
          "This is a 12-month residential rental agreement between ABC Properties LLC (Landlord) and John Smith (Tenant) for 123 Main Street, Apt 4B. Monthly rent is $1,500 with a $3,000 security deposit. Tenant pays all utilities except water and trash. Late fees apply after the 5th day of the month. Either party may terminate with 60 days notice, but tenant remains responsible for rent until the end of term or re-rental.",
        riskyClauses: [
          {
            clause:
              "LATE CHARGES: If rent is not paid by the 5th day of the month, Tenant agrees to pay a late charge of $100.00 plus $10.00 per day for each additional day rent remains unpaid.",
            risk: "High",
            explanation:
              "The late fee structure may be considered excessive and potentially unenforceable in some jurisdictions. The $10 per day additional charge could be viewed as a penalty rather than reasonable compensation.",
          },
          {
            clause:
              "TERMINATION: Either party may terminate this Agreement upon 60 days written notice. If Tenant terminates before the end of the term, Tenant shall be responsible for rent until the end of the term or until the Premises are re-rented, whichever occurs first.",
            risk: "Medium",
            explanation:
              "While the landlord can terminate with 60 days notice, the tenant remains responsible for rent until the end of the term. This creates an imbalance in termination rights.",
          },
          {
            clause: "GOVERNING LAW: This Agreement shall be governed by the laws of the State of [State].",
            risk: "Low",
            explanation: "The governing state is not specified, which could create ambiguity in case of disputes.",
          },
        ],
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading document analysis as PDF...")

    // Simulate download delay
    setTimeout(() => {
      alert("Download complete!")
    }, 1000)
  }

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSharing(true)

    // Simulate API call
    setTimeout(() => {
      setIsSharing(false)
      setShareSuccess(true)

      // Simulate email notification for document sharing
      console.log(`Email notification: Document analysis shared with ${shareEmail}`)

      setTimeout(() => {
        setShowShareDialog(false)
        setShareSuccess(false)
        setShareEmail("")
        setShareMessage("")
      }, 2000)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold">Analyzing Document...</h1>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 container py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <FileText className="h-16 w-16 text-muted-foreground" />
            </motion.div>
            <h2 className="mt-6 text-xl font-semibold">Analyzing your document</h2>
            <p className="text-muted-foreground mt-2">This may take a moment...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">{analysis.title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => router.push(`/dashboard/analysis/${params.id}/chat`)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat with Document</span>
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setShowShareDialog(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Document Summary</CardTitle>
                <CardDescription>Key information extracted from your contract</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{analysis.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Term</p>
                        <p className="font-medium">April 15, 2024 - April 14, 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-md">
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <Info className="h-4 w-4" /> Summary
                    </h3>
                    <p className="text-sm">{analysis.summary}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <Users className="h-4 w-4" /> Parties Involved
                    </h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      {analysis.parties.map((party: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                          <Building className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{party.name}</p>
                            <p className="text-sm text-muted-foreground">{party.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Potential issues identified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.riskyClauses.map((clause: any, index: number) => (
                    <motion.div
                      key={index}
                      className="p-2 border rounded-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">Clause {index + 1}</h4>
                        <Badge
                          variant={
                            clause.risk === "High" ? "destructive" : clause.risk === "Medium" ? "default" : "outline"
                          }
                        >
                          {clause.risk} Risk
                        </Badge>
                      </div>
                      <p className="text-sm mb-1 bg-muted p-2 rounded">{clause.clause}</p>
                      <p className="text-xs text-muted-foreground">{clause.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Document Details</CardTitle>
              <CardDescription>Full analysis of your contract</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="full-text">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="full-text">Full Text</TabsTrigger>
                  <TabsTrigger value="clauses">Key Clauses</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                <TabsContent value="full-text">
                  <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-wrap font-mono text-sm">
                    {analysis.extractedText}
                  </div>
                </TabsContent>
                <TabsContent value="clauses">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold mb-2">Rent</h3>
                      <p className="text-sm">
                        Tenant agrees to pay monthly rent of $1,500.00, due on the 1st day of each month.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold mb-2">Security Deposit</h3>
                      <p className="text-sm">
                        Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of $3,000.00 as a
                        security deposit.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold mb-2">Utilities</h3>
                      <p className="text-sm">
                        Tenant shall be responsible for payment of all utilities and services, except for water and
                        trash which shall be provided by Landlord.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold mb-2">Termination</h3>
                      <p className="text-sm">
                        Either party may terminate this Agreement upon 60 days written notice. If Tenant terminates
                        before the end of the term, Tenant shall be responsible for rent until the end of the term or
                        until the Premises are re-rented, whichever occurs first.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="recommendations">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <h3 className="font-semibold">Negotiate Late Fee Structure</h3>
                      </div>
                      <p className="text-sm">
                        The current late fee structure ($100 + $10/day) may be excessive. Consider negotiating a flat
                        fee or a percentage of the monthly rent.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <h3 className="font-semibold">Clarify Termination Terms</h3>
                      </div>
                      <p className="text-sm">
                        The termination clause creates an imbalance where the landlord can terminate with 60 days
                        notice, but the tenant remains responsible for rent. Negotiate for more balanced termination
                        rights.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold">Specify Governing State</h3>
                      </div>
                      <p className="text-sm">
                        The governing law clause does not specify which state's laws apply. This should be clarified to
                        avoid ambiguity.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Analysis</DialogTitle>
            <DialogDescription>Enter the recipient's email and a message to share this analysis.</DialogDescription>
          </DialogHeader>
          {shareSuccess ? (
            <div className="py-6">
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <AlertDescription className="text-green-800 dark:text-green-300">
                  Analysis shared successfully with {shareEmail}!
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Input
                    type="text"
                    id="message"
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setShowShareDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleShare} disabled={isSharing}>
                  {isSharing ? "Sharing..." : "Share"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

