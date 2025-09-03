
import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MoreHorizontal, Download, Filter, CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const transactionStats = [
  { title: "Total Volume", value: "$45,231", change: "+18.2%", icon: TrendingUp },
  { title: "Today's Transactions", value: "234", change: "+12.5%", icon: CreditCard },
  { title: "Pending", value: "12", change: "-2.3%", icon: ArrowUpRight },
  { title: "Failed", value: "3", change: "-0.5%", icon: ArrowDownLeft },
]

const transactions = [
  {
    id: "TXN001",
    user: { name: "John Doe", email: "john@example.com", avatar: "/api/placeholder/32/32" },
    type: "deposit",
    amount: 500,
    method: "Credit Card",
    status: "completed",
    date: "2024-01-15 14:30",
    reference: "REF123456"
  },
  {
    id: "TXN002",
    user: { name: "Jane Smith", email: "jane@example.com", avatar: "/api/placeholder/32/32" },
    type: "withdrawal",
    amount: 250,
    method: "Bank Transfer",
    status: "pending",
    date: "2024-01-15 13:45",
    reference: "REF123457"
  },
  {
    id: "TXN003",
    user: { name: "Mike Johnson", email: "mike@example.com", avatar: "/api/placeholder/32/32" },
    type: "deposit",
    amount: 1000,
    method: "PayPal",
    status: "completed",
    date: "2024-01-15 12:20",
    reference: "REF123458"
  },
  {
    id: "TXN004",
    user: { name: "Sarah Wilson", email: "sarah@example.com", avatar: "/api/placeholder/32/32" },
    type: "withdrawal",
    amount: 75,
    method: "Crypto",
    status: "failed",
    date: "2024-01-15 11:10",
    reference: "REF123459"
  },
  {
    id: "TXN005",
    user: { name: "Tom Brown", email: "tom@example.com", avatar: "/api/placeholder/32/32" },
    type: "deposit",
    amount: 300,
    method: "Credit Card",
    status: "completed",
    date: "2024-01-15 10:55",
    reference: "REF123460"
  },
]

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Badge className="bg-blue-100 text-blue-800">Deposit</Badge>
      case 'withdrawal':
        return <Badge className="bg-purple-100 text-purple-800">Withdrawal</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Transactions" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage all financial transactions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {transactionStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
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

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A list of recent financial transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={transaction.user.avatar} />
                          <AvatarFallback>
                            {transaction.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{transaction.user.name}</div>
                          <div className="text-sm text-muted-foreground">{transaction.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                    <TableCell className="font-semibold">
                      <span className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          {transaction.status === 'pending' && (
                            <>
                              <DropdownMenuItem>Approve</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
