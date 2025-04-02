"use client"

import { motion } from "framer-motion"
import { Database, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { LogsViewer } from "@/components/logs-viewer"

export function LogsExplorer() {
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
          title="Logs Explorer"
          description="Search and analyze logs from all environments"
          icon={<Database className="h-6 w-6 text-primary" />}
        />

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Real-time Logs</CardTitle>
                    <CardDescription>Live logs from all environments and services</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Environments</SelectItem>
                        <SelectItem value="aws">AWS</SelectItem>
                        <SelectItem value="azure">Azure</SelectItem>
                        <SelectItem value="gcp">GCP</SelectItem>
                        <SelectItem value="onprem">On-Premises</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="auth">Authentication</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="catalog">Catalog</SelectItem>
                        <SelectItem value="order">Order</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <LogsViewer />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 50 of 10,243 logs</div>
                <Button variant="outline">Load More</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

