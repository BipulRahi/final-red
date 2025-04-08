"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Shield, FileText, Clock, CheckCircle, LogOut, Menu, MessageSquare } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import FileUploader from "@/src/components/file-uploader"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { useServerStatus } from "@/src/components/server-status-provider"

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const {  isLoading } = useServerStatus()
  const [v,setv]=useState(false)

  // Redirect to server offline page if server is not online
  async function check() {
    try {
      const response = await fetch('/api/colabData?action=health');
      console.log(response)
      if (!response.ok) {
          return false;
        // throw new Error('Failed to check Colab status');
      }
      else if(response.ok){
        setv(true)
        return true;
      }
      
    } catch (err) {
      console.log("error occur while chekcing health");
      return false
    }
  }


  
  useEffect(() => {
    check()
    // console.log(isLoading,v)
    if (!isLoading && !v ) {
      router.push("/server-offline")
    }
  }, [])

  
  useEffect(() => {
    check()
    // console.log("hgu")
    if (!isLoading && !v ) {
      router.push("/server-offline")
    }
  }, [ isLoading, router])

  const recentDocuments = [
    { id: 1, name: "Rental Agreement.pdf", date: "2025-04-01", status: "analyzed" },
    { id: 2, name: "Employment Contract.pdf", date: "2025-03-28", status: "analyzed" },
    { id: 3, name: "NDA Document.pdf", date: "2025-03-15", status: "analyzed" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  // Show loading state while checking server status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
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
            <Link href="/dashboard/chat" className="text-sm font-medium">
              Chat
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium">
              Settings
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-6 py-6">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-bold text-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="h-6 w-6" />
                    ContractSafe
                  </Link>
                  <nav className="flex flex-col gap-4">
                    <Link href="/dashboard" className="text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/documents"
                      className="text-sm font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Documents
                    </Link>
                    <Link
                      href="/dashboard/chat"
                      className="text-sm font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Chat
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="text-sm font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </nav>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push("/")
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => router.push("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
            Dashboard
          </motion.h1>

          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8" variants={itemVariants}>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Documents</CardTitle>
                  <CardDescription>All uploaded contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Risk Alerts</CardTitle>
                  <CardDescription>Contracts with high risk clauses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-500">3</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => router.push("/dashboard/chat")}
              className="cursor-pointer"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Document Chat</CardTitle>
                  <CardDescription>Ask questions about your documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-emerald-500" />
                    <span className="text-xl font-bold">AI Assistant</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Document</CardTitle>
                  <CardDescription>Upload a contract to analyze</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Your recently analyzed contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    <motion.div className="space-y-4">
                      {recentDocuments.map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.1 },
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "var(--muted)",
                            transition: { duration: 0.2 },
                          }}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
                          onClick={() => router.push(`/dashboard/analysis/${doc.id}`)}
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {doc.date}
                              </p>
                            </div>
                          </div>
                          <div>
                            {doc.status === "analyzed" ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/documents")}>
                    View All Documents
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

