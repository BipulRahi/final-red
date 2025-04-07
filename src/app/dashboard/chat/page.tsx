"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Avatar } from "@/src/components/ui/avatar"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { ArrowLeft, Send, Bot, User, FileText, Upload, FileImage, FileIcon as FilePdf } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { cn } from "@/src/lib/utils"
import { useDropzone } from "react-dropzone"
import { Progress } from "@/src/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

type Document = {
  id: string
  title: string
  date: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const [showDocumentList, setShowDocumentList] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", title: "Rental Agreement.pdf", date: "2025-04-01" },
    { id: "2", title: "Employment Contract.pdf", date: "2025-03-28" },
    { id: "3", title: "NDA Document.pdf", date: "2025-03-15" },
  ])
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [showUploader, setShowUploader] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content:
            "Hello! I'm your document assistant. Upload a document or type '/s' to select from your previous documents.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Check for commands
    if (inputMessage.trim() === "/s") {
      setShowDocumentList(true)
      setInputMessage("")
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after delay
    setTimeout(
      () => {
        setIsTyping(false)

        let botResponse = ""

        if (!currentDocument) {
          botResponse =
            "Please upload a document or select one from your previous documents by typing '/s' so I can help you analyze it."
        } else if (inputMessage.toLowerCase().includes("rent") || inputMessage.toLowerCase().includes("payment")) {
          botResponse =
            "The monthly rent specified in the document is $1,500, due on the 1st day of each month. Late payments after the 5th day incur a fee of $100 plus $10 per additional day."
        } else if (inputMessage.toLowerCase().includes("deposit")) {
          botResponse = "The security deposit is $3,000, to be paid upon execution of the agreement."
        } else if (inputMessage.toLowerCase().includes("term") || inputMessage.toLowerCase().includes("duration")) {
          botResponse = "The agreement term is 12 months, starting on April 15, 2025 and ending on April 14, 2025."
        } else if (inputMessage.toLowerCase().includes("terminate") || inputMessage.toLowerCase().includes("cancel")) {
          botResponse =
            "Either party may terminate the agreement with 60 days written notice. If the tenant terminates before the end of the term, they remain responsible for rent until the end of the term or until the premises are re-rented, whichever occurs first."
        } else if (inputMessage.toLowerCase().includes("risk") || inputMessage.toLowerCase().includes("issue")) {
          botResponse =
            "I identified 3 potential issues in the document:\n\n1. The late fee structure ($100 + $10/day) may be excessive and potentially unenforceable.\n\n2. The termination clause creates an imbalance where the tenant remains responsible for rent even after termination.\n\n3. The governing law clause does not specify which state's laws apply."
        } else if (inputMessage.toLowerCase().includes("summary") || inputMessage.toLowerCase().includes("overview")) {
          botResponse =
            "This is a 12-month residential rental agreement between ABC Properties LLC (Landlord) and John Smith (Tenant) for 123 Main Street, Apt 4B. Monthly rent is $1,500 with a $3,000 security deposit. Tenant pays all utilities except water and trash. Late fees apply after the 5th day of the month. Either party may terminate with 60 days notice, but tenant remains responsible for rent until the end of term or re-rental."
        } else {
          botResponse =
            "Based on my analysis of the document, I don't have specific information about that. Would you like to ask about the rent, security deposit, term, termination conditions, or potential risks in the document?"
        }

        const botMessage: Message = {
          id: Date.now().toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectDocument = (doc: Document) => {
    setCurrentDocument(doc)
    setShowDocumentList(false)

    // Simulate document loading
    setIsAnalyzing(true)

    setTimeout(() => {
      setIsAnalyzing(false)

      // Add bot message about selected document
      const botMessage: Message = {
        id: Date.now().toString(),
        content: `I've loaded "${doc.title}". What would you like to know about this document?`,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 2000)
  }

  // File upload handling
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)

      // Determine file type
      const type = selectedFile.type
      setFileType(type)

      // Create preview for images
      if (type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setFilePreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      }

      setShowUploader(false)
      handleUpload(selectedFile)
    }
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
    noClick: true,
    noKeyboard: true,
  })

  const handleUpload = (selectedFile: File) => {
    setUploading(true)

    // Add user message about uploading
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Uploading document: ${selectedFile.name}`,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setUploadProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setUploading(false)

        // Start document analysis
        setIsAnalyzing(true)

        // Create a new document entry
        const newDoc: Document = {
          id: Date.now().toString(),
          title: selectedFile.name,
          date: new Date().toISOString().split("T")[0],
        }

        // Add to documents list
        setDocuments((prev) => [newDoc, ...prev])

        // Set as current document
        setCurrentDocument(newDoc)

        // Simulate document analysis
        setTimeout(() => {
          setIsAnalyzing(false)

          // Add bot message about completed analysis
          const botMessage: Message = {
            id: Date.now().toString(),
            content: `I've analyzed "${selectedFile.name}". What would you like to know about this document?`,
            sender: "bot",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, botMessage])
        }, 3000)
      }
    }, 200)
  }

  const getFileIcon = () => {
    if (!fileType) return <FileText className="h-5 w-5 text-muted-foreground" />

    if (fileType.startsWith("image/")) {
      return <FileImage className="h-5 w-5 text-blue-500" />
    } else if (fileType === "application/pdf") {
      return <FilePdf className="h-5 w-5 text-red-500" />
    }

    return <FileText className="h-5 w-5 text-muted-foreground" />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center ml-2">
            <div className="rounded-full bg-primary/10 p-1 mr-2">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Document Assistant</h1>
              {currentDocument && (
                <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-xs">
                  {currentDocument.title}
                </p>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowUploader(true)}>
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload Document</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <AnimatePresence>
          {isAnalyzing ? (
            <motion.div
              className="flex-1 flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              >
                <Bot className="h-16 w-16 text-primary" />
              </motion.div>
              <h2 className="mt-6 text-xl font-semibold">Analyzing document...</h2>
              <p className="text-muted-foreground mt-2">Please wait while I process the content</p>

              <motion.div
                className="flex gap-1 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ y: ["0%", "-50%", "0%"] }}
                    transition={{
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-3xl mx-auto space-y-4 pb-20">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3",
                        message.sender === "user" ? "justify-end" : "justify-start",
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </Avatar>
                      )}

                      <div
                        className={cn(
                          "rounded-lg p-3 max-w-[80%]",
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>

                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 bg-primary">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </Avatar>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </Avatar>

                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                              animate={{ y: ["0%", "-50%", "0%"] }}
                              transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Document selection list */}
                  {showDocumentList && (
                    <motion.div
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </Avatar>

                      <div className="rounded-lg p-3 bg-muted max-w-[80%] w-full">
                        <p className="text-sm mb-3">Here are your documents:</p>
                        <div className="space-y-2">
                          {documents.map((doc) => (
                            <motion.div
                              key={doc.id}
                              className="flex items-center gap-2 p-2 border rounded-md bg-background cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => selectDocument(doc)}
                              whileHover={{ scale: 1.01 }}
                            >
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{doc.title}</p>
                                <p className="text-xs text-muted-foreground">{doc.date}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowDocumentList(false)}>
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Upload progress */}
                  {uploading && (
                    <motion.div
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </Avatar>

                      <div className="rounded-lg p-3 bg-muted max-w-[80%] w-full">
                        <p className="text-sm mb-2">Uploading document...</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <motion.div
                className="sticky bottom-0 border-t bg-background p-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="max-w-3xl mx-auto flex items-end gap-2">
                  <div className="relative flex-1">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about a document or type '/s' to select one..."
                      className="min-h-[50px] max-h-[150px] pr-10 resize-none"
                      rows={1}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 bottom-2"
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                    >
                      <Send
                        className={cn(
                          "h-5 w-5 transition-colors",
                          inputMessage.trim() ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    </Button>
                  </div>
                </div>

                <motion.div
                  className="max-w-3xl mx-auto mt-2 flex flex-wrap gap-2 px-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("/s")}>
                    Select document
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputMessage("What are the key risks in this document?")}
                  >
                    Key risks
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputMessage("Summarize the document")}
                  >
                    Summarize
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowUploader(true)}>
                    Upload new document
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* File uploader dialog */}
      <Dialog open={showUploader} onOpenChange={setShowUploader}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>

          <div {...getRootProps()} className="relative">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-2">
                <motion.div
                  animate={{
                    y: isDragActive ? [0, -5, 0] : 0,
                  }}
                  transition={{
                    repeat: isDragActive ? Number.POSITIVE_INFINITY : 0,
                    duration: 1.5,
                  }}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </motion.div>
                <p className="text-sm font-medium">{isDragActive ? "Drop the file here" : "Drag & drop a file here"}</p>
                <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG (max 10MB)</p>
                <Button type="button" variant="outline" size="sm" onClick={open} className="mt-2">
                  Browse Files
                </Button>
              </div>
            </motion.div>
          </div>

          {file && filePreview && (
            <div className="p-3 flex justify-center bg-muted/30 rounded-md">
              <img
                src={filePreview || "/placeholder.svg"}
                alt="Preview"
                className="max-h-40 object-contain rounded-md"
              />
            </div>
          )}

          {file && fileType === "application/pdf" && (
            <div className="p-3 flex justify-center bg-muted/30 rounded-md">
              <div className="flex flex-col items-center p-4">
                <FilePdf className="h-16 w-16 text-red-500" />
                <p className="text-sm text-muted-foreground mt-2">PDF Document</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* File Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center min-h-[50vh] bg-muted/30 rounded-md">
            {filePreview && fileType?.startsWith("image/") && (
              <img
                src={filePreview || "/placeholder.svg"}
                alt="Preview"
                className="max-h-[70vh] max-w-full object-contain rounded-md"
              />
            )}
            {fileType === "application/pdf" && file && (
              <div className="w-full h-[70vh]">
                <iframe src={URL.createObjectURL(file)} className="w-full h-full rounded-md" title="PDF Preview" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

