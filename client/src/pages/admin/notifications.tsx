
import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Send, 
  Users, 
  Mail, 
  MessageSquare, 
  Settings,
  Plus,
  Eye,
  Trash2,
  Edit
} from "lucide-react"

const notificationStats = [
  { title: "Total Sent", value: "12,847", change: "+18.2%", icon: Send },
  { title: "Active Campaigns", value: "8", change: "+2", icon: Bell },
  { title: "Subscribers", value: "2,847", change: "+12.5%", icon: Users },
  { title: "Open Rate", value: "68.4%", change: "+3.2%", icon: Mail },
]

const recentNotifications = [
  {
    id: "NOT001",
    title: "Welcome New Players Bonus",
    type: "promotional",
    recipients: 1247,
    sent: "2024-01-15 14:30",
    status: "sent",
    openRate: "72.3%"
  },
  {
    id: "NOT002",
    title: "System Maintenance Notice",
    type: "system",
    recipients: 2847,
    sent: "2024-01-15 12:00",
    status: "sent",
    openRate: "89.1%"
  },
  {
    id: "NOT003",
    title: "Spin Wheel Weekend Special",
    type: "promotional",
    recipients: 1854,
    sent: "2024-01-14 09:00",
    status: "sent",
    openRate: "65.8%"
  },
  {
    id: "NOT004",
    title: "Account Security Update",
    type: "security",
    recipients: 2847,
    sent: "2024-01-13 16:45",
    status: "sent",
    openRate: "91.2%"
  },
]

const notificationTemplates = [
  { id: 1, name: "Welcome Message", type: "onboarding", lastUsed: "2024-01-15" },
  { id: 2, name: "Deposit Confirmation", type: "transactional", lastUsed: "2024-01-15" },
  { id: 3, name: "Withdrawal Success", type: "transactional", lastUsed: "2024-01-14" },
  { id: 4, name: "Game Win Notification", type: "engagement", lastUsed: "2024-01-14" },
  { id: 5, name: "Promotional Offer", type: "promotional", lastUsed: "2024-01-13" },
]

export default function AdminNotifications() {
  const [notificationType, setNotificationType] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'promotional':
        return <Badge className="bg-purple-100 text-purple-800">Promotional</Badge>
      case 'system':
        return <Badge className="bg-blue-100 text-blue-800">System</Badge>
      case 'security':
        return <Badge className="bg-red-100 text-red-800">Security</Badge>
      case 'transactional':
        return <Badge className="bg-green-100 text-green-800">Transactional</Badge>
      case 'engagement':
        return <Badge className="bg-orange-100 text-orange-800">Engagement</Badge>
      case 'onboarding':
        return <Badge className="bg-cyan-100 text-cyan-800">Onboarding</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Notifications" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Management</h1>
            <p className="text-muted-foreground">
              Create, send, and manage user notifications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Notification
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {notificationStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="sent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sent">Sent Notifications</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="sent" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={notificationType} onValueChange={setNotificationType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="transactional">Transactional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>History of sent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.title}</TableCell>
                        <TableCell>{getTypeBadge(notification.type)}</TableCell>
                        <TableCell>{notification.recipients.toLocaleString()}</TableCell>
                        <TableCell>{notification.sent}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell>{notification.openRate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Templates</CardTitle>
                <CardDescription>Manage reusable notification templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {notificationTemplates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>{getTypeBadge(template.type)}</div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Last used: {template.lastUsed}
                        </p>
                        <Button className="w-full mt-4" variant="outline">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Notification</CardTitle>
                <CardDescription>Send a notification to your users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Notification Title</Label>
                      <Input id="title" placeholder="Enter notification title" />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="transactional">Transactional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="active">Active Users</SelectItem>
                          <SelectItem value="new">New Users</SelectItem>
                          <SelectItem value="vip">VIP Users</SelectItem>
                          <SelectItem value="inactive">Inactive Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="template">Use Template (Optional)</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {notificationTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id.toString()}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="schedule">Schedule</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Send now or schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Send Now</SelectItem>
                          <SelectItem value="schedule">Schedule for Later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email" />
                      <Label htmlFor="email">Send via Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="push" />
                      <Label htmlFor="push">Send Push Notification</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Enter your notification message..." 
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline">Save as Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>Configure email notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailEnabled">Enable Email Notifications</Label>
                    <Switch id="emailEnabled" defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input id="fromEmail" defaultValue="noreply@ashokgaming.com" />
                  </div>
                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input id="fromName" defaultValue="Ashok Gaming" />
                  </div>
                  <Button>Save Email Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notification Settings</CardTitle>
                  <CardDescription>Configure push notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushEnabled">Enable Push Notifications</Label>
                    <Switch id="pushEnabled" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="soundEnabled">Enable Sound</Label>
                    <Switch id="soundEnabled" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vibrationEnabled">Enable Vibration</Label>
                    <Switch id="vibrationEnabled" defaultChecked />
                  </div>
                  <Button>Save Push Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
