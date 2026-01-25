"use client";

import {
  User,
  Bell,
  Monitor,
  Briefcase,
  Layers,
  Palette,
  Shield,
  CreditCard,
  Mail,
  Smartphone,
  Globe,
  Clock,
  Layout,
  Target,
  Webhook,
  Key,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-8 pt-0 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preference for Orbit 360 platform.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="profile"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifs
          </TabsTrigger>
          <TabsTrigger
            value="dashboard"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Monitor className="mr-2 h-4 w-4" />
            Display
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Business
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Layers className="mr-2 h-4 w-4" />
            Apps
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Palette className="mr-2 h-4 w-4" />
            Design
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-6">
          {/* USER PROFILE & ACCOUNT */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6">
              <Card className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>
                    Your personal information and identity on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                      <Avatar className="h-24 w-24 border-4 border-background shadow-lg group-hover:opacity-80 transition-opacity">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xl bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                          KI
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-md bg-background"
                      >
                        <Palette className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                      <h4 className="font-semibold text-lg">Kishor Irnak</h4>
                      <p className="text-sm text-muted-foreground">
                        Admin • Evoc Labs
                      </p>
                      <div className="flex gap-2 pt-2 justify-center md:justify-start">
                        <Button size="sm">Change Photo</Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input id="fullname" defaultValue="Kishor Irnak" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="kishorirnak@gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Workspace Role</Label>
                      <Select defaultValue="admin">
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] text-muted-foreground flex items-center">
                        <Shield className="mr-1 h-3 w-3" />
                        Admin has full access to all modules and configurations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Security & Privacy</CardTitle>
                  <CardDescription>
                    Manage your password and authentication methods.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive an email every time someone logs into your
                        account.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="pt-4">
                    <Button variant="outline">Change Password</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* NOTIFICATION PREFERENCES */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Logistics & Sales Alerts</CardTitle>
                <CardDescription>
                  Configure automated alerts for your operational metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">
                      Low Inventory Threshold
                    </Label>
                    <span className="text-sm font-bold text-orange-500">
                      10 items
                    </span>
                  </div>
                  <Slider defaultValue={[10]} max={100} step={5} />
                  <p className="text-xs text-muted-foreground">
                    Alert me when any product stock goes below this number.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">
                      Critical ROAS Alert
                    </Label>
                    <span className="text-sm font-bold text-orange-500">
                      2.5x
                    </span>
                  </div>
                  <Slider defaultValue={[2.5]} max={10} step={0.1} />
                  <p className="text-xs text-muted-foreground">
                    Alert me if Marketing ROAS falls below this target.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Delivery Channels</h4>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                          <Mail className="h-4 w-4" />
                        </div>
                        <Label>Email Notifications</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <Label>Push App Notifications</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Summaries</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a performance digest delivered every Monday morning.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GLOBAL DASHBOARD SETTINGS */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Localization & View</CardTitle>
                <CardDescription>
                  Set your regional preferences and default landing view.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />{" "}
                      Timezone
                    </Label>
                    <Select defaultValue="ist">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">
                          India (IST) GMT+5:30
                        </SelectItem>
                        <SelectItem value="est">
                          New York (EST) GMT-5:00
                        </SelectItem>
                        <SelectItem value="utc">
                          Universal Time (UTC)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />{" "}
                      Default Currency
                    </Label>
                    <Select defaultValue="inr">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">INR (₹) Rupee</SelectItem>
                        <SelectItem value="usd">USD ($) Dollar</SelectItem>
                        <SelectItem value="eur">EUR (€) Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Display Format</Label>
                    <RadioGroup
                      defaultValue="dd-mm-yyyy"
                      className="flex flex-col gap-2 mt-2"
                    >
                      <div className="flex items-center space-x-2 p-2 rounded-lg border bg-background/50">
                        <RadioGroupItem value="dd-mm-yyyy" id="d1" />
                        <Label
                          htmlFor="d1"
                          className="flex-1 cursor-pointer font-normal"
                        >
                          DD / MM / YYYY (e.g., 25/01/2026)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-lg border bg-background/50">
                        <RadioGroupItem value="mm-dd-yyyy" id="d2" />
                        <Label
                          htmlFor="d2"
                          className="flex-1 cursor-pointer font-normal"
                        >
                          MM / DD / YYYY (e.g., 01/25/2026)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Layout className="h-4 w-4 text-muted-foreground" />{" "}
                      Landing Page
                    </Label>
                    <Select defaultValue="dashboard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select home page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">
                          Main Dashboard
                        </SelectItem>
                        <SelectItem value="orders">Orders List</SelectItem>
                        <SelectItem value="tracking">
                          Logistics Tracking
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground pt-1">
                      The first page you see after logging in.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BUSINESS & LOGISTICS LOGIC */}
          <TabsContent value="business" className="space-y-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Analytic Rules</CardTitle>
                <CardDescription>
                  Define the logic behind your marketing and logistics metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Marketing Attribution Model</Label>
                  <RadioGroup
                    defaultValue="last-click"
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                  >
                    <div className="flex flex-col items-start gap-2 p-4 rounded-xl border bg-background/50 hover:bg-background/80 transition-colors">
                      <RadioGroupItem value="last-click" id="attrib-last" />
                      <Label htmlFor="attrib-last" className="font-semibold">
                        Last Click
                      </Label>
                      <p className="text-[10px] text-muted-foreground">
                        Credit goes to the final touchpoint before purchase.
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 p-4 rounded-xl border bg-background/50 hover:bg-background/80 transition-colors">
                      <RadioGroupItem value="first-click" id="attrib-first" />
                      <Label htmlFor="attrib-first" className="font-semibold">
                        First Click
                      </Label>
                      <p className="text-[10px] text-muted-foreground">
                        Credit goes to the very first interaction.
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 p-4 rounded-xl border bg-background/50 hover:bg-background/80 transition-colors">
                      <RadioGroupItem value="linear" id="attrib-linear" />
                      <Label htmlFor="attrib-linear" className="font-semibold">
                        Linear
                      </Label>
                      <p className="text-[10px] text-muted-foreground">
                        Credit is split equally across all touchpoints.
                      </p>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 font-semibold">
                      <Target className="h-4 w-4 text-orange-500" /> Revenue
                      Targets
                    </Label>
                    <div className="space-y-2">
                      <Label htmlFor="rev-target" className="text-xs">
                        Monthly Revenue Goal (₹)
                      </Label>
                      <Input
                        id="rev-target"
                        type="number"
                        defaultValue="5000000"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 font-semibold">
                      <Clock className="h-4 w-4 text-orange-500" /> Logistics
                      Windows
                    </Label>
                    <div className="space-y-2">
                      <Label htmlFor="return-window" className="text-xs">
                        Standard Return Window (Days)
                      </Label>
                      <Input
                        id="return-window"
                        type="number"
                        defaultValue="30"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* INTEGRATIONS */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>External Data Sources</CardTitle>
                <CardDescription>
                  Manage APIs and webhooks that feed data into Orbit 360.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                        <Key className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Meta Ads API</h4>
                        <p className="text-xs text-muted-foreground italic">
                          Connected as: evoc_marketing_pro
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600">
                        <Webhook className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Shopify Webhook</h4>
                        <p className="text-xs text-muted-foreground">
                          Receiving: New Orders, Inventory Sync
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
                <Button className="w-full mt-2" variant="ghost">
                  Add New Integration +
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* APPEARANCE & UI */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Visual Theme</CardTitle>
                <CardDescription>
                  Personalize the look and feel of your Orbit 360 workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Label>Accent Color</Label>
                  <div className="flex gap-4">
                    <button className="h-8 w-8 rounded-full bg-orange-500 ring-2 ring-orange-500 ring-offset-2 ring-offset-background" />
                    <button className="h-8 w-8 rounded-full bg-blue-500 opacity-60 hover:opacity-100 transition-opacity" />
                    <button className="h-8 w-8 rounded-full bg-purple-500 opacity-60 hover:opacity-100 transition-opacity" />
                    <button className="h-8 w-8 rounded-full bg-green-500 opacity-60 hover:opacity-100 transition-opacity" />
                    <button className="h-8 w-8 rounded-full bg-rose-500 opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Density Mode</Label>
                  <RadioGroup
                    defaultValue="comfortable"
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg border bg-background/50">
                      <RadioGroupItem value="comfortable" id="m1" />
                      <Label htmlFor="m1" className="flex-1 cursor-pointer">
                        Default (Comfortable)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border bg-background/50">
                      <RadioGroupItem value="compact" id="m2" />
                      <Label htmlFor="m2" className="flex-1 cursor-pointer">
                        Compact (High density)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-collapse Sidebar</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize the sidebar automatically to save screen space.
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-end gap-3 pt-6 border-t mt-6">
        <Button variant="ghost">Cancel</Button>
        <Button className="px-8 shadow-lg shadow-orange-500/20">
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
