"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Bell, CheckCircle, Filter, Info, Search, Settings } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"

export function Notifications() {
  const [activeTab, setActiveTab] = useState("all")

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

  const notifications = [
    {
      id: 1,
      title: "Payment API Response Time Anomaly",
      description: "300% increase in the last 5 minutes",
      time: "5 minutes ago",
      type: "alert",
      read: false,
      service: "payment-service",
      environment: "production-cloud",
    },
    {
      id: 2,
      title: "User Auth Error Rate Increased",
      description: "Error rate increased to 5.2%",
      time: "32 minutes ago",
      type: "alert",
      read: false,
      service: "auth-service",
      environment: "production-aws",
    },
    {
      id: 3,
      title: "Scheduled Maintenance Completed",
      description: "Database maintenance completed successfully",
      time: "1 hour ago",
      type: "info",
      read: true,
      service: "database",
      environment: "all",
    },
    {
      id: 4,
      title: "New API Version Deployed",
      description: "Product Catalog API v2.3 deployed successfully",
      time: "3 hours ago",
      type: "success",
      read: true,
      service: "catalog-service",
      environment: "staging",
    },
    {
      id: 5,
      title: "Weekly Performance Report",
      description: "Your weekly API performance report is available",
      time: "1 day ago",
      type: "info",
      read: true,
      service: "system",
      environment: "all",
    },
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab)

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="h-full w-full p-6">
        <PageHeader
          title="Notifications"
          description="System alerts and important updates"
          icon={<Bell className="h-6 w-6 text-primary" />}
          badge={{
            count: notifications.filter((n) => !n.read).length,
            label: "Unread",
            variant: "secondary",
          }}
        />
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="alert">Alerts</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
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
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="divide-y">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                            className={`flex cursor-pointer gap-4 p-4 transition-colors ${!notification.read ? "bg-muted/50" : ""}`}
                          >
                            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1">
                              <div className="mb-1 flex items-start justify-between">
                                <h4 className="font-medium">{notification.title}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {notification.time}
                                  </Badge>
                                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{notification.description}</p>
                              <div className="mt-2 flex gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {notification.service}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {notification.environment}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex h-40 items-center justify-center">
                          <p className="text-muted-foreground">No notifications found</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-between">
                  <Button variant="outline" size="sm">
                    Mark All as Read
                  </Button>
                  <Button variant="ghost" size="sm">
                    Clear All
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}

