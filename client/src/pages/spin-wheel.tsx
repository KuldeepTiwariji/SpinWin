import { motion } from "framer-motion";
import NumberBetting from "@/components/ui/number-betting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Coins, Gift, Star, Trophy, Target, History } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SpinWheelPage() {
  const queryClient = useQueryClient();

  // Get user wallet
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch('/api/wallet', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch wallet');
      return response.json();
    }
  });

  // Get betting history
  const { data: bettingHistory = [] } = useQuery({
    queryKey: ['betting-history'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return [];

      const response = await fetch('/api/number-betting/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) return [];
      return response.json();
    }
  });

  // Place bet mutation
  const placeBetMutation = useMutation({
    mutationFn: async (betData: any) => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/number-betting/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(betData)
      });
      if (!response.ok) throw new Error('Failed to place bet');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['betting-history'] });
    }
  });

  const multiplierInfo = [
    { icon: Target, color: "bg-green-500", name: "Exact Match", description: "50x Multiplier" },
    { icon: Star, color: "bg-blue-500", name: "1 Number Away", description: "10x Multiplier" },
    { icon: Gift, color: "bg-yellow-500", name: "2-3 Numbers Away", description: "5x Multiplier" },
    { icon: Trophy, color: "bg-orange-500", name: "4-5 Numbers Away", description: "2x Multiplier" }
  ];

  const handleSpin = (result: any) => {
    placeBetMutation.mutate(result);
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4 drop-shadow-lg">
              🎯 Lucky Number Game 🍀
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-xl text-white mb-8 drop-shadow-lg">
            ✨ Pick your lucky number from 1 to 100, place your bet, and spin for fortune! ✨
          </p>

          {/* User Stats */}
          <div className="flex justify-center gap-4 mb-8">
            <Card className="px-6 py-3">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold">Balance: {wallet?.balance || 0} Credits</span>
              </div>
            </Card>
            <Card className="px-6 py-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Lucky Number Betting</span>
              </div>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Number Betting Game */}
          <motion.div 
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <NumberBetting onSpin={handleSpin} userBalance={wallet?.balance || 0} />
          </motion.div>

          {/* Info Panel */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* How to Play */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  How to Play
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">1</Badge>
                  <span className="text-sm">Choose a lucky number (1-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">2</Badge>
                  <span className="text-sm">Set your bet amount (min 10 credits)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">3</Badge>
                  <span className="text-sm">Spin to reveal the lucky number</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">4</Badge>
                  <span className="text-sm">Win based on how close your guess is</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">5</Badge>
                  <span className="text-sm">Closer guesses = bigger wins!</span>
                </div>
              </CardContent>
            </Card>

            {/* Win Multipliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Win Multipliers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {multiplierInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <div className={`w-10 h-10 ${info.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{info.name}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/wallet">
                  <Button variant="outline" className="w-full">
                    <Coins className="mr-2 h-4 w-4" />
                    View Wallet
                  </Button>
                </Link>
                <Link href="/games">
                  <Button variant="outline" className="w-full">
                    <Gift className="mr-2 h-4 w-4" />
                    More Games
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Betting History */}
        <motion.div 
          className="mt-16 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Your Betting History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bettingHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Your Number</TableHead>
                      <TableHead>Lucky Number</TableHead>
                      <TableHead>Bet Amount</TableHead>
                      <TableHead>Multiplier</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bettingHistory.slice(0, 10).map((bet: any) => (
                      <TableRow key={bet.id}>
                        <TableCell className="font-medium">{bet.userNumber}</TableCell>
                        <TableCell className="font-medium">{bet.winningNumber}</TableCell>
                        <TableCell>{bet.betAmount}</TableCell>
                        <TableCell>
                          <Badge variant={bet.multiplier > 0 ? "default" : "secondary"}>
                            {bet.multiplier}x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={bet.winAmount > bet.betAmount ? "text-green-600 font-semibold" : "text-red-600"}>
                            {bet.winAmount > bet.betAmount ? `+${bet.winAmount - bet.betAmount}` : `-${bet.betAmount}`}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(bet.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No betting history yet. Place your first bet to get started!
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Game Rules */}
        <motion.div 
          className="mt-16 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Lucky Number Game Rules & Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Betting Rules</h4>
                  <ul className="space-y-1">
                    <li>• Choose any lucky number from 1 to 100</li>
                    <li>• Minimum bet is 10 credits</li>
                    <li>• Maximum bet is your wallet balance</li>
                    <li>• Credits are deducted before spinning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Payout Structure</h4>
                  <ul className="space-y-1">
                    <li>• <span className="text-green-600 font-bold">Exact match: 50x</span> your bet</li>
                    <li>• <span className="text-blue-600 font-bold">1 number away: 10x</span> your bet</li>
                    <li>• <span className="text-yellow-600 font-bold">2-3 numbers away: 5x</span> your bet</li>
                    <li>• <span className="text-orange-600 font-bold">4-5 numbers away: 2x</span> your bet</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Examples</h4>
                  <ul className="space-y-1">
                    <li>• You pick 50, lucky number is 50: Win 50x</li>
                    <li>• You pick 50, lucky number is 49: Win 10x</li>
                    <li>• You pick 50, lucky number is 47: Win 5x</li>
                    <li>• You pick 50, lucky number is 45: Win 2x</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Fair Play</h4>
                  <ul className="space-y-1">
                    <li>• Numbers are randomly generated (1-100)</li>
                    <li>• Each number has equal probability</li>
                    <li>• Results cannot be influenced</li>
                    <li>• Winnings are instant and automatic</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}