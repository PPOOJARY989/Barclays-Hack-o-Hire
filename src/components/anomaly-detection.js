"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, Calendar, Clock, Filter, Search, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { ResponseTimeChart } from "@/components/response-time-chart"

export function AnomalyDetection() {
  const [activeTab, setActiveTab] = useState("current")

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
          title="Anomaly Detection"
          description="AI-powered detection of unusual patterns and behaviors"
          badge={{
            count: 3,
            label: "Active Anomalies",
            variant: "destructive",
          }}
        />

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="current">Current Anomalies</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
              <TabsTrigger value="settings">Detection Settings</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="h-9 w-[200px] pl-8" />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <TabsContent value="current" className="mt-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
              <motion.div variants={item} className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Anomaly Trends</CardTitle>
                      <CardDescription>Response time anomalies across all APIs</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="24h">
                        <SelectTrigger className="h-8 w-[110px]">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">Last hour</SelectItem>
                          <SelectItem value="6h">Last 6 hours</SelectItem>
                          <SelectItem value="24h">Last 24 hours</SelectItem>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[300px] w-full">
                      <ResponseTimeChart />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Active Anomalies</CardTitle>
                    <CardDescription>Detected in the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-3">
                        {[1, 2, 3].map((_, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="rounded-lg border bg-card p-4 shadow-sm"
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                <h4 className="font-medium">Payment API Response Time</h4>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                5 minutes ago
                              </Badge>
                            </div>
                            <p className="mb-3 text-sm text-muted-foreground">300% increase in the last 5 minutes</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <Badge variant="secondary">payment-service</Badge>
                              <Badge variant="outline">production-cloud</Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button variant="outline" className="w-full gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>View All Anomalies</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={item} initial="hidden" animate="show" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Predicted Anomalies</CardTitle>
                  <CardDescription>AI-predicted potential issues in the next 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-4">
                      <h3 className="mb-2 flex items-center gap-2 text-lg font-medium text-amber-500">
                        <Sparkles className="h-5 w-5" />
                        <span>Potential Service Degradation</span>
                      </h3>
                      <p className="mb-3 text-sm">
                        Our AI models predict a potential degradation in the Payment Service within the next 4 hours
                        based on current trends and historical patterns.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>4 hours</span>
                          </Badge>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>85% confidence</span>
                          </Badge>
                        </div>
                        <Button size="sm" className="gap-1">
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="historical" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Historical Anomalies</CardTitle>
                <CardDescription>Past anomalies and their resolutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center">
                  <p className="text-muted-foreground">Historical anomaly data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection Settings</CardTitle>
                <CardDescription>Configure detection thresholds and sensitivity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex items-center justify-center">
                  <p className="text-muted-foreground">Anomaly detection settings will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

