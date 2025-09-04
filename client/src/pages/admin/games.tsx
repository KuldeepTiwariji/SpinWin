
import { useState, useEffect } from "react"
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Search, MoreHorizontal, Plus, Download, Filter, Eye, Users, TrendingUp, Edit, Trash2 } from "lucide-react"

interface Game {
  id: string;
  name: string;
  status: string;
  players: number;
  revenue: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminGames() {
  const [searchTerm, setSearchTerm] = useState("")
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    players: 0,
    revenue: 0,
    description: ""
  })
  const { toast } = useToast()

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/games")
      if (response.ok) {
        const data = await response.json()
        setGames(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch games",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createGame = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Game created successfully",
        })
        setIsCreateDialogOpen(false)
        resetForm()
        fetchGames()
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create game",
        variant: "destructive",
      })
    }
  }

  const updateGame = async () => {
    if (!editingGame) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/games/${editingGame.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Game updated successfully",
        })
        setIsEditDialogOpen(false)
        setEditingGame(null)
        resetForm()
        fetchGames()
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update game",
        variant: "destructive",
      })
    }
  }

  const deleteGame = async (gameId: string) => {
    if (!confirm("Are you sure you want to delete this game?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/games/${gameId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Game deleted successfully",
        })
        fetchGames()
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete game",
        variant: "destructive",
      })
    }
  }

  const toggleGameStatus = async (gameId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/games/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchGames()
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update game status",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      status: "active",
      players: 0,
      revenue: 0,
      description: ""
    })
  }

  const openEditDialog = (game: Game) => {
    setEditingGame(game)
    setFormData({
      name: game.name,
      status: game.status,
      players: game.players,
      revenue: game.revenue,
      description: game.description
    })
    setIsEditDialogOpen(true)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalGames = games.length
  const activeGames = games.filter(g => g.status === "active").length
  const totalPlayers = games.reduce((sum, g) => sum + g.players, 0)
  const totalRevenue = games.reduce((sum, g) => sum + g.revenue, 0)

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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Game
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Game</DialogTitle>
                  <DialogDescription>
                    Add a new game to your catalog
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Game Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter game name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Enter game description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="players">Players</Label>
                      <Input
                        id="players"
                        type="number"
                        value={formData.players}
                        onChange={(e) => setFormData({...formData, players: parseInt(e.target.value) || 0})}
                        placeholder="0"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="revenue">Revenue</Label>
                      <Input
                        id="revenue"
                        type="number"
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: parseInt(e.target.value) || 0})}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => {setIsCreateDialogOpen(false); resetForm()}}>
                    Cancel
                  </Button>
                  <Button onClick={createGame}>Create Game</Button>
                </div>
              </DialogContent>
            </Dialog>
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
              <div className="text-2xl font-bold">{totalGames}</div>
              <p className="text-xs text-muted-foreground">Catalog size</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Games</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeGames}</div>
              <p className="text-xs text-muted-foreground">{Math.round((activeGames / totalGames) * 100) || 0}% availability</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPlayers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all games</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Combined earnings</p>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading games...</TableCell>
                  </TableRow>
                ) : filteredGames.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No games found</TableCell>
                  </TableRow>
                ) : (
                  filteredGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{game.name}</div>
                          <div className="text-sm text-muted-foreground">{game.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(game.status)}
                      </TableCell>
                      <TableCell>{game.players.toLocaleString()}</TableCell>
                      <TableCell>${game.revenue.toLocaleString()}</TableCell>
                      <TableCell>{new Date(game.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={game.status === 'active'} 
                          onCheckedChange={() => toggleGameStatus(game.id, game.status)}
                        />
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
                            <DropdownMenuItem onClick={() => openEditDialog(game)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Game
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => deleteGame(game.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Game
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Game Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Game</DialogTitle>
              <DialogDescription>
                Update game information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Game Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter game name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter game description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-players">Players</Label>
                  <Input
                    id="edit-players"
                    type="number"
                    value={formData.players}
                    onChange={(e) => setFormData({...formData, players: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-revenue">Revenue</Label>
                  <Input
                    id="edit-revenue"
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => setFormData({...formData, revenue: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {setIsEditDialogOpen(false); setEditingGame(null); resetForm()}}>
                Cancel
              </Button>
              <Button onClick={updateGame}>Update Game</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
