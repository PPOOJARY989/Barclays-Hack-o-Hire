import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "API Monitoring & Anomaly Detection",
  description: "AI-Powered API Monitoring and Anomaly Detection System",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <div className="relative min-h-screen">
              {children}
              <Toaster />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

