
import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
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
  Shield, 
  AlertTriangle, 
  Lock, 
  Key, 
  Eye, 
  Ban,
  CheckCircle,
  XCircle,
  Settings,
  Download,
  RefreshCw,
  Smartphone
} from "lucide-react"

const securityStats = [
  { title: "Active Sessions", value: "1,247", change: "+5.2%", icon: Eye, status: "good" },
  { title: "Failed Logins", value: "23", change: "-12.3%", icon: XCircle, status: "warning" },
  { title: "Blocked IPs", value: "156", change: "+3", icon: Ban, status: "neutral" },
  { title: "2FA Enabled", value: "78.4%", change: "+2.1%", icon: Smartphone, status: "good" },
]

const securityEvents = [
  {
    id: "SEC001",
    type: "Failed Login",
    user: "john.doe@example.com",
    ip: "192.168.1.100",
    location: "New York, US",
    time: "2024-01-15 14:30",
    severity: "medium",
    status: "investigated"
  },
  {
    id: "SEC002",
    type: "Suspicious Activity",
    user: "jane.smith@example.com",
    ip: "10.0.0.1",
    location: "London, UK",
    time: "2024-01-15 13:45",
    severity: "high",
    status: "blocked"
  },
  {
    id: "SEC003",
    type: "Password Changed",
    user: "mike.johnson@example.com",
    ip: "172.16.0.1",
    location: "Tokyo, JP",
    time: "2024-01-15 12:20",
    severity: "low",
    status: "resolved"
  },
  {
    id: "SEC004",
    type: "Multiple Failed 2FA",
    user: "sarah.wilson@example.com",
    ip: "203.0.113.1",
    location: "Sydney, AU",
    time: "2024-01-15 11:10",
    severity: "high",
    status: "investigating"
  },
]

const blockedIPs = [
  { ip: "192.168.1.100", reason: "Brute force attack", blockedAt: "2024-01-15 14:30", status: "active" },
  { ip: "10.0.0.1", reason: "Suspicious activity", blockedAt: "2024-01-15 13:45", status: "active" },
  { ip: "172.16.0.1", reason: "Multiple failed logins", blockedAt: "2024-01-14 09:20", status: "expired" },
  { ip: "203.0.113.1", reason: "SQL injection attempt", blockedAt: "2024-01-13 16:15", status: "active" },
]

export default function AdminSecurity() {
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case 'investigating':
        return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
      case 'investigated':
        return <Badge className="bg-blue-100 text-blue-800">Investigated</Badge>
      case 'active':
        return <Badge className="bg-red-100 text-red-800">Active</Badge>
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Security" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Security Management</h1>
            <p className="text-muted-foreground">
              Monitor security events and manage system protection
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {securityStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${
                  stat.status === 'good' ? 'text-green-600' :
                  stat.status === 'warning' ? 'text-yellow-600' :
                  'text-muted-foreground'
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="blocked">Blocked IPs</TabsTrigger>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Security Events Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>Latest security incidents and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Type</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.type}</TableCell>
                        <TableCell>{event.user}</TableCell>
                        <TableCell className="font-mono text-sm">{event.ip}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Ban className="h-4 w-4" />
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

          <TabsContent value="blocked" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blocked IP Addresses</CardTitle>
                <CardDescription>List of currently blocked IP addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input placeholder="Add IP address to block..." className="flex-1" />
                    <Button>
                      <Ban className="mr-2 h-4 w-4" />
                      Block IP
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Blocked At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blockedIPs.map((blocked, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{blocked.ip}</TableCell>
                          <TableCell>{blocked.reason}</TableCell>
                          <TableCell>{blocked.blockedAt}</TableCell>
                          <TableCell>{getStatusBadge(blocked.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Authentication Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="2fa">Enforce 2FA for all users</Label>
                    <Switch id="2fa" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="passwordExpiry">Password expiry (days)</Label>
                    <Input id="passwordExpiry" type="number" defaultValue="90" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxFailedLogins">Max failed login attempts</Label>
                    <Input id="maxFailedLogins" type="number" defaultValue="5" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sessionTimeout">Session timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" className="w-20" />
                  </div>
                  <Button>Save Authentication Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="realTimeMonitoring">Real-time monitoring</Label>
                    <Switch id="realTimeMonitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="geoBlocking">Geographic blocking</Label>
                    <Switch id="geoBlocking" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bruteForceProtection">Brute force protection</Label>
                    <Switch id="bruteForceProtection" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailAlerts">Email security alerts</Label>
                    <Switch id="emailAlerts" defaultChecked />
                  </div>
                  <Button>Save Monitoring Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="apiRateLimit">API rate limiting</Label>
                    <Switch id="apiRateLimit" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requestsPerMinute">Requests per minute</Label>
                    <Input id="requestsPerMinute" type="number" defaultValue="100" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ipWhitelist">IP whitelist enabled</Label>
                    <Switch id="ipWhitelist" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="apiKeyRotation">Auto API key rotation</Label>
                    <Switch id="apiKeyRotation" defaultChecked />
                  </div>
                  <Button>Save API Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Score</CardTitle>
                  <CardDescription>Overall security health of your system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">87%</div>
                    <p className="text-sm text-muted-foreground">Security Score</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Authentication</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} />
                    <div className="flex justify-between text-sm">
                      <span>Access Control</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} />
                    <div className="flex justify-between text-sm">
                      <span>Data Protection</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                    <div className="flex justify-between text-sm">
                      <span>Monitoring</span>
                      <span>73%</span>
                    </div>
                    <Progress value={73} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>Complete log of administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground mt-4">Audit logs will be displayed here</p>
                  <p className="text-sm text-muted-foreground">Configure audit logging in security settings</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
