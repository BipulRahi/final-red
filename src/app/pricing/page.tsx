"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Shield, ArrowLeft, Check, X } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Switch } from "@/src/components/ui/switch"

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)

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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for you and start analyzing contracts with confidence.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={annual ? "text-muted-foreground" : ""}>Monthly</span>
            <div className="flex items-center">
              <Switch checked={annual} onCheckedChange={setAnnual} id="billing-toggle" />
            </div>
            <span className={!annual ? "text-muted-foreground" : ""}>
              Annual <span className="text-sm text-emerald-500 font-medium">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            className="border rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ translateY: -5 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>

            <div className="border-t p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>5 document analyses per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Basic risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Document summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Advanced AI chat</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Team sharing</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            className="border rounded-xl overflow-hidden relative bg-primary/5 border-primary/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ translateY: -5 }}
          >
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
              Popular
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">${annual ? "29" : "39"}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <Button className="w-full">Get Started</Button>
            </div>

            <div className="border-t p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>50 document analyses per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Advanced risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Document summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Advanced AI chat</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Team sharing</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            className="border rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ translateY: -5 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">${annual ? "99" : "129"}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </div>

            <div className="border-t p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Unlimited document analyses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Advanced risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Document summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Advanced AI chat</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Team sharing & collaboration</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
            <div className="space-y-2">
              <h3 className="font-semibold">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next
                billing cycle.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes, all paid plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">How secure is my data?</h3>
              <p className="text-muted-foreground">
                We use enterprise-grade encryption and security practices. Your documents are never shared and are
                deleted after analysis if you choose.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 ContractSafe. All rights reserved.</p>
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

