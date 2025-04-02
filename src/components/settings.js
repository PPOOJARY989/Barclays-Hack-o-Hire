"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Clock, Globe, Moon, Save, SettingsIcon, Sun, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/page-header"
import { useToast } from "@/hooks/use-toast"

export function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

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

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="h-full w-full p-6">
        <PageHeader
          title="Settings"
          description="Configure your monitoring dashboard preferences"
          icon={<SettingsIcon className="h-6 w-6 text-primary" />}
        />

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="general" className="flex gap-2">
                <Globe className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex gap-2">
                <Sun className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            <TabsContent value="general" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Configure general dashboard settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Refresh</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-refresh">Auto-refresh dashboard</Label>
                            <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                          </div>
                          <Switch id="auto-refresh" defaultChecked />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="refresh-interval">Refresh interval</Label>
                          <Select defaultValue="30">
                            <SelectTrigger id="refresh-interval">
                              <SelectValue placeholder="Select interval" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">Every 10 seconds</SelectItem>
                              <SelectItem value="30">Every 30 seconds</SelectItem>
                              <SelectItem value="60">Every minute</SelectItem>
                              <SelectItem value="300">Every 5 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Time Zone</h3>
                      <div className="grid gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="timezone">Dashboard time zone</Label>
                          <Select defaultValue="utc">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select time zone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="local">Local Browser Time</SelectItem>
                              <SelectItem value="utc">UTC</SelectItem>
                              <SelectItem value="est">Eastern Time (ET)</SelectItem>
                              <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground">
                            All timestamps will be displayed in the selected time zone
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Default View</h3>
                      <div className="grid gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="default-view">Default dashboard view</Label>
                          <Select defaultValue="overview">
                            <SelectTrigger id="default-view">
                              <SelectValue placeholder="Select default view" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="overview">Overview</SelectItem>
                              <SelectItem value="apis">API Overview</SelectItem>
                              <SelectItem value="anomalies">Anomaly Detection</SelectItem>
                              <SelectItem value="logs">Logs Explorer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Theme mode</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <Sun className="h-4 w-4" />
                              <span>Light</span>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Moon className="h-4 w-4" />
                              <span>Dark</span>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Clock className="h-4 w-4" />
                              <span>System</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Animations</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enable-animations">Enable animations</Label>
                            <p className="text-sm text-muted-foreground">
                              Toggle UI animations throughout the dashboard
                            </p>
                          </div>
                          <Switch id="enable-animations" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Density</h3>
                      <div className="grid gap-4">
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="ui-density">UI density</Label>
                          <Select defaultValue="comfortable">
                            <SelectTrigger id="ui-density">
                              <SelectValue placeholder="Select density" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="comfortable">Comfortable</SelectItem>
                              <SelectItem value="compact">Compact</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground">
                            Controls the spacing and density of UI elements
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Preferences</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="browser-notifications">Browser notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                          </div>
                          <Switch id="browser-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="slack-notifications">Slack notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications in Slack</p>
                          </div>
                          <Switch id="slack-notifications" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="anomaly-alerts">Anomaly alerts</Label>
                            <p className="text-sm text-muted-foreground">Notifications for detected anomalies</p>
                          </div>
                          <Switch id="anomaly-alerts" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="system-notifications">System notifications</Label>
                            <p className="text-sm text-muted-foreground">Notifications about system events</p>
                          </div>
                          <Switch id="system-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="report-notifications">Report notifications</Label>
                            <p className="text-sm text-muted-foreground">Notifications about generated reports</p>
                          </div>
                          <Switch id="report-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Information</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" defaultValue="Doe" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current password</Label>
                          <Input id="current-password" type="password" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-end">
                    <Button onClick={handleSave} className="gap-1">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}

