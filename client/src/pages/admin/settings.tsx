
import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Save, 
  Upload, 
  Globe, 
  Palette, 
  Database, 
  Mail,
  Bell,
  Shield,
  CreditCard,
  Users,
  RefreshCw
} from "lucide-react"

export default function AdminSettings() {
  const [siteName, setSiteName] = useState("Ashok Gaming")
  const [siteDescription, setSiteDescription] = useState("Premier gaming platform with exciting games and rewards")
  const [adminEmail, setAdminEmail] = useState("admin@ashokgaming.com")
  const [supportEmail, setSupportEmail] = useState("support@ashokgaming.com")

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
            <p className="text-muted-foreground">
              Configure system-wide settings and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Site Configuration
                  </CardTitle>
                  <CardDescription>Basic site information and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea 
                      id="siteDescription" 
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input id="siteUrl" defaultValue="https://ashokgaming.com" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Admin and support contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input 
                      id="adminEmail" 
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input 
                      id="supportEmail" 
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea 
                      id="address" 
                      defaultValue="123 Gaming Street, Casino City, GC 12345"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Site Logo</CardTitle>
                  <CardDescription>Upload and manage site branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/api/placeholder/64/64" />
                      <AvatarFallback>AG</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Logo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Recommended: 200x200px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Mode</CardTitle>
                  <CardDescription>Control site availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                    <Switch id="maintenanceMode" />
                  </div>
                  <div>
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea 
                      id="maintenanceMessage" 
                      placeholder="Site is under maintenance. We'll be back soon!"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme Settings
                  </CardTitle>
                  <CardDescription>Customize the look and feel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Default Theme</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input id="primaryColor" defaultValue="#3b82f6" type="color" className="w-16 h-10" />
                      <Input defaultValue="#3b82f6" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input id="accentColor" defaultValue="#10b981" type="color" className="w-16 h-10" />
                      <Input defaultValue="#10b981" className="flex-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="roundedCorners">Rounded Corners</Label>
                    <Switch id="roundedCorners" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Settings</CardTitle>
                  <CardDescription>Control page layout and structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="layout">Default Layout</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Width</SelectItem>
                        <SelectItem value="boxed">Boxed</SelectItem>
                        <SelectItem value="fluid">Fluid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar">Show Sidebar</Label>
                    <Switch id="sidebar" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="breadcrumbs">Show Breadcrumbs</Label>
                    <Switch id="breadcrumbs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer">Show Footer</Label>
                    <Switch id="footer" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    SMTP Configuration
                  </CardTitle>
                  <CardDescription>Email server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input id="smtpHost" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpPort">Port</Label>
                      <Input id="smtpPort" defaultValue="587" />
                    </div>
                    <div>
                      <Label htmlFor="smtpSecurity">Security</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input id="smtpUsername" type="email" />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input id="smtpPassword" type="password" />
                  </div>
                  <Button className="w-full">Test Email Configuration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Customize email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="emailTemplate">Template Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome Email</SelectItem>
                        <SelectItem value="password">Password Reset</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="emailSubject">Subject Line</Label>
                    <Input id="emailSubject" placeholder="Welcome to Ashok Gaming!" />
                  </div>
                  <div>
                    <Label htmlFor="emailContent">Email Content</Label>
                    <Textarea 
                      id="emailContent" 
                      placeholder="Enter email content..."
                      rows={6}
                    />
                  </div>
                  <Button>Save Template</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Configure notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <Switch id="smsNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slackIntegration">Slack Integration</Label>
                    <Switch id="slackIntegration" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Thresholds</CardTitle>
                  <CardDescription>Set alert thresholds for system events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="userThreshold">New Users (per hour)</Label>
                    <Input id="userThreshold" type="number" defaultValue="50" />
                  </div>
                  <div>
                    <Label htmlFor="errorThreshold">Error Rate (%)</Label>
                    <Input id="errorThreshold" type="number" defaultValue="5" />
                  </div>
                  <div>
                    <Label htmlFor="revenueThreshold">Revenue Drop (%)</Label>
                    <Input id="revenueThreshold" type="number" defaultValue="20" />
                  </div>
                  <div>
                    <Label htmlFor="loadThreshold">Server Load (%)</Label>
                    <Input id="loadThreshold" type="number" defaultValue="80" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Policies
                  </CardTitle>
                  <CardDescription>Configure security policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorRequired">Require 2FA for admins</Label>
                    <Switch id="twoFactorRequired" defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="passwordPolicy">Password Policy</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8 characters)</SelectItem>
                        <SelectItem value="medium">Medium (10 characters + symbols)</SelectItem>
                        <SelectItem value="strict">Strict (12 characters + complexity)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input id="loginAttempts" type="number" defaultValue="5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup Settings</CardTitle>
                  <CardDescription>Configure automatic backups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBackup">Enable Auto Backup</Label>
                    <Switch id="autoBackup" defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="backupRetention">Retention Period (days)</Label>
                    <Input id="backupRetention" type="number" defaultValue="30" />
                  </div>
                  <Button>Create Backup Now</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Gateways
                  </CardTitle>
                  <CardDescription>Configure payment processors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stripe">Stripe</Label>
                    <Switch id="stripe" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paypal">PayPal</Label>
                    <Switch id="paypal" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="crypto">Cryptocurrency</Label>
                    <Switch id="crypto" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bankTransfer">Bank Transfer</Label>
                    <Switch id="bankTransfer" defaultChecked />
                  </div>
                  <Button>Configure Payment Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Third-Party Services
                  </CardTitle>
                  <CardDescription>Manage external integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics">Google Analytics</Label>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="chatSupport">Live Chat Support</Label>
                    <Switch id="chatSupport" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cdn">CDN (CloudFlare)</Label>
                    <Switch id="cdn" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monitoring">Monitoring (DataDog)</Label>
                    <Switch id="monitoring" />
                  </div>
                  <Button>Manage API Keys</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
