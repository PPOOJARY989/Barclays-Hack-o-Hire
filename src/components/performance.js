"use client"

import { motion } from "framer-motion"
import { ArrowRight, Gauge } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { ResponseTimeChart } from "@/components/response-time-chart"

export function Performance() {
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
          title="Performance"
          description="Detailed performance metrics and optimization insights"
          icon={<Gauge className="h-6 w-6 text-primary" />}
        />

        <Tabs defaultValue="overview" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="response-time">Response Time</TabsTrigger>
              <TabsTrigger value="throughput">Throughput</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select defaultValue="24h">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <TabsContent value="overview" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Key performance indicators across all APIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] flex items-center justify-center">
                      <p className="text-muted-foreground">Performance overview will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="response-time" className="mt-0">
              <motion.div variants={item}>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                    <CardDescription>Detailed response time metrics by API and environment</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[400px] w-full">
                      <ResponseTimeChart />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button variant="ghost" size="sm" className="ml-auto gap-1">
                      <span>View Detailed Report</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="throughput" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Throughput Analysis</CardTitle>
                  <CardDescription>Request volume and processing capacity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-muted-foreground">Throughput analysis will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimization" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Optimization</CardTitle>
                  <CardDescription>AI-powered recommendations for improving performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Performance optimization recommendations will be displayed here
                    </p>
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

