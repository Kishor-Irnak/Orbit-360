"use client";

import {
  User,
  Monitor,
  Layers,
  Shield,
  Clock,
  Globe,
  Layout,
  Webhook,
  Key,
  Palette,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-8 pt-0 max-w-6xl mx-auto w-full relative">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preference for Orbit 360 platform.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 rounded-xl max-w-[400px]">
          <TabsTrigger
            value="profile"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="display"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Monitor className="mr-2 h-4 w-4" />
            Display
          </TabsTrigger>
          <TabsTrigger
            value="apps"
            className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Layers className="mr-2 h-4 w-4" />
            Apps
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
                        <AvatarFallback className="text-xl bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                          KI
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                      <h4 className="font-semibold text-lg">Kishor Irnak</h4>
                      <p className="text-sm text-muted-foreground">
                        Admin • Evoc Labs
                      </p>
                      <div className="flex gap-2 pt-2 justify-center md:justify-start">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg px-4"
                        >
                          Change Photo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input
                        id="fullname"
                        defaultValue="Kishor Irnak"
                        className="rounded-xl h-11 border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        defaultValue="kishorirnak@gmail.com"
                        className="rounded-xl h-11 border-slate-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your password and security.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl">
                    <div className="space-y-0.5">
                      <Label className="text-base font-semibold">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-600" />
                  </div>
                  <div className="pt-2 flex flex-col gap-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <Shield className="mr-2 h-4 w-4" /> Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* GLOBAL DASHBOARD SETTINGS */}
          <TabsContent value="display" className="space-y-6">
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
                    <Label className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-slate-400" /> Timezone
                    </Label>
                    <Select defaultValue="ist">
                      <SelectTrigger className="h-11 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-2xl">
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
                    <Label className="flex items-center gap-2 font-medium">
                      <Globe className="h-4 w-4 text-slate-400" /> Default
                      Currency
                    </Label>
                    <Select defaultValue="inr">
                      <SelectTrigger className="h-11 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-2xl">
                        <SelectItem value="inr">INR (₹) Rupee</SelectItem>
                        <SelectItem value="usd">USD ($) Dollar</SelectItem>
                        <SelectItem value="eur">EUR (€) Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* INTEGRATIONS */}
          <TabsContent value="apps" className="space-y-6">
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
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                        <Webhook className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Shopify Webhook</h4>
                        <p className="text-xs text-muted-foreground">
                          Receiving: New Orders, Inventory Sync
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Manage
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full mt-2 h-11 rounded-xl border-dashed"
                  variant="outline"
                >
                  Add New Integration +
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-end gap-3 pt-6 border-t mt-6">
        <Button variant="ghost" className="rounded-xl px-6">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="px-8 h-11 rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 text-white border-none font-bold"
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
