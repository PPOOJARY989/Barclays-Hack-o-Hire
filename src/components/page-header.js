"use client"

import { motion } from "framer-motion"
import { Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PageHeader({ title, description, icon, badge, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10"
          >
            {icon}
          </motion.div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <motion.h1
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight"
            >
              {title}
            </motion.h1>
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Badge variant={badge.variant || "default"}>
                  {badge.count && <span className="mr-1">{badge.count}</span>}
                  {badge.label}
                </Badge>
              </motion.div>
            )}
          </div>
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-muted-foreground"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex items-center gap-2"
      >
        {actions ? (
          actions
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

