"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Filter, Search, Server, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ApiHealthGrid } from "@/components/api-health-grid"
import { PageHeader } from "@/components/page-header"

export function ApiOverview() {
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
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="h-full w-full p-6">
        <PageHeader title="API Overview" description="Monitor and manage all your APIs across environments" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Across 4 environments</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthy APIs</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">85.7% of total APIs</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Degraded APIs</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">14.3% of total APIs</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Health Status</CardTitle>
                  <CardDescription>Current health status of all APIs</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search APIs..." className="h-9 w-[200px] pl-8" />
                  </div>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ApiHealthGrid />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <Button variant="outline" className="ml-auto gap-1">
                <span>View All APIs</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

