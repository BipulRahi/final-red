import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ArrowRight, FileText, Shield, FileSearch } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            ContractSafe
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
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
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-full w-full">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg p-8 shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <FileText className="h-10 w-10 text-white" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Contract Analysis</h3>
                        <p className="text-white/80">Instant insights from your documents</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/10 p-3 rounded-md backdrop-blur">
                        <p className="text-white font-medium">✓ Extract key parties & terms</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md backdrop-blur">
                        <p className="text-white font-medium">✓ Identify risky clauses</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md backdrop-blur">
                        <p className="text-white font-medium">✓ Get plain-language summaries</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md backdrop-blur">
                        <p className="text-white font-medium">✓ Save time reviewing documents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 ContractSafe. All rights reserved.</p>
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

