"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Clock,
  Cloud,
  ExternalLink,
  Filter,
  RefreshCw,
  Search,
  Server,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogsViewer } from "@/components/logs-viewer"
import { ResponseTimeChart } from "@/components/response-time-chart"
import { ErrorRateChart } from "@/components/error-rate-chart"
import { ApiHealthGrid } from "@/components/api-health-grid"
import { PredictiveInsights } from "@/components/predictive-insights"

export function MainContent() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLastUpdated(new Date())
    }, 1500)
  }

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      handleRefresh()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 overflow-auto bg-background p-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold tracking-tight"
            >
              API Monitoring Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-muted-foreground"
            >
              AI-powered monitoring and anomaly detection for distributed APIs
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="gap-1">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </Button>
          </motion.div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard title="API Health" value="94%" change="-2%" status="warning" icon={CheckCircle} delay={0.1} />
          <StatusCard title="Active APIs" value="42" change="+3" status="success" icon={Server} delay={0.2} />
          <StatusCard title="Error Rate" value="1.8%" change="+0.5%" status="danger" icon={XCircle} delay={0.3} />
          <StatusCard title="Anomalies" value="3" change="+2" status="danger" icon={AlertTriangle} delay={0.4} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Response Time Trends</CardTitle>
                  <CardDescription>Average response time across all APIs</CardDescription>
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
              <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-background">
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
                    API Response Time
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-destructive"></span>
                    Anomalies
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>Full Report</span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Active Anomalies</CardTitle>
                <CardDescription>Detected in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <AnimatePresence>
                    <motion.div className="space-y-3">
                      <AnomalyItem
                        title="Payment API Response Time"
                        description="300% increase in the last 5 minutes"
                        time="5 minutes ago"
                        severity="high"
                        service="payment-service"
                        environment="production-cloud"
                        delay={0.1}
                      />
                      <AnomalyItem
                        title="User Auth Error Rate"
                        description="Error rate increased to 5.2%"
                        time="32 minutes ago"
                        severity="medium"
                        service="auth-service"
                        environment="production-aws"
                        delay={0.2}
                      />
                      <AnomalyItem
                        title="Product Catalog API Latency"
                        description="Consistent latency increase detected"
                        time="1 hour ago"
                        severity="low"
                        service="catalog-service"
                        environment="staging-onprem"
                        delay={0.3}
                      />
                    </motion.div>
                  </AnimatePresence>
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="logs">Logs Explorer</TabsTrigger>
                <TabsTrigger value="health">API Health</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
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

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Error Rate by Environment</CardTitle>
                    <CardDescription>Last 24 hours comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ErrorRateChart />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environment Distribution</CardTitle>
                    <CardDescription>API distribution across environments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <EnvironmentItem name="AWS Cloud" count={18} percentage={42} icon={Cloud} color="text-blue-500" />
                      <EnvironmentItem
                        name="Azure Cloud"
                        count={12}
                        percentage={28}
                        icon={Cloud}
                        color="text-purple-500"
                      />
                      <EnvironmentItem
                        name="On-Premises"
                        count={8}
                        percentage={19}
                        icon={Server}
                        color="text-orange-500"
                      />
                      <EnvironmentItem name="GCP Cloud" count={4} percentage={11} icon={Cloud} color="text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Logs Explorer</CardTitle>
                  <CardDescription>Real-time logs from all environments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px]">
                    <LogsViewer />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>API Health Status</CardTitle>
                  <CardDescription>Current health status of all APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px]">
                    <ApiHealthGrid />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>AI Predictions & Insights</CardTitle>
                  <CardDescription>Predictive analytics for potential issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px]">
                    <PredictiveInsights />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatusCard({ title, value, change, status, icon: Icon, delay = 0 }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "danger":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  const getChangeIcon = (change) => {
    if (change.startsWith("+")) return <ArrowUp className="h-3 w-3" />
    if (change.startsWith("-")) return <ArrowDown className="h-3 w-3" />
    return null
  }

  const getChangeColor = (change, status) => {
    if (status === "danger" && change.startsWith("+")) return "text-red-500"
    if (status === "success" && change.startsWith("+")) return "text-green-500"
    if (status === "warning" && change.startsWith("-")) return "text-yellow-500"
    if (change.startsWith("+")) return "text-green-500"
    if (change.startsWith("-")) return "text-red-500"
    return "text-muted-foreground"
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
            <div className="flex items-center gap-1">
              <span className={getChangeColor(change, status)}>{getChangeIcon(change)}</span>
              <span className={`text-xs font-medium ${getChangeColor(change, status)}`}>{change}</span>
            </div>
          </div>
          <div className={`rounded-full p-3 ${getStatusColor(status)} bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${getStatusColor(status)}`} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AnomalyItem({ title, description, time, severity, service, environment, delay = 0 }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-lg border bg-card p-4 shadow-sm"
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${getSeverityColor(severity)}`} />
          <h4 className="font-medium">{title}</h4>
        </div>
        <Badge variant="outline" className="text-xs">
          {time}
        </Badge>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="secondary">{service}</Badge>
        <Badge variant="outline">{environment}</Badge>
      </div>
    </motion.div>
  )
}

function EnvironmentItem({ name, count, percentage, icon: Icon, color }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <div className="text-sm">
          <span className="font-medium">{count}</span>
          <span className="text-muted-foreground"> APIs</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Progress value={percentage} className="h-2" />
        <span className="text-xs text-muted-foreground">{percentage}%</span>
      </div>
    </div>
  )
}

