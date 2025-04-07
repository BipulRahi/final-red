"use client";
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import {
  ArrowRight,
  FileText,
  Shield,
  FileSearch,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
  Star,
} from "lucide-react"
// import Lottie from "lottie-react";
import animationDataK from '../public/2.json'; // Adjust the file paths as needed
import animationDataL from '../public/3.json';
import animationDataM from '../public/44.json';
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Card, CardContent } from "@/src/components/ui/card"
// import AnimatedSequence from "../components/animat";
import dynamic from "next/dynamic"
import { Suspense } from "react";
// import LoopingLottie from "../components/LoopingLottie";
const LoopingLottie = dynamic(() => import('../components/LoopingLottie'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading indicator
});



// Dynamically import the 3D hero component with no SSR
// const Hero3D = dynamic(() => import("@/src/components/hero-3d"), { ssr: false })

export default function Home() {

  const animations = [animationDataK, animationDataL, animationDataM];


  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            ContractSafe
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link href="/mobile-app" className="text-sm font-medium">
              Mobile App
            </Link>
            <Link href="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Contract Analysis Made Simple
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Upload your contracts and get instant insights. No more reading through pages of legal jargon.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline" className="gap-1.5">
                      See How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center h-[400px]">
                {/* <Hero3D /> */}
                <Suspense fallback={<p>Loading...</p>}>
                <LoopingLottie />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes contract analysis simple and efficient
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <FileSearch className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Upload</h3>
                  <p className="text-muted-foreground">Upload your contract via camera or file upload</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Analyze</h3>
                  <p className="text-muted-foreground">Our AI analyzes the document for key information and risks</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Review</h3>
                  <p className="text-muted-foreground">Get instant insights with highlighted risks and summaries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful tools to help you understand your contracts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300">
                <div className="h-2 bg-green-500 w-full"></div>
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
                      <p className="text-muted-foreground">
                        Automatically identify high-risk clauses and potential legal issues in your contracts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300">
                <div className="h-2 bg-amber-500 w-full"></div>
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Plain Language Summaries</h3>
                      <p className="text-muted-foreground">
                        Get easy-to-understand summaries of complex legal documents in seconds.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300">
                <div className="h-2 bg-blue-500 w-full"></div>
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                      <BarChart3 className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Data Extraction</h3>
                      <p className="text-muted-foreground">
                        Extract key information like parties, dates, and financial terms automatically.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Legal Professionals
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  See what our users are saying about how ContractSafe has transformed their contract review process.
                </p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Legal Counsel, Tech Innovations Inc.</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "ContractSafe has cut our contract review time by 70%. The risk analysis feature has been
                      invaluable in identifying problematic clauses that we might have missed."
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Michael Chen</p>
                        <p className="text-sm text-muted-foreground">Partner, Chen & Associates</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "As a small law firm, we needed a solution that could help us process contracts efficiently.
                      ContractSafe has been a game-changer for our practice."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of professionals who trust ContractSafe for their contract analysis needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1.5">
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
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

