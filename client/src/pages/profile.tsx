
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { Calendar, Edit, History, Trophy, Coins, GamepadIcon, Clock } from "lucide-react";

interface EditHistory {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  reason: string;
}

interface GameStats {
  game: string;
  totalPlays: number;
  winRate: number;
  totalWinnings: number;
  favoriteVariant: string;
  lastPlayed: string;
}

export default function Profile() {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
  const [gameStats, setGameStats] = useState<GameStats[]>([]);
  const [spinHistory, setSpinHistory] = useState([]);

  const mockEditHistory: EditHistory[] = [
    {
      id: "1",
      field: "Email",
      oldValue: "old@example.com",
      newValue: user?.email || "",
      timestamp: "2024-01-20 14:30",
      reason: "User requested email update"
    },
    {
      id: "2",
      field: "Mobile",
      oldValue: "+1234567890",
      newValue: user?.mobile || "",
      timestamp: "2024-01-18 10:15",
      reason: "Mobile number verification"
    },
    {
      id: "3",
      field: "Username",
      oldValue: "oldusername",
      newValue: user?.username || "",
      timestamp: "2024-01-15 16:45",
      reason: "Username personalization"
    }
  ];

  const mockGameStats: GameStats[] = [
    {
      game: "Spin Wheel",
      totalPlays: 45,
      winRate: 67.2,
      totalWinnings: 2340,
      favoriteVariant: "Premium Wheel",
      lastPlayed: "2024-01-20"
    },
    {
      game: "Blackjack",
      totalPlays: 28,
      winRate: 58.3,
      totalWinnings: 1850,
      favoriteVariant: "Classic",
      lastPlayed: "2024-01-19"
    },
    {
      game: "Poker",
      totalPlays: 15,
      winRate: 72.1,
      totalWinnings: 3200,
      favoriteVariant: "Texas Hold'em",
      lastPlayed: "2024-01-18"
    }
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      });
      setEditHistory(mockEditHistory);
      setGameStats(mockGameStats);
      fetchSpinHistory();
    }
  }, [user]);

  const fetchSpinHistory = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/spin-history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSpinHistory(data);
      }
    } catch (error) {
      console.error('Failed to fetch spin history:', error);
    }
  };

  const handleSave = async () => {
    // Implementation for updating user profile
    setIsEditing(false);
    
    // Add to edit history
    const newEdit: EditHistory = {
      id: Date.now().toString(),
      field: "Profile Update",
      oldValue: "Previous values",
      newValue: "Updated values",
      timestamp: new Date().toLocaleString(),
      reason: "User profile update"
    };
    setEditHistory([newEdit, ...editHistory]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary">User Profile</h1>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src="/api/placeholder/96/96" />
                  <AvatarFallback className="text-lg">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-primary">{user.username}</CardTitle>
                <CardDescription>{user.role}</CardDescription>
                <Badge variant="outline" className="w-fit mx-auto">
                  <Trophy className="mr-1 h-3 w-3" />
                  Premium Player
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="games" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="games">Game Stats</TabsTrigger>
                 
                </TabsList>

                {/* Game Statistics Tab */}
                <TabsContent value="games" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GamepadIcon className="h-5 w-5" />
                        Game Performance
                      </CardTitle>
                      <CardDescription>Your gaming statistics and achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Game</TableHead>
                            <TableHead>Plays</TableHead>
                            <TableHead>Win Rate</TableHead>
                            <TableHead>Winnings</TableHead>
                            <TableHead>Favorite Variant</TableHead>
                            <TableHead>Last Played</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gameStats.map((stat) => (
                            <TableRow key={stat.game}>
                              <TableCell className="font-medium">{stat.game}</TableCell>
                              <TableCell>{stat.totalPlays}</TableCell>
                              <TableCell>
                                <Badge variant={stat.winRate > 60 ? "default" : "secondary"}>
                                  {stat.winRate}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-green-600 font-semibold">
                                <Coins className="inline mr-1 h-4 w-4" />
                                {stat.totalWinnings}
                              </TableCell>
                              <TableCell>{stat.favoriteVariant}</TableCell>
                              <TableCell>{stat.lastPlayed}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Recent Spin Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Spin Results</CardTitle>
                      <CardDescription>Your latest spin wheel results</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {spinHistory.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Prize</TableHead>
                              <TableHead>Credits</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {spinHistory.slice(0, 5).map((spin: any) => (
                              <TableRow key={spin.id}>
                                <TableCell>{spin.prize}</TableCell>
                                <TableCell className="text-green-600 font-semibold">
                                  +{spin.credits}
                                </TableCell>
                                <TableCell>{new Date(spin.timestamp).toLocaleDateString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">No spin history available</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Edit History Tab */}
               

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Account Security */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Security</CardTitle>
                        <CardDescription>Manage your account security settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full">
                          Enable Two-Factor Auth
                        </Button>
                        <Button variant="outline" className="w-full">
                          Login History
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Game Preferences */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Game Preferences</CardTitle>
                        <CardDescription>Customize your gaming experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full">
                          Notification Settings
                        </Button>
                        <Button variant="outline" className="w-full">
                          Game Limits
                        </Button>
                        <Button variant="outline" className="w-full">
                          Favorite Games
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Achievement System */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Achievements & Badges
                      </CardTitle>
                      <CardDescription>Your gaming milestones and accomplishments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                          <h4 className="font-semibold">First Win</h4>
                          <p className="text-sm text-muted-foreground">Won your first game</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h4 className="font-semibold">High Roller</h4>
                          <p className="text-sm text-muted-foreground">Earned 1000+ credits</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg opacity-50">
                          <GamepadIcon className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <h4 className="font-semibold">Game Master</h4>
                          <p className="text-sm text-muted-foreground">Play 100 games (Locked)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
