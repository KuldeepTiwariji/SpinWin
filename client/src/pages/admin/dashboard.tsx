
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  GamepadIcon, 
  CreditCard, 
  TrendingUp, 
  Activity,
  DollarSign,
  Zap,
  AlertTriangle
} from "lucide-react"

const dashboardStats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Games",
    value: "24",
    change: "+2",
    icon: GamepadIcon,
    color: "text-green-600",
  },
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+18.2%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Spin Wheel Plays",
    value: "8,472",
    change: "+23.1%",
    icon: Zap,
    color: "text-orange-600",
  },
]

const recentActivity = [
  { user: "John Doe", action: "Won 500 credits", time: "2 minutes ago", type: "win" },
  { user: "Jane Smith", action: "Registered new account", time: "5 minutes ago", type: "register" },
  { user: "Mike Johnson", action: "Made a deposit", time: "10 minutes ago", type: "deposit" },
  { user: "Sarah Wilson", action: "Played spin wheel", time: "15 minutes ago", type: "play" },
  { user: "Tom Brown", action: "Withdrew credits", time: "20 minutes ago", type: "withdraw" },
]

const systemAlerts = [
  { message: "Server CPU usage is high (85%)", severity: "warning", time: "1 hour ago" },
  { message: "Daily backup completed successfully", severity: "success", time: "2 hours ago" },
  { message: "New user registration spike detected", severity: "info", time: "3 hours ago" },
]

export default function AdminDashboard() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your gaming platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest user activities on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                    <Badge variant={
                      activity.type === 'win' ? 'default' :
                      activity.type === 'register' ? 'secondary' :
                      activity.type === 'deposit' ? 'default' :
                      'outline'
                    }>
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Server Load</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>62%</span>
                </div>
                <Progress value={62} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Database</span>
                  <span>Online</span>
                </div>
                <div className="h-2 bg-green-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Recent system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      alert.severity === 'warning' ? 'destructive' :
                      alert.severity === 'success' ? 'default' :
                      'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
