
import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  FileText, 
  Download, 
  Calendar, 
  Users, 
  DollarSign, 
  GamepadIcon, 
  BarChart3,
  Plus,
  Eye,
  Trash2
} from "lucide-react"

const reportStats = [
  { title: "Generated Reports", value: "127", change: "+8", icon: FileText },
  { title: "Scheduled Reports", value: "12", change: "+2", icon: Calendar },
  { title: "Data Points", value: "24.5K", change: "+1.2K", icon: BarChart3 },
  { title: "Storage Used", value: "2.4 GB", change: "+340 MB", icon: Download },
]

const generatedReports = [
  {
    id: "RPT001",
    name: "Monthly User Activity Report",
    type: "User Analytics",
    generatedBy: "Admin",
    date: "2024-01-15 09:30",
    status: "completed",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: "RPT002",
    name: "Revenue Summary Q1 2024",
    type: "Financial",
    generatedBy: "System",
    date: "2024-01-15 08:15",
    status: "completed",
    size: "1.8 MB",
    format: "Excel"
  },
  {
    id: "RPT003",
    name: "Game Performance Analysis",
    type: "Game Analytics",
    generatedBy: "Admin",
    date: "2024-01-15 07:45",
    status: "processing",
    size: "-",
    format: "PDF"
  },
  {
    id: "RPT004",
    name: "Security Audit Report",
    type: "Security",
    generatedBy: "System",
    date: "2024-01-14 23:00",
    status: "completed",
    size: "5.2 MB",
    format: "PDF"
  },
]

const scheduledReports = [
  {
    id: "SCH001",
    name: "Daily Revenue Report",
    frequency: "Daily",
    nextRun: "2024-01-16 06:00",
    recipient: "admin@ashokgaming.com",
    status: "active"
  },
  {
    id: "SCH002",
    name: "Weekly User Engagement",
    frequency: "Weekly",
    nextRun: "2024-01-21 08:00",
    recipient: "management@ashokgaming.com",
    status: "active"
  },
  {
    id: "SCH003",
    name: "Monthly Financial Summary",
    frequency: "Monthly",
    nextRun: "2024-02-01 09:00",
    recipient: "finance@ashokgaming.com",
    status: "paused"
  },
]

export default function AdminReports() {
  const [selectedDateRange, setSelectedDateRange] = useState("30")
  const [selectedReportType, setSelectedReportType] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>
      case 'paused':
        return <Badge className="bg-gray-100 text-gray-800">Paused</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Reports" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports Management</h1>
            <p className="text-muted-foreground">
              Generate, schedule, and manage system reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> this month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="generated" className="space-y-6">
          <TabsList>
            <TabsTrigger value="generated">Generated Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="create">Create Report</TabsTrigger>
          </TabsList>

          <TabsContent value="generated" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="user">User Analytics</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="game">Game Analytics</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generated Reports Table */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Recently generated system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automatically generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>{report.nextRun}</TableCell>
                        <TableCell>{report.recipient}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Create a custom report with specific parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reportName">Report Name</Label>
                      <Input id="reportName" placeholder="Enter report name" />
                    </div>
                    <div>
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User Analytics</SelectItem>
                          <SelectItem value="financial">Financial Report</SelectItem>
                          <SelectItem value="game">Game Analytics</SelectItem>
                          <SelectItem value="security">Security Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateRange">Date Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="format">Output Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="recipient">Email Recipient (Optional)</Label>
                      <Input id="recipient" type="email" placeholder="Enter email address" />
                    </div>
                    <div>
                      <Label htmlFor="schedule">Schedule (Optional)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Generate now or schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Generate Now</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Generate Report</Button>
                  <Button variant="outline">Save as Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
