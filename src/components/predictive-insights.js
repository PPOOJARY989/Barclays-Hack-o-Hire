"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Calendar,
  Clock,
  Gauge,
  LineChart,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PredictiveInsights() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative h-16 w-16"
          >
            <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-xl font-semibold text-primary"
          >
            <Sparkles className="h-5 w-5" />
            <span>Training AI Models</span>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <Tabs defaultValue="predictions">
        <TabsList className="mb-4">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="mt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="overflow-hidden">
                <CardHeader className="bg-amber-500/10 pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-amber-500">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Potential Service Degradation</span>
                      </CardTitle>
                      <CardDescription>Predicted in next 4 hours</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/20 text-amber-500">
                      Medium Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Affected Services</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                          <span>Payment API</span>
                          <Badge>85% Confidence</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                          <span>Checkout Service</span>
                          <Badge>72% Confidence</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Prediction Basis</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-amber-500" />
                          <span>Increasing response time pattern detected</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-amber-500" />
                          <span>Database connection pool nearing capacity</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-amber-500" />
                          <span>Historical pattern matches previous incidents</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50">
                  <Button variant="outline" className="w-full gap-1">
                    <span>View Detailed Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>Cross-Environment Impact Analysis</span>
                  </CardTitle>
                  <CardDescription>Predicted service dependencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-3">
                      <h4 className="mb-2 font-medium">Payment Service Degradation Impact</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Checkout Flow</span>
                            <span className="font-medium text-red-500">High Impact</span>
                          </div>
                          <Progress value={85} className="h-2" indicatorClassName="bg-red-500" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Order Processing</span>
                            <span className="font-medium text-amber-500">Medium Impact</span>
                          </div>
                          <Progress value={60} className="h-2" indicatorClassName="bg-amber-500" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>User Experience</span>
                            <span className="font-medium text-red-500">High Impact</span>
                          </div>
                          <Progress value={90} className="h-2" indicatorClassName="bg-red-500" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Environment Propagation</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">AWS Cloud</Badge>
                            <span>Primary Impact</span>
                          </div>
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Azure Cloud</Badge>
                            <span>Secondary Impact</span>
                          </div>
                          <TrendingDown className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  <span>Detected Patterns</span>
                </CardTitle>
                <CardDescription>AI-identified patterns across environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-lg font-medium">Daily Traffic Pattern</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      The system has detected consistent traffic patterns with peak loads occurring between 2-4 PM UTC
                      across all environments. This pattern is most pronounced in the AWS and Azure environments.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/10">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Recurring Pattern</span>
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-lg font-medium">Cross-Environment Latency</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      API calls that traverse from on-premises to cloud environments show a consistent 15-20% increase
                      in latency compared to calls that stay within the same environment.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/10">
                        <Gauge className="mr-1 h-3 w-3" />
                        <span>Performance Pattern</span>
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-lg font-medium">Error Cascades</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      When the Payment API experiences errors above 2%, there is a 78% probability that the Order
                      Processing API will experience increased errors within 15 minutes.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        <span>Critical Pattern</span>
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>AI Recommendations</span>
                </CardTitle>
                <CardDescription>Suggested actions based on predictive analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-medium text-amber-500">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Immediate Action Recommended</span>
                    </h3>
                    <p className="mb-3 text-sm">
                      Increase the database connection pool for the Payment Service by 30% to prevent the predicted
                      service degradation in the next 4 hours.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="gap-1">
                        <span>Apply Recommendation</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-lg font-medium">Optimize Cross-Environment Communication</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Implement caching for frequently accessed data that is shared between on-premises and cloud
                      environments to reduce cross-environment latency by an estimated 40%.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <span>View Implementation Plan</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-lg font-medium">Implement Circuit Breaker Pattern</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Add circuit breakers between Payment API and Order Processing to prevent error cascades. This
                      could reduce system-wide impact during partial outages by up to 65%.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <span>View Implementation Plan</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-lg font-medium">Auto-Scaling Configuration</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Adjust auto-scaling policies to begin scaling 30 minutes before predicted peak loads at 2 PM UTC
                      based on identified traffic patterns.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <span>View Implementation Plan</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


