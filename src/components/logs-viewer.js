"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Filter, Info, Search, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export function LogsViewer() {
  const [logs, setLogs] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Generate sample logs
    const logTypes = ["info", "warning", "error", "success"]
    const services = ["auth-service", "payment-service", "catalog-service", "user-service", "order-service"]
    const environments = ["production-aws", "production-azure", "staging-gcp", "production-onprem"]
    const messages = [
      "API request completed",
      "Database query executed",
      "Authentication successful",
      "Rate limit exceeded",
      "Connection timeout",
      "Invalid request parameters",
      "Cache miss",
      "Service unavailable",
      "Request validation failed",
      "Response time threshold exceeded",
    ]

    const generateLog = (index) => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      const environment = environments[Math.floor(Math.random() * environments.length)]
      const message = messages[Math.floor(Math.random() * messages.length)]
      const timestamp = new Date(Date.now() - index * 60000 * Math.random() * 10)

      return {
        id: `log-${index}`,
        type,
        service,
        environment,
        message: `${message} (${service})`,
        timestamp,
        details: {
          requestId: `req-${Math.random().toString(36).substring(2, 10)}`,
          statusCode: type === "error" ? 500 : type === "warning" ? 429 : 200,
          duration: Math.floor(Math.random() * 1000),
          path: `/api/${service.split("-")[0]}/${Math.random().toString(36).substring(2, 6)}`,
        },
      }
    }

    const sampleLogs = Array.from({ length: 50 }, (_, i) => generateLog(i))
    setLogs(sampleLogs)

    // Add new logs periodically
    const interval = setInterval(() => {
      setLogs((prevLogs) => [generateLog(0), ...prevLogs.slice(0, 49)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.type === filter)

  const getLogIcon = (type) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search logs..." className="pl-8" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All logs</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warnings</SelectItem>
            <SelectItem value="error">Errors</SelectItem>
            <SelectItem value="success">Success</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Modified ScrollArea section */}
      <div className="flex-1 overflow-hidden rounded-md border">
        <ScrollArea className="h-full">
          <div className="space-y-1 p-1">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index === 0 ? 0 : 0 }}
                className="group flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm hover:bg-muted"
              >
                <div className="flex w-6 items-center justify-center">{getLogIcon(log.type)}</div>
                <div className="flex-1 truncate">
                  <span className="font-medium">{log.message}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="hidden group-hover:inline-flex">
                    {log.service}
                  </Badge>
                  <Badge variant="secondary" className="hidden group-hover:inline-flex">
                    {log.environment}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

