"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { ResponseTimeChart } from "@/components/response-time-chart"
import { ErrorRateChart } from "@/components/error-rate-chart"

export function Metrics() {
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
          title="Metrics"
          description="Performance metrics across all APIs and environments"
          icon={<LineChart className="h-6 w-6 text-primary" />}
        />
        <Tabs defaultValue="response-time" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="response-time">Response Time</TabsTrigger>
              <TabsTrigger value="error-rate">Error Rate</TabsTrigger>
              <TabsTrigger value="throughput">Throughput</TabsTrigger>
              <TabsTrigger value="custom">Custom Metrics</TabsTrigger>
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
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <TabsContent value="response-time" className="mt-0">
              <motion.div variants={item}>
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Response Time Trends</CardTitle>
                      <CardDescription>Average response time across all APIs</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8 w-[150px]">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Environments</SelectItem>
                          <SelectItem value="aws">AWS</SelectItem>
                          <SelectItem value="azure">Azure</SelectItem>
                          <SelectItem value="gcp">GCP</SelectItem>
                          <SelectItem value="onprem">On-Premises</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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

            <TabsContent value="error-rate" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Error Rate by Environment</CardTitle>
                    <CardDescription>Comparison across all environments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ErrorRateChart />
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
                  <CardTitle>API Throughput</CardTitle>
                  <CardDescription>Requests per minute across all APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Throughput metrics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Metrics</CardTitle>
                  <CardDescription>User-defined metrics and KPIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Custom metrics will be displayed here</p>
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

