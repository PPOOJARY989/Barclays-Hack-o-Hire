"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertData, setAlertData] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)

      // Simulate an alert after 5 seconds
      setTimeout(() => {
        const alert = {
          title: "Response Time Anomaly Detected",
          description:
            "Payment API response time has increased by 300% in the last 5 minutes. Potential impact on checkout flow.",
          severity: "high",
          timestamp: new Date().toISOString(),
          service: "payment-service",
          environment: "production-cloud",
        }

        setAlertData(alert)
        setAlertOpen(true)

        toast({
          title: "Anomaly Detected",
          description: "Payment API response time anomaly detected",
          variant: "destructive",
        })
      }, 5000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [toast])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative h-16 w-16"
          >
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"></div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold text-blue-600"
          >
            Initializing API Monitoring System
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MainContent />

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="border-destructive/20 bg-background/95 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <AlertDialogTitle className="text-destructive">{alertData?.title}</AlertDialogTitle>
            <AlertDialogDescription className="mt-4 space-y-3">
              <p>{alertData?.description}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md bg-muted p-2">
                  <span className="font-semibold">Service:</span> {alertData?.service}
                </div>
                <div className="rounded-md bg-muted p-2">
                  <span className="font-semibold">Environment:</span> {alertData?.environment}
                </div>
                <div className="rounded-md bg-muted p-2">
                  <span className="font-semibold">Severity:</span>{" "}
                  <span className="font-bold text-destructive">{alertData?.severity}</span>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <span className="font-semibold">Time:</span>{" "}
                  {alertData?.timestamp && new Date(alertData.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </AlertDialogDescription>
            <div className="mt-4 flex justify-end gap-2">
              <AlertDialogCancel>Dismiss</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                View Details
              </AlertDialogAction>
            </div>
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

