"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Avatar } from "@/src/components/ui/avatar"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { ArrowLeft, Send, Bot, User, Paperclip, Mic, FileText } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { cn } from "@/src/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function DocumentChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [documentTitle, setDocumentTitle] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()
  const documentId = params.id

  // Simulate document analysis on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false)

      // Add initial bot message
      setMessages([
        {
          id: "welcome",
          content: "I've analyzed the document. Ask me anything about it!",
          sender: "bot",
          timestamp: new Date(),
        },
      ])

      // Set document title based on ID
      if (documentId === "1") {
        setDocumentTitle("Rental Agreement.pdf")
      } else if (documentId === "2") {
        setDocumentTitle("Employment Contract.pdf")
      } else {
        setDocumentTitle("Document " + documentId)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [documentId])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

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

        // Generate response based on user message
        if (inputMessage.toLowerCase().includes("rent") || inputMessage.toLowerCase().includes("payment")) {
          botResponse =
            "The monthly rent specified in the document is $1,500, due on the 1st day of each month. Late payments after the 5th day incur a fee of $100 plus $10 per additional day."
        } else if (inputMessage.toLowerCase().includes("deposit")) {
          botResponse = "The security deposit is $3,000, to be paid upon execution of the agreement."
        } else if (inputMessage.toLowerCase().includes("term") || inputMessage.toLowerCase().includes("duration")) {
          botResponse = "The agreement term is 12 months, starting on April 15, 2024 and ending on April 14, 2025."
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/dashboard/analysis/${documentId}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center ml-2">
            <div className="rounded-full bg-primary/10 p-1 mr-2">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Document Assistant</h1>
              <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-xs">{documentTitle}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href={`/dashboard/analysis/${documentId}`}>
                <FileText className="h-4 w-4 mr-2" />
                View Analysis
              </Link>
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
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>

                  <div className="relative flex-1">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about the document..."
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

                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>

                <motion.div
                  className="max-w-3xl mx-auto mt-2 flex flex-wrap gap-2 px-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputMessage("What are the payment terms?")}
                  >
                    Payment terms
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputMessage("How can I terminate this agreement?")}
                  >
                    Termination
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

