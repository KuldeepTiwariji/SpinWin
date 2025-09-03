import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Prize {
  name: string;
  credits: number;
  color: string;
}

const prizes: Prize[] = [
  { name: 'Golden Bonus', credits: 1000, color: '#FFD700' },
  { name: 'Lucky Seven', credits: 777, color: '#DC2626' },
  { name: 'Jackpot', credits: 5000, color: '#16A34A' },
  { name: 'Mega Win', credits: 2500, color: '#2563EB' },
  { name: 'Bronze Prize', credits: 100, color: '#CD7F32' },
  { name: 'Silver Prize', credits: 500, color: '#C0C0C0' },
  { name: 'Diamond Bonus', credits: 1500, color: '#A855F7' },
  { name: 'Royal Prize', credits: 3000, color: '#F59E0B' }
];

interface SpinWheelProps {
  onSpin?: (prize: Prize) => void;
}

export default function SpinWheel({ onSpin }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    // Random prize selection
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    // Calculate rotation (multiple full spins + random position)
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const prizeAngle = (360 / prizes.length) * prizes.indexOf(randomPrize);
    const finalRotation = rotation + spins * 360 + prizeAngle;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(randomPrize);
      onSpin?.(randomPrize);
    }, 3000);
  };

  const resetWheel = () => {
    setSelectedPrize(null);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Spin Wheel */}
      <div className="relative">
        <motion.div
          className="w-80 h-80 rounded-full border-8 border-primary relative"
          style={{
            background: `conic-gradient(
              from 0deg,
              ${prizes.map((prize, index) => 
                `${prize.color} ${(index * 360) / prizes.length}deg ${((index + 1) * 360) / prizes.length}deg`
              ).join(', ')}
            )`
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
          data-testid="spin-wheel"
        >
          {/* Center hub */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Star className="text-primary-foreground text-2xl" />
            </div>
          </div>
          
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
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
        {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
      </Button>

      {/* Result Display */}
      {selectedPrize && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl p-8 border border-border text-center"
          data-testid="result-display"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">Congratulations!</h3>
          <p className="text-xl text-foreground mb-4">
            You won: <span className="text-accent font-bold" data-testid="prize-text">
              {selectedPrize.name} - {selectedPrize.credits} Credits
            </span>
          </p>
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
