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
  Shield,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function Sidebar() {
  const pathname = usePathname()
  const [alertCount, setAlertCount] = useState(3)
  const { toast } = useToast()

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

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  }

  // Handle notification click
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 5 unread notifications",
    })
  }

  return (
    <ShadcnSidebar className="bg-[#000D1C]">
      <SidebarHeader className="flex items-center justify-between px-4 py-3 bg-[#000D1C]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-primary"
          >
            <Activity className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-bold">API Monitor</span>
        </motion.div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarSeparator className="bg-gray-700" />

      <SidebarContent className="bg-[#000D1C]">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item, index) => (
                <motion.div key={item.name} custom={index} initial="hidden" animate="visible" variants={itemVariants}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                      <Link href={item.href} className="transition-all duration-200 hover:translate-x-1">
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
                  custom={index + 6} // Continue index from previous section
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                      <Link href={item.href} className="transition-all duration-200 hover:translate-x-1">
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
        <SidebarSeparator className="bg-gray-700" />
        <div className="p-2">
          <SidebarMenu>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Notifications">
                  <Link href="/notifications" className="transition-all duration-200 hover:translate-x-1">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                    <Badge className="ml-auto" variant="secondary">
                      5
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/settings" className="transition-all duration-200 hover:translate-x-1">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Admin">
                  <Link href="/admin" className="transition-all duration-200 hover:translate-x-1">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </motion.div>
          </SidebarMenu>
        </div>
        <SidebarSeparator />
        <div className="p-2">
          <SidebarMenu>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex w-full items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col text-left">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">System Admin</span>
                    </div>
                    <LogOut className="h-4 w-4 text-muted-foreground" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </motion.div>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

