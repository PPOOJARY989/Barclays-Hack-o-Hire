"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Cloud,
  Database,
  Gauge,
  Home,
  Layers,
  LineChart,
  LogOut,
  Network,
  Settings,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const [alertCount, setAlertCount] = useState(3)

  const mainNavItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "API Overview", href: "/apis", icon: Network },
    { name: "Anomaly Detection", href: "/anomalies", icon: AlertTriangle },
    { name: "Logs Explorer", href: "/logs", icon: Database },
    { name: "Metrics", href: "/metrics", icon: LineChart },
    { name: "Environments", href: "/environments", icon: Cloud },
  ]

  const insightNavItems = [
    { name: "Predictions", href: "/predictions", icon: Sparkles },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Performance", href: "/performance", icon: Gauge },
    { name: "Service Map", href: "/service-map", icon: Layers },
  ]

  const isActive = (path) => pathname === path

  return (
    <ShadcnSidebar className="bg-[#000D1C]">
      <SidebarHeader className="flex items-center justify-between px-4 py-3 bg-[#000D1C]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">API Monitor</span>
        </motion.div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarSeparator className="bg-[#001A35]" />

      <SidebarContent className="bg-[#000D1C]">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.name === "Anomaly Detection" && alertCount > 0 && (
                      <Badge variant="destructive" className="absolute right-2 top-1/2 -translate-y-1/2">
                        {alertCount}
                      </Badge>
                    )}
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel>Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {insightNavItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto bg-[#000D1C]">
        <SidebarSeparator />
        <div className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Notifications">
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                  <Badge className="ml-auto" variant="secondary">
                    5
                  </Badge>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
        <SidebarSeparator />
        <div className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex w-full items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col text-left">
                    <span className="text-sm font-medium">Pawan Poojary</span>
                    <span className="text-xs text-muted-foreground">System Admin</span>
                  </div>
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

