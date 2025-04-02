"use client"

import { motion } from "framer-motion"
import { ArrowRight, Cloud, Network, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/page-header"

export function Environments() {
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

  const environments = [
    {
      name: "AWS Cloud",
      icon: Cloud,
      color: "text-blue-500",
      apiCount: 18,
      percentage: 42,
      status: "healthy",
      regions: ["us-east-1", "eu-west-1", "ap-southeast-1"],
    },
    {
      name: "Azure Cloud",
      icon: Cloud,
      color: "text-purple-500",
      apiCount: 12,
      percentage: 28,
      status: "healthy",
      regions: ["eastus", "westeurope", "southeastasia"],
    },
    {
      name: "On-Premises",
      icon: Server,
      color: "text-orange-500",
      apiCount: 8,
      percentage: 19,
      status: "degraded",
      regions: ["dc-east", "dc-west"],
    },
    {
      name: "GCP Cloud",
      icon: Cloud,
      color: "text-green-500",
      apiCount: 4,
      percentage: 11,
      status: "healthy",
      regions: ["us-central1", "europe-west1"],
    },
  ]

  return (
    <div className="flex-1 overflow-auto bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Environments"
          description="Monitor APIs across different hosting environments"
          icon={<Network className="h-6 w-6 text-primary" />}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {environments.map((env, index) => (
            <motion.div key={env.name} variants={item}>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">{env.name}</CardTitle>
                  <env.icon className={`h-5 w-5 ${env.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">API Count</span>
                        <span className="text-xl font-bold">{env.apiCount}</span>
                      </div>
                      <Progress value={env.percentage} className="h-2" />
                      <div className="mt-1 text-xs text-muted-foreground text-right">{env.percentage}% of total</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge
                        className={
                          env.status === "healthy"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }
                      >
                        {env.status === "healthy" ? "Healthy" : "Degraded"}
                      </Badge>
                    </div>

                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">Regions</div>
                      <div className="flex flex-wrap gap-1">
                        {env.regions.map((region) => (
                          <Badge key={region} variant="outline" className="text-xs">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-4 py-2">
                  <Button variant="ghost" size="sm" className="w-full gap-1">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cross-Environment API Calls</CardTitle>
                  <CardDescription>API calls that traverse multiple environments</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Cross-environment API call data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

