"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Filter, Plus, Search, Shield, Trash, User, UserPlus, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PageHeader } from "@/components/page-header"

export function Admin() {
  const [activeTab, setActiveTab] = useState("users")

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

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastActive: "5 minutes ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Analyst",
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Viewer",
      status: "inactive",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Analyst",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "Viewer",
      status: "active",
      lastActive: "30 minutes ago",
    },
  ]

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="h-full w-full p-6">
        <PageHeader
          title="Admin Panel"
          description="Manage users, roles, and system settings"
          icon={<Shield className="h-6 w-6 text-primary" />}
        />
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList className="w-full max-w-[600px]">
              <TabsTrigger value="users" className="flex gap-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex gap-2">
                <Shield className="h-4 w-4" />
                <span>Roles & Permissions</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex gap-2">
                <Shield className="h-4 w-4" />
                <span>System Settings</span>
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex gap-2">
                <Shield className="h-4 w-4" />
                <span>Audit Logs</span>
              </TabsTrigger>
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

          <motion.div variants={container} initial="hidden" animate="show">
            <TabsContent value="users" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>Manage system users and their access</CardDescription>
                      </div>
                      <Button className="gap-1">
                        <UserPlus className="h-4 w-4" />
                        <span>Add User</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Last Active</th>
                            <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-b"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
                                  ></div>
                                  <span className="text-sm capitalize">{user.status}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastActive}</td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <User className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-between">
                    <div className="text-sm text-muted-foreground">Showing 5 of 5 users</div>
                    <Button variant="outline" size="sm">
                      Load More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="roles" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Roles & Permissions</CardTitle>
                        <CardDescription>Manage user roles and their permissions</CardDescription>
                      </div>
                      <Button className="gap-1">
                        <Plus className="h-4 w-4" />
                        <span>Add Role</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-md border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">Admin</h3>
                            <p className="text-sm text-muted-foreground">Full system access</p>
                          </div>
                          <Badge>3 Users</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">View Dashboard</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Manage Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Manage Roles</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Configure System</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">View Audit Logs</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Manage API Settings</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">Analyst</h3>
                            <p className="text-sm text-muted-foreground">Can view and analyze data</p>
                          </div>
                          <Badge>2 Users</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">View Dashboard</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">View Analytics</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Export Reports</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">Viewer</h3>
                            <p className="text-sm text-muted-foreground">Read-only access</p>
                          </div>
                          <Badge>2 Users</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">View Dashboard</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">View Reports</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="system" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure global system settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Monitoring</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Anomaly detection sensitivity</Label>
                          </div>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select sensitivity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enable-ai">Enable AI predictions</Label>
                            <p className="text-sm text-muted-foreground">Use AI to predict potential issues</p>
                          </div>
                          <Switch id="enable-ai" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Retention</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Log retention period</Label>
                          </div>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Metrics retention period</Label>
                          </div>
                          <Select defaultValue="90">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                              <SelectItem value="730">2 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-end">
                    <Button className="gap-1">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="audit" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>System activity and user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] flex items-center justify-center">
                      <p className="text-muted-foreground">Audit logs will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

function Save(props) {
  return <Check {...props} />
}

