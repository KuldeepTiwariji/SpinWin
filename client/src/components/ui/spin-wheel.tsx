
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Coins } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Prize {
  id: string;
  name: string;
  type: string;
  value: number;
  probability: number;
  color: string;
  active: boolean;
}

interface SpinWheelProps {
  onSpin?: (prize: Prize) => void;
}

export default function SpinWheel({ onSpin }: SpinWheelProps) {
  const queryClient = useQueryClient()
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [dailySpins, setDailySpins] = useState(0);
  const [userCredits, setUserCredits] = useState(0);

  // Load configuration from localStorage
  useEffect(() => {
    const savedPrizes = localStorage.getItem('spinWheelPrizes');
    const savedSettings = localStorage.getItem('spinWheelSettings');
    
    if (savedPrizes) {
      const parsedPrizes = JSON.parse(savedPrizes);
      setPrizes(parsedPrizes.filter((p: Prize) => p.active));
    } else {
      // Default prizes
      setPrizes([
        { id: '1', name: "100 Credits", type: "credits", value: 100, probability: 30, color: "#FF6B6B", active: true },
        { id: '2', name: "500 Credits", type: "credits", value: 500, probability: 20, color: "#4ECDC4", active: true },
        { id: '3', name: "1000 Credits", type: "credits", value: 1000, probability: 15, color: "#45B7D1", active: true },
        { id: '4', name: "Free Spin", type: "bonus", value: 1, probability: 10, color: "#96CEB4", active: true },
        { id: '5', name: "2x Multiplier", type: "multiplier", value: 2, probability: 10, color: "#FFEAA7", active: true },
        { id: '6', name: "Jackpot", type: "credits", value: 5000, probability: 5, color: "#DDA0DD", active: true },
        { id: '7', name: "Better Luck", type: "nothing", value: 0, probability: 10, color: "#95A5A6", active: true },
      ]);
    }

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDailySpins(settings.dailySpins || 5);
    }
  }, []);

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

  // Update wallet after spin
  const updateWalletMutation = useMutation({
    mutationFn: async (amount: number) => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
      });
      if (!response.ok) throw new Error('Failed to update wallet');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    }
  });

  // Play game mutation to update stats
  const playGameMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/games', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch games');
      const games = await response.json();
      const spinWheelGame = games.find((game: any) => game.name === 'Spin Wheel');
      
      if (spinWheelGame) {
        const playResponse = await fetch(`/api/games/${spinWheelGame.id}/play`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!playResponse.ok) throw new Error('Failed to play game');
        return playResponse.json();
      }
    }
  });

  useEffect(() => {
    setUserCredits(wallet?.balance || 0);
  }, [wallet]);

  const selectPrizeBasedOnProbability = () => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        return prize;
      }
    }
    return prizes[prizes.length - 1]; // Fallback to last prize
  };

  const handleSpin = async () => {
    if (isSpinning || prizes.length === 0) return;

    // Check if user has free spins or enough credits
    const savedSpinsToday = parseInt(localStorage.getItem('spinsToday') || '0');
    const today = new Date().toDateString();
    const lastSpinDate = localStorage.getItem('lastSpinDate');

    let canSpin = false;
    if (lastSpinDate !== today) {
      // Reset daily spins
      localStorage.setItem('spinsToday', '0');
      localStorage.setItem('lastSpinDate', today);
      canSpin = true;
    } else if (savedSpinsToday < dailySpins) {
      canSpin = true;
    } else if (userCredits >= 50) { // Cost per spin
      canSpin = true;
    }

    if (!canSpin) {
      alert('No free spins remaining and insufficient credits!');
      return;
    }

    setIsSpinning(true);
    setSelectedPrize(null);

    // Deduct credits if no free spins
    if (savedSpinsToday >= dailySpins && userCredits >= 50) {
      // This would be handled by the backend in a real implementation
    } else {
      // Increment daily spins count
      localStorage.setItem('spinsToday', (savedSpinsToday + 1).toString());
    }

    // Select prize based on probability
    const selectedPrize = selectPrizeBasedOnProbability();
    
    // Calculate rotation
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    const anglePerPrize = 360 / prizes.length;
    const prizeAngle = prizeIndex * anglePerPrize;
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + spins * 360 + (360 - prizeAngle);
    
    setRotation(finalRotation);

    // Play game to update stats
    playGameMutation.mutate();

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(selectedPrize);
      
      // Add credits to wallet if prize is credits
      if (selectedPrize.type === 'credits' && selectedPrize.value > 0) {
        updateWalletMutation.mutate(selectedPrize.value);
      }
      
      onSpin?.(selectedPrize);
    }, 3000);
  };

  const resetWheel = () => {
    setSelectedPrize(null);
  };

  const getSpinButtonText = () => {
    const savedSpinsToday = parseInt(localStorage.getItem('spinsToday') || '0');
    const today = new Date().toDateString();
    const lastSpinDate = localStorage.getItem('lastSpinDate');

    if (isSpinning) return 'SPINNING...';
    
    if (lastSpinDate !== today || savedSpinsToday < dailySpins) {
      const remaining = lastSpinDate !== today ? dailySpins : dailySpins - savedSpinsToday;
      return `FREE SPIN (${remaining} left)`;
    }
    
    return `SPIN (50 Credits)`;
  };

  if (prizes.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <p className="text-muted-foreground">No active prizes configured</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* User Credits Display */}
      <Card className="px-6 py-3">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-600" />
          <span className="font-semibold">Credits: {userCredits}</span>
        </div>
      </Card>

      {/* Spin Wheel */}
      <div className="relative">
        <motion.div
          className="w-80 h-80 rounded-full border-8 border-primary relative overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
          data-testid="spin-wheel"
        >
          {/* Prize segments */}
          {prizes.map((prize, index) => {
            const anglePerPrize = 360 / prizes.length;
            const startAngle = index * anglePerPrize;
            const endAngle = (index + 1) * anglePerPrize;
            
            return (
              <div
                key={prize.id}
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(from ${startAngle}deg, ${prize.color} ${startAngle}deg ${endAngle}deg, transparent ${endAngle}deg)`
                }}
              />
            );
          })}
          
          {/* Prize labels */}
          {prizes.map((prize, index) => {
            const anglePerPrize = 360 / prizes.length;
            const angle = (index * anglePerPrize) + (anglePerPrize / 2);
            const radian = (angle * Math.PI) / 180;
            const radius = 120;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            
            return (
              <div
                key={`${prize.id}-label`}
                className="absolute text-xs font-bold text-white text-center"
                style={{
                  left: `calc(50% + ${x}px - 30px)`,
                  top: `calc(50% + ${y}px - 10px)`,
                  width: '60px',
                  transform: `rotate(${angle + 90}deg)`,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                {prize.name.split(' ')[0]}
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Star className="text-primary-foreground text-2xl" />
            </div>
          </div>
          
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-primary"></div>
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="px-12 py-4 bg-primary text-primary-foreground rounded-full font-bold text-xl hover:bg-accent transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-spin"
      >
        {getSpinButtonText()}
      </Button>

      {/* Result Display */}
      {selectedPrize && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl p-8 border border-border text-center max-w-md"
          data-testid="result-display"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            {selectedPrize.type === 'nothing' ? 'Better Luck Next Time!' : 'Congratulations!'}
          </h3>
          {selectedPrize.type !== 'nothing' && (
            <p className="text-xl text-foreground mb-4">
              You won: <span className="text-accent font-bold" data-testid="prize-text">
                {selectedPrize.name}
                {selectedPrize.type === 'credits' && ` (+${selectedPrize.value} Credits)`}
              </span>
            </p>
          )}
          <Button 
            onClick={resetWheel}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors duration-200"
            data-testid="button-spin-again"
          >
            Spin Again
          </Button>
        </motion.div>
      )}
    </div>
  );
}
