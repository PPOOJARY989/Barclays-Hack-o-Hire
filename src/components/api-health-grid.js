"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, ExternalLink, Filter, Search, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ApiHealthGrid() {
  const [apis, setApis] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Generate sample API data
    const generateApis = () => {
      const apiNames = [
        "User Authentication",
        "Payment Processing",
        "Product Catalog",
        "Order Management",
        "Inventory",
        "Shipping",
        "Notifications",
        "Search",
        "Recommendations",
        "Analytics",
        "User Profile",
        "Cart",
        "Checkout",
        "Reviews",
        "Pricing",
      ]

      const environments = ["AWS", "Azure", "GCP", "On-Prem"]
      const statuses = ["healthy", "degraded", "critical", "healthy", "healthy"]

      return apiNames.map((name, index) => {
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const responseTime =
          status === "healthy"
            ? 50 + Math.random() * 100
            : status === "degraded"
              ? 200 + Math.random() * 300
              : 500 + Math.random() * 500

        const errorRate =
          status === "healthy"
            ? Math.random() * 0.5
            : status === "degraded"
              ? 1 + Math.random() * 3
              : 5 + Math.random() * 10

        const uptime =
          status === "healthy"
            ? 99.9 + Math.random() * 0.1
            : status === "degraded"
              ? 98 + Math.random() * 1.5
              : 90 + Math.random() * 5

        return {
          id: `api-${index}`,
          name,
          status,
          environment: environments[Math.floor(Math.random() * environments.length)],
          responseTime: Math.round(responseTime),
          errorRate: Number.parseFloat(errorRate.toFixed(2)),
          uptime: Number.parseFloat(uptime.toFixed(2)),
          requests: Math.floor(10000 + Math.random() * 90000),
          lastChecked: new Date(Date.now() - Math.random() * 3600000),
        }
      })
    }

    setApis(generateApis())
    setLoading(false)

    // Update data periodically
    const interval = setInterval(() => {
      setApis((prevApis) => {
        return prevApis.map((api) => {
          // Randomly update some APIs
          if (Math.random() > 0.7) {
            const statusChange = Math.random()
            let newStatus = api.status

            // Small chance to change status
            if (statusChange > 0.9) {
              if (api.status === "healthy") newStatus = "degraded"
              else if (api.status === "degraded") {
                newStatus = Math.random() > 0.5 ? "critical" : "healthy"
              } else if (api.status === "critical") newStatus = "degraded"
            }

            // Update response time based on status
            const responseTime =
              newStatus === "healthy"
                ? 50 + Math.random() * 100
                : newStatus === "degraded"
                  ? 200 + Math.random() * 300
                  : 500 + Math.random() * 500

            const errorRate =
              newStatus === "healthy"
                ? Math.random() * 0.5
                : newStatus === "degraded"
                  ? 1 + Math.random() * 3
                  : 5 + Math.random() * 10

            return {
              ...api,
              status: newStatus,
              responseTime: Math.round(responseTime),
              errorRate: Number.parseFloat(errorRate.toFixed(2)),
              lastChecked: new Date(),
            }
          }
          return api
        })
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredApis = filter === "all" ? apis : apis.filter((api) => api.status === filter)

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500/20 text-green-500">Healthy</Badge>
      case "degraded":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Degraded</Badge>
      case "critical":
        return <Badge className="bg-red-500/20 text-red-500">Critical</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
        />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="sticky top-0 z-10 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search APIs..." className="pl-8" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All APIs</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="degraded">Degraded</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow>
                <TableHead className="w-[250px]">API Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead className="text-right">Response Time</TableHead>
                <TableHead className="text-right">Error Rate</TableHead>
                <TableHead className="text-right">Uptime</TableHead>
                <TableHead className="text-right">Last Check</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApis.map((api) => (
                <TableRow key={api.id} className="group hover:bg-muted/50">
                  <TableCell className="font-medium">{api.name}</TableCell>
                  <TableCell>{getStatusBadge(api.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{api.environment}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={
                          api.responseTime > 500
                            ? "text-red-500"
                            : api.responseTime > 200
                              ? "text-yellow-500"
                              : "text-green-500"
                        }
                      >
                        {api.responseTime} ms
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        api.errorRate > 5 ? "text-red-500" : api.errorRate > 1 ? "text-yellow-500" : "text-green-500"
                      }
                    >
                      {api.errorRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress
                        value={api.uptime}
                        className="h-2 w-16"
                        indicatorClassName={
                          api.uptime < 95 ? "bg-red-500" : api.uptime < 99 ? "bg-yellow-500" : "bg-green-500"
                        }
                      />
                      <span>{api.uptime}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {api.lastChecked.toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

