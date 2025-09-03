
import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Search, MoreHorizontal, Plus, Download, Filter, Eye, Users, TrendingUp } from "lucide-react"

const games = [
  {
    id: 1,
    name: "Spin Wheel",
    category: "Luck",
    status: "active",
    players: 1247,
    revenue: 8500,
    createdDate: "2024-01-01",
    lastUpdate: "2024-01-18",
    description: "Classic spin wheel game with various prizes"
  },
  {
    id: 2,
    name: "Blackjack Pro",
    category: "Card",
    status: "active",
    players: 892,
    revenue: 12300,
    createdDate: "2024-01-05",
    lastUpdate: "2024-01-19",
    description: "Professional blackjack with multiple betting options"
  },
  {
    id: 3,
    name: "Slot Master",
    category: "Slot",
    status: "maintenance",
    players: 653,
    revenue: 6700,
    createdDate: "2024-01-10",
    lastUpdate: "2024-01-15",
    description: "Multi-line slot machine with bonus rounds"
  },
  {
    id: 4,
    name: "Poker Palace",
    category: "Card",
    status: "active",
    players: 445,
    revenue: 9800,
    createdDate: "2024-01-12",
    lastUpdate: "2024-01-20",
    description: "Texas Hold'em poker with tournaments"
  },
  {
    id: 5,
    name: "Lucky Dice",
    category: "Dice",
    status: "inactive",
    players: 123,
    revenue: 1200,
    createdDate: "2024-01-15",
    lastUpdate: "2024-01-16",
    description: "Simple dice rolling game with multipliers"
  },
]

export default function AdminGames() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>
      case 'maintenance':
        return <Badge variant="outline" className="border-orange-200 text-orange-800">Maintenance</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Luck': 'bg-purple-100 text-purple-800',
      'Card': 'bg-blue-100 text-blue-800',
      'Slot': 'bg-yellow-100 text-yellow-800',
      'Dice': 'bg-red-100 text-red-800'
    }
    return <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{category}</Badge>
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Games" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Games Management</h1>
            <p className="text-muted-foreground">
              Manage your gaming catalog and monitor performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Game
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Games</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Games</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">75% availability</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,360</div>
              <p className="text-xs text-muted-foreground">+15% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$38,500</div>
              <p className="text-xs text-muted-foreground">+22% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Games Table */}
        <Card>
          <CardHeader>
            <CardTitle>Games</CardTitle>
            <CardDescription>Manage all games in your platform</CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{game.name}</div>
                        <div className="text-sm text-muted-foreground">{game.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(game.category)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(game.status)}
                    </TableCell>
                    <TableCell>{game.players.toLocaleString()}</TableCell>
                    <TableCell>${game.revenue.toLocaleString()}</TableCell>
                    <TableCell>{game.lastUpdate}</TableCell>
                    <TableCell>
                      <Switch defaultChecked={game.status === 'active'} />
                    </TableCell>
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
                          <DropdownMenuItem>Edit Game</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>Clone Game</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Game
                          </DropdownMenuItem>
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
