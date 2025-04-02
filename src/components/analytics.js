"use client"

import { motion } from "framer-motion"
import { BarChart3, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"

export function Analytics() {
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
        <PageHeader
          title="Analytics"
          description="In-depth analysis of API performance and usage patterns"
          icon={<BarChart3 className="h-6 w-6 text-primary" />}
        />
        <Tabs defaultValue="usage" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList className="w-full max-w-[600px]">
              <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select defaultValue="30d">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <TabsContent value="usage" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>API Usage Analytics</CardTitle>
                    <CardDescription>Request volume and patterns across all APIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] flex items-center justify-center">
                      <p className="text-muted-foreground">API usage analytics will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="performance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Response time and throughput analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-muted-foreground">Performance analytics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>Long-term trends and pattern recognition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-muted-foreground">Trend analysis will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Reports</CardTitle>
                  <CardDescription>Scheduled and custom reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics reports will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}

