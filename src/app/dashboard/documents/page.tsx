"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Shield, FileText, Search, Filter, CheckCircle, Clock, Upload } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const documents = [
    { id: 1, name: "Rental Agreement.pdf", date: "2024-04-01", status: "analyzed", risk: "high" },
    { id: 2, name: "Employment Contract.pdf", date: "2024-03-28", status: "analyzed", risk: "low" },
    { id: 3, name: "NDA Document.pdf", date: "2024-03-15", status: "analyzed", risk: "medium" },
    { id: 4, name: "Service Agreement.pdf", date: "2024-03-10", status: "analyzed", risk: "low" },
    { id: 5, name: "Vendor Contract.pdf", date: "2024-03-05", status: "analyzed", risk: "medium" },
    { id: 6, name: "Lease Agreement.pdf", date: "2024-02-28", status: "analyzed", risk: "high" },
    { id: 7, name: "Partnership Agreement.pdf", date: "2024-02-20", status: "analyzed", risk: "low" },
    { id: 8, name: "Consulting Contract.pdf", date: "2024-02-15", status: "analyzed", risk: "low" },
  ]

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
            <Link href="/dashboard/documents" className="text-sm font-medium text-primary">
              Documents
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium">
              Settings
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold">Documents</h1>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button onClick={() => router.push("/dashboard")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No documents found matching your search.</div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
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
                      <div className="flex items-center gap-2">
                        {doc.status === "analyzed" ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-amber-500" />
                        )}
                        <Badge
                          variant={doc.risk === "high" ? "destructive" : doc.risk === "medium" ? "default" : "outline"}
                        >
                          {doc.risk === "high" ? "High Risk" : doc.risk === "medium" ? "Medium Risk" : "Low Risk"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

