
import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Save, RotateCcw, Trash2, Settings, Gift, Zap, TrendingUp } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface SpinWheelPrize {
  id: string;
  name: string;
  type: string;
  value: number;
  probability: number;
  color: string;
  active: boolean;
}

interface SpinWheelSettings {
  dailySpins: number;
  costPerSpin: number;
  minLevel: number;
  jackpotEnabled: boolean;
  bonusMultiplier: number;
  animationDuration: number;
}

export default function AdminSpinWheel() {
  const queryClient = useQueryClient()
  
  const [prizes, setPrizes] = useState<SpinWheelPrize[]>([
    { id: '1', name: "100 Credits", type: "credits", value: 100, probability: 30, color: "#FF6B6B", active: true },
    { id: '2', name: "500 Credits", type: "credits", value: 500, probability: 20, color: "#4ECDC4", active: true },
    { id: '3', name: "1000 Credits", type: "credits", value: 1000, probability: 15, color: "#45B7D1", active: true },
    { id: '4', name: "Free Spin", type: "bonus", value: 1, probability: 10, color: "#96CEB4", active: true },
    { id: '5', name: "2x Multiplier", type: "multiplier", value: 2, probability: 10, color: "#FFEAA7", active: true },
    { id: '6', name: "Jackpot", type: "credits", value: 5000, probability: 5, color: "#DDA0DD", active: true },
    { id: '7', name: "Better Luck", type: "nothing", value: 0, probability: 10, color: "#95A5A6", active: true },
  ])

  const [settings, setSettings] = useState<SpinWheelSettings>({
    dailySpins: 5,
    costPerSpin: 50,
    minLevel: 1,
    jackpotEnabled: true,
    bonusMultiplier: 1.5,
    animationDuration: 3000,
  })

  const [newPrize, setNewPrize] = useState({
    name: "",
    type: "credits",
    value: 0,
    probability: 0,
    color: "#FF6B6B",
    active: true
  })

  // Get spin wheel game data
  const { data: spinWheelGame } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await fetch('/api/games')
      if (!response.ok) throw new Error('Failed to fetch games')
      const games = await response.json()
      return games.find((game: any) => game.name === 'Spin Wheel')
    }
  })

  // Update game stats
  const updateGameMutation = useMutation({
    mutationFn: async (data: { players?: number; revenue?: number }) => {
      if (!spinWheelGame) return
      const response = await fetch(`/api/admin/games/${spinWheelGame.id}/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to update game')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] })
    }
  })

  const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0)

  const handleAddPrize = () => {
    if (newPrize.name && newPrize.probability > 0) {
      setPrizes([...prizes, { ...newPrize, id: Date.now().toString() }])
      setNewPrize({
        name: "",
        type: "credits",
        value: 0,
        probability: 0,
        color: "#FF6B6B",
        active: true
      })
    }
  }

  const handleDeletePrize = (id: string) => {
    setPrizes(prizes.filter(prize => prize.id !== id))
  }

  const handleTogglePrize = (id: string) => {
    setPrizes(prizes.map(prize => 
      prize.id === id ? { ...prize, active: !prize.active } : prize
    ))
  }

  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    localStorage.setItem('spinWheelPrizes', JSON.stringify(prizes))
    localStorage.setItem('spinWheelSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  const handleResetSettings = () => {
    // Reset to default values
    setPrizes([
      { id: '1', name: "100 Credits", type: "credits", value: 100, probability: 30, color: "#FF6B6B", active: true },
      { id: '2', name: "500 Credits", type: "credits", value: 500, probability: 20, color: "#4ECDC4", active: true },
      { id: '3', name: "1000 Credits", type: "credits", value: 1000, probability: 15, color: "#45B7D1", active: true },
      { id: '4', name: "Free Spin", type: "bonus", value: 1, probability: 10, color: "#96CEB4", active: true },
      { id: '5', name: "2x Multiplier", type: "multiplier", value: 2, probability: 10, color: "#FFEAA7", active: true },
      { id: '6', name: "Jackpot", type: "credits", value: 5000, probability: 5, color: "#DDA0DD", active: true },
      { id: '7', name: "Better Luck", type: "nothing", value: 0, probability: 10, color: "#95A5A6", active: true },
    ])
    setSettings({
      dailySpins: 5,
      costPerSpin: 50,
      minLevel: 1,
      jackpotEnabled: true,
      bonusMultiplier: 1.5,
      animationDuration: 3000,
    })
  }

  // Load saved settings on component mount
  useEffect(() => {
    const savedPrizes = localStorage.getItem('spinWheelPrizes')
    const savedSettings = localStorage.getItem('spinWheelSettings')
    
    if (savedPrizes) {
      setPrizes(JSON.parse(savedPrizes))
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const getPrizeTypeBadge = (type: string) => {
    switch (type) {
      case 'credits':
        return <Badge className="bg-green-100 text-green-800">Credits</Badge>
      case 'bonus':
        return <Badge className="bg-blue-100 text-blue-800">Bonus</Badge>
      case 'multiplier':
        return <Badge className="bg-purple-100 text-purple-800">Multiplier</Badge>
      case 'nothing':
        return <Badge variant="secondary">Nothing</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Spin Wheel" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Spin Wheel Configuration</h1>
            <p className="text-muted-foreground">
              Configure prizes, probabilities, and game settings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetSettings}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{spinWheelGame?.players || 0}</div>
              <p className="text-xs text-muted-foreground">Active players</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{spinWheelGame?.revenue || 0}</div>
              <p className="text-xs text-muted-foreground">From spin purchases</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prizes</CardTitle>
              <Gift className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prizes.filter(p => p.active).length}</div>
              <p className="text-xs text-muted-foreground">Out of {prizes.length} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Probability Total</CardTitle>
              <Settings className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalProbability === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalProbability}%
              </div>
              <p className="text-xs text-muted-foreground">
                {totalProbability === 100 ? 'Perfect balance' : 'Needs adjustment'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prizes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prizes">Prize Configuration</TabsTrigger>
            <TabsTrigger value="settings">Game Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="prizes" className="space-y-4">
            {/* Add New Prize */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Prize</CardTitle>
                <CardDescription>Create a new prize for the spin wheel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-6">
                  <div>
                    <Label htmlFor="prizeName">Prize Name</Label>
                    <Input
                      id="prizeName"
                      value={newPrize.name}
                      onChange={(e) => setNewPrize({...newPrize, name: e.target.value})}
                      placeholder="Enter prize name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prizeType">Type</Label>
                    <Select value={newPrize.type} onValueChange={(value) => setNewPrize({...newPrize, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credits">Credits</SelectItem>
                        <SelectItem value="bonus">Bonus</SelectItem>
                        <SelectItem value="multiplier">Multiplier</SelectItem>
                        <SelectItem value="nothing">Nothing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="prizeValue">Value</Label>
                    <Input
                      id="prizeValue"
                      type="number"
                      value={newPrize.value}
                      onChange={(e) => setNewPrize({...newPrize, value: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prizeProbability">Probability (%)</Label>
                    <Input
                      id="prizeProbability"
                      type="number"
                      value={newPrize.probability}
                      onChange={(e) => setNewPrize({...newPrize, probability: parseInt(e.target.value) || 0})}
                      placeholder="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prizeColor">Color</Label>
                    <Input
                      id="prizeColor"
                      type="color"
                      value={newPrize.color}
                      onChange={(e) => setNewPrize({...newPrize, color: e.target.value})}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddPrize} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Prize
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prizes Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Prizes</CardTitle>
                <CardDescription>Manage existing prizes and their probabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prize</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prizes.map((prize) => (
                      <TableRow key={prize.id}>
                        <TableCell className="font-medium">{prize.name}</TableCell>
                        <TableCell>{getPrizeTypeBadge(prize.type)}</TableCell>
                        <TableCell>
                          {prize.type === 'credits' ? `${prize.value} Credits` : 
                           prize.type === 'multiplier' ? `${prize.value}x` :
                           prize.type === 'bonus' ? `${prize.value} Spin${prize.value > 1 ? 's' : ''}` :
                           'No value'}
                        </TableCell>
                        <TableCell>{prize.probability}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded border"
                              style={{ backgroundColor: prize.color }}
                            />
                            <span className="text-sm text-muted-foreground">{prize.color}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={prize.active}
                            onCheckedChange={() => handleTogglePrize(prize.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePrize(prize.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Game Settings</CardTitle>
                <CardDescription>Configure spin wheel game parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="dailySpins">Daily Free Spins</Label>
                    <Input
                      id="dailySpins"
                      type="number"
                      value={settings.dailySpins}
                      onChange={(e) => setSettings({...settings, dailySpins: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="costPerSpin">Cost Per Spin (Credits)</Label>
                    <Input
                      id="costPerSpin"
                      type="number"
                      value={settings.costPerSpin}
                      onChange={(e) => setSettings({...settings, costPerSpin: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minLevel">Minimum Player Level</Label>
                    <Input
                      id="minLevel"
                      type="number"
                      value={settings.minLevel}
                      onChange={(e) => setSettings({...settings, minLevel: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="animationDuration">Animation Duration (ms)</Label>
                    <Input
                      id="animationDuration"
                      type="number"
                      value={settings.animationDuration}
                      onChange={(e) => setSettings({...settings, animationDuration: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="jackpotEnabled"
                    checked={settings.jackpotEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, jackpotEnabled: checked})}
                  />
                  <Label htmlFor="jackpotEnabled">Enable Jackpot Feature</Label>
                </div>

                <div>
                  <Label htmlFor="bonusMultiplier">Bonus Multiplier</Label>
                  <Input
                    id="bonusMultiplier"
                    type="number"
                    step="0.1"
                    value={settings.bonusMultiplier}
                    onChange={(e) => setSettings({...settings, bonusMultiplier: parseFloat(e.target.value) || 0})}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Multiplier applied to bonus prizes
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spin Wheel Analytics</CardTitle>
                <CardDescription>View performance metrics and player engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Game Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Players</span>
                        <span className="font-medium">{spinWheelGame?.players || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Revenue</span>
                        <span className="font-medium">₹{spinWheelGame?.revenue || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Revenue per Player</span>
                        <span className="font-medium">
                          ₹{spinWheelGame?.players > 0 ? Math.round((spinWheelGame.revenue || 0) / spinWheelGame.players) : 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Game Status</span>
                        <Badge variant={spinWheelGame?.status === 'active' ? 'default' : 'secondary'}>
                          {spinWheelGame?.status || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Prize Distribution</h4>
                    <div className="space-y-2">
                      {prizes.filter(p => p.active).map((prize) => (
                        <div key={prize.id} className="flex justify-between text-sm">
                          <span>{prize.name}</span>
                          <span className="text-muted-foreground">{prize.probability}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
