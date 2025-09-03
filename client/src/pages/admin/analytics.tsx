
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  GamepadIcon, 
  DollarSign,
  Calendar,
  Download,
  Eye,
  MousePointer,
  Clock
} from "lucide-react"

const analyticsData = {
  overview: [
    { title: "Total Users", value: "2,847", change: "+12.5%", icon: Users },
    { title: "Daily Active Users", value: "1,246", change: "+8.3%", icon: Eye },
    { title: "Session Duration", value: "24m 32s", change: "+5.7%", icon: Clock },
    { title: "Conversion Rate", value: "3.2%", change: "+1.1%", icon: MousePointer },
  ],
  gameStats: [
    { name: "Spin Wheel", plays: 8472, revenue: 15420, growth: "+23%" },
    { name: "Slot Machine", plays: 6834, revenue: 12380, growth: "+18%" },
    { name: "Blackjack", plays: 4521, revenue: 9870, growth: "+15%" },
    { name: "Roulette", plays: 3654, revenue: 8230, growth: "+12%" },
  ],
  userBehavior: [
    { metric: "Page Views", value: "45,231", change: "+8.5%" },
    { metric: "Bounce Rate", value: "32.4%", change: "-2.1%" },
    { metric: "Avg. Session Pages", value: "4.7", change: "+1.2%" },
    { metric: "Return Visitors", value: "68.3%", change: "+4.8%" },
  ]
}

export default function AdminAnalytics() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Analytics" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track performance metrics and user behavior
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="games">Game Analytics</TabsTrigger>
            <TabsTrigger value="users">User Behavior</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {analyticsData.overview.map((stat) => (
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

            {/* Charts Placeholder */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trend</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground mt-2">Chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Daily revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground mt-2">Chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Performance</CardTitle>
                <CardDescription>Analytics for individual games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.gameStats.map((game) => (
                    <div key={game.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <GamepadIcon className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">{game.name}</h3>
                          <p className="text-sm text-muted-foreground">{game.plays} plays</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${game.revenue.toLocaleString()}</p>
                        <Badge variant="secondary" className="text-green-600">
                          {game.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Behavior Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analyticsData.userBehavior.map((metric) => (
                    <div key={metric.metric} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className="text-right">
                        <span className="font-bold">{metric.value}</span>
                        <span className="text-xs text-green-600 ml-2">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Engagement levels over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Active Users</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Weekly Retention</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Retention</span>
                        <span>54%</span>
                      </div>
                      <Progress value={54} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$2,847</div>
                  <p className="text-sm text-green-600">+18.2% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$18,429</div>
                  <p className="text-sm text-green-600">+12.5% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$67,231</div>
                  <p className="text-sm text-green-600">+8.7% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
