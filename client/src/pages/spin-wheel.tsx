
import { motion } from "framer-motion";
import SpinWheel from "@/components/ui/spin-wheel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Coins, Gift, Star, Trophy } from "lucide-react";

export default function SpinWheelPage() {
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

  const prizeInfo = [
    { icon: Star, color: "bg-yellow-500", name: "100 Credits", description: "Small win" },
    { icon: Gift, color: "bg-green-500", name: "500 Credits", description: "Good win" },
    { icon: Trophy, color: "bg-blue-500", name: "1000+ Credits", description: "Big win" },
    { icon: Coins, color: "bg-purple-500", name: "Jackpot", description: "5000 Credits!" }
  ];

  const handleSpin = (prize: any) => {
    console.log("Prize won:", prize);
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Spin Wheel of Fortune
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Try your luck and win amazing prizes! Earn credits to play more games.
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
                <Gift className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Daily Spins: 5 Free</span>
              </div>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Spin Wheel Section */}
          <motion.div 
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SpinWheel onSpin={handleSpin} />
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
                  <span className="text-sm">Get 5 free spins daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">2</Badge>
                  <span className="text-sm">Additional spins cost 50 credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">3</Badge>
                  <span className="text-sm">Win credits and special prizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">4</Badge>
                  <span className="text-sm">Use credits in other games</span>
                </div>
              </CardContent>
            </Card>

            {/* Prize Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  Possible Prizes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prizeInfo.map((prize, index) => {
                  const IconComponent = prize.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <div className={`w-10 h-10 ${prize.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{prize.name}</p>
                        <p className="text-sm text-muted-foreground">{prize.description}</p>
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

        {/* Game Rules */}
        <motion.div 
          className="mt-16 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Game Rules & Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Free Spins</h4>
                  <ul className="space-y-1">
                    <li>• Each player gets 5 free spins daily</li>
                    <li>• Free spins reset every 24 hours</li>
                    <li>• Unused free spins don't carry over</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Paid Spins</h4>
                  <ul className="space-y-1">
                    <li>• Cost: 50 credits per spin</li>
                    <li>• Same prizes as free spins</li>
                    <li>• Credits deducted before spin</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Prizes</h4>
                  <ul className="space-y-1">
                    <li>• Credits added to wallet instantly</li>
                    <li>• Bonus spins are additional free spins</li>
                    <li>• Multipliers apply to next spin only</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Fair Play</h4>
                  <ul className="space-y-1">
                    <li>• All spins are randomly generated</li>
                    <li>• Prizes based on configured probabilities</li>
                    <li>• Results cannot be influenced</li>
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
