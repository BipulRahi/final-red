import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            ContractSafe
          </Link>
          <div className="ml-auto">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to ContractSafe. These Terms and Conditions govern your use of our website and services. By
              accessing or using ContractSafe, you agree to be bound by these Terms. If you disagree with any part of
              the terms, you may not access the service.
            </p>

            <h2>2. Definitions</h2>
            <p>
              <strong>"Service"</strong> refers to the ContractSafe website and contract analysis platform.
              <br />
              <strong>"User"</strong> refers to the individual accessing or using the Service.
              <br />
              <strong>"Content"</strong> refers to all information uploaded, processed, or analyzed through our Service.
            </p>

            <h2>3. Use of Service</h2>
            <p>
              ContractSafe provides an AI-powered contract analysis tool. Users may upload contracts and documents for
              analysis, extraction of key terms, risk assessment, and summarization. The Service is provided "as is" and
              "as available" without warranties of any kind.
            </p>

            <h2>4. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are
              responsible for safeguarding the password and for all activities that occur under your account. You agree
              to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>5. Content</h2>
            <p>
              You retain all rights to your Content. By uploading Content to ContractSafe, you grant us a license to
              use, process, and analyze your Content solely for the purpose of providing our Service to you. We do not
              claim ownership of your Content.
            </p>

            <h2>6. Privacy</h2>
            <p>
              Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and
              protect your personal information. By using our Service, you consent to our collection and use of
              information as described in our Privacy Policy.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall ContractSafe, its directors, employees, partners, agents, suppliers, or affiliates be
              liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>

            <h2>8. Disclaimer</h2>
            <p>
              The analysis provided by ContractSafe is not a substitute for professional legal advice. We do not
              guarantee the accuracy, completeness, or usefulness of any analysis. Users should consult with qualified
              legal professionals regarding specific legal matters.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
              will be determined at our sole discretion.
            </p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@contractsafe.com.</p>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-sm text-muted-foreground">Last updated: April 3, 2025</p>
          </div>
        </div>
      </main>
    </div>
  )
}

