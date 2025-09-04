import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Coins, Gift, Zap } from 'lucide-react';

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
  onSpin: (result: any) => void;
}

const defaultPrizes: Prize[] = [
  { id: '1', name: "100 Credits", type: "credits", value: 100, probability: 30, color: "#FF6B6B", active: true },
  { id: '2', name: "500 Credits", type: "credits", value: 500, probability: 20, color: "#4ECDC4", active: true },
  { id: '3', name: "1000 Credits", type: "credits", value: 1000, probability: 15, color: "#45B7D1", active: true },
  { id: '4', name: "Free Spin", type: "bonus", value: 1, probability: 10, color: "#96CEB4", active: true },
  { id: '5', name: "2x Multiplier", type: "multiplier", value: 2, probability: 10, color: "#FFEAA7", active: true },
  { id: '6', name: "Jackpot", type: "credits", value: 5000, probability: 5, color: "#DDA0DD", active: true },
  { id: '7', name: "Better Luck", type: "nothing", value: 0, probability: 10, color: "#95A5A6", active: true },
];

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<Prize | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const activePrizes = defaultPrizes.filter(prize => prize.active);
  const segmentAngle = 360 / activePrizes.length;

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Calculate weighted random selection
    const totalProbability = activePrizes.reduce((sum, prize) => sum + prize.probability, 0);
    const random = Math.random() * totalProbability;
    let accumulator = 0;
    let selectedPrize = activePrizes[0];

    for (const prize of activePrizes) {
      accumulator += prize.probability;
      if (random <= accumulator) {
        selectedPrize = prize;
        break;
      }
    }

    // Calculate the angle for the selected prize
    const prizeIndex = activePrizes.indexOf(selectedPrize);
    const targetAngle = (prizeIndex * segmentAngle) + (segmentAngle / 2);

    // Add multiple full rotations for dramatic effect
    const fullRotations = 5 + Math.random() * 3; // 5-8 rotations
    const finalRotation = rotation + (fullRotations * 360) + (360 - targetAngle);

    setRotation(finalRotation);

    // Wait for animation to complete
    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedPrize);
      onSpin(selectedPrize);
    }, 3000);
  };

  const getPrizeIcon = (type: string) => {
    switch (type) {
      case 'credits':
        return <Coins className="w-4 h-4" />;
      case 'bonus':
        return <Gift className="w-4 h-4" />;
      case 'multiplier':
        return <Zap className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-6 h-8 bg-red-500 clip-path-triangle shadow-lg"></div>
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full border-8 border-gray-800 shadow-2xl overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ 
            duration: isSpinning ? 3 : 0, 
            ease: isSpinning ? "easeOut" : "linear" 
          }}
        >
          {activePrizes.map((prize, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const midAngle = (startAngle + endAngle) / 2;

            return (
              <div
                key={prize.id}
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: `conic-gradient(from ${startAngle}deg, ${prize.color} ${startAngle}deg, ${prize.color} ${endAngle}deg, transparent ${endAngle}deg)`,
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`
                }}
              >
                <div
                  className="absolute text-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${50 + 35 * Math.cos((midAngle - 90) * Math.PI / 180)}%`,
                    top: `${50 + 35 * Math.sin((midAngle - 90) * Math.PI / 180)}%`,
                    transform: `translate(-50%, -50%) rotate(${midAngle}deg)`
                  }}
                >
                  <div className="flex flex-col items-center space-y-1">
                    {getPrizeIcon(prize.type)}
                    <span className="text-xs">{prize.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
      </Button>

      {/* Result Display */}
      {result && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="flex flex-col items-center space-y-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                🎉 Congratulations! 🎉
              </Badge>
              <div className="flex items-center space-x-2">
                {getPrizeIcon(result.type)}
                <span className="text-xl font-bold">{result.name}</span>
              </div>
              {result.type === 'credits' && (
                <p className="text-sm opacity-90">+{result.value} credits added to your account!</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export { SpinWheel };
export default SpinWheel;