"use client"

import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

export function ServiceMap() {
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
          title="Service Map"
          description="Visual representation of service dependencies and relationships"
          icon={<Layers className="h-6 w-6 text-primary" />}
        />

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>API Service Map</CardTitle>
                <CardDescription>Interactive visualization of service dependencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] flex items-center justify-center">
                  <p className="text-muted-foreground">Service map visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

