"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { PredictiveInsights } from "@/components/predictive-insights"

export function Predictions() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex-1 overflow-auto bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="AI Predictions"
          description="Predictive analytics for potential issues and optimizations"
          icon={<Sparkles className="h-6 w-6 text-primary" />}
        />

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Predictive Insights</CardTitle>
                <CardDescription>AI-powered predictions and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <PredictiveInsights />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

