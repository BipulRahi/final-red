import './globals.css'; // Import globals.css at the top level
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { ServerStatusProvider } from "@/src/components/server-status-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContractSafe - AI Contract Analysis",
  description: "Analyze contracts and legal documents with AI",
  generator: 'Bipul',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ServerStatusProvider>{children}</ServerStatusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}