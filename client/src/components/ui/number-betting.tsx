

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Input } from './input';
import { Label } from './label';
import { Coins, Target, TrendingUp, Zap } from 'lucide-react';

interface NumberBettingProps {
  onSpin: (result: any) => void;
  userBalance: number;
}

const NumberBetting: React.FC<NumberBettingProps> = ({ onSpin, userBalance }) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(50);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [rotation, setRotation] = useState(0);
  const [showNumberWheel, setShowNumberWheel] = useState(false);

  const getMultiplier = (userNumber: number, winningNumber: number) => {
    const difference = Math.abs(userNumber - winningNumber);
    if (difference === 0) return 50; // Exact match
    if (difference === 1) return 10; // 1 number away
    if (difference <= 3) return 5;   // 2-3 numbers away
    if (difference <= 5) return 2;   // 4-5 numbers away
    return 0; // No win
  };

  // Generate numbers 1-100 for the wheel
  const generateNumbers = () => {
    return Array.from({ length: 100 }, (_, i) => i + 1);
  };

  const spinWheel = async () => {
    if (isSpinning || betAmount > userBalance || betAmount < 10) return;

    setIsSpinning(true);
    setResult(null);

    // Generate random winning number (1-100)
    const winningNumber = Math.floor(Math.random() * 100) + 1;
    const multiplier = getMultiplier(selectedNumber, winningNumber);
    const winAmount = multiplier * betAmount;

    // Add multiple rotations for effect
    const fullRotations = 5 + Math.random() * 3;
    const finalRotation = rotation + (fullRotations * 360);
    setRotation(finalRotation);

    // Wait for animation
    setTimeout(() => {
      const gameResult = {
        userNumber: selectedNumber,
        winningNumber,
        betAmount,
        multiplier,
        winAmount,
        difference: Math.abs(selectedNumber - winningNumber),
        isWin: multiplier > 0
      };

      setIsSpinning(false);
      setResult(gameResult);
      onSpin(gameResult);
    }, 3000);
  };

  const getResultColor = (multiplier: number) => {
    if (multiplier >= 50) return "from-green-500 to-emerald-600";
    if (multiplier >= 10) return "from-blue-500 to-cyan-600";
    if (multiplier >= 5) return "from-yellow-500 to-amber-600";
    if (multiplier >= 2) return "from-orange-500 to-red-500";
    return "from-gray-500 to-slate-600";
  };

  const numbers = generateNumbers();

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main Spin Wheel */}
      <div className="relative">
        <motion.div
          className="relative w-80 h-80 rounded-full border-8 border-gray-800 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center"
          animate={{ rotate: rotation }}
          transition={{ 
            duration: isSpinning ? 3 : 0, 
            ease: isSpinning ? "easeOut" : "linear" 
          }}
        >
          <div className="text-center text-white">
            <div className="text-6xl font-bold mb-2">
              {result && !isSpinning ? result.winningNumber : '?'}
            </div>
            <div className="text-lg font-medium">
              {isSpinning ? 'Spinning...' : result ? 'Lucky Number' : 'Your Lucky Number'}
            </div>
          </div>
        </motion.div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-6 h-8 bg-red-500 clip-path-triangle shadow-lg"></div>
        </div>
      </div>

      {/* Number Selection Wheel */}
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <Button
              onClick={() => setShowNumberWheel(!showNumberWheel)}
              variant="outline"
              className="mb-4"
            >
              {showNumberWheel ? 'Hide Number Wheel' : 'Show Number Wheel (1-100)'}
            </Button>
          </div>
          
          {showNumberWheel && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-center">Select Your Lucky Number (1-100)</h3>
              <div className="grid grid-cols-10 gap-1 max-h-64 overflow-y-auto border rounded-lg p-2">
                {numbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setSelectedNumber(number)}
                    className={`
                      w-8 h-8 rounded text-xs font-semibold transition-all duration-200
                      ${selectedNumber === number 
                        ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }
                    `}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="number">Your Selected Lucky Number</Label>
              <Input
                id="number"
                type="number"
                min="1"
                max="100"
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="text-center text-2xl font-bold text-blue-600"
              />
            </div>
            
            <div>
              <Label htmlFor="bet">Bet Amount (Min: 10 Credits)</Label>
              <Input
                id="bet"
                type="number"
                min="10"
                max={userBalance}
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(10, Math.min(userBalance, parseInt(e.target.value) || 10)))}
                className="text-center text-lg font-bold"
              />
            </div>

            <div className="flex justify-between text-sm text-muted-foreground bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">Your Lucky Number: <span className="text-blue-600 text-lg">{selectedNumber}</span></span>
              <span className="font-semibold">Bet Amount: <span className="text-green-600">{betAmount} Credits</span></span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Number Selection */}
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <h4 className="text-center font-semibold mb-3">Quick Select Lucky Numbers</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[7, 13, 21, 33, 42, 50, 66, 77, 88, 99].map((num) => (
              <Button
                key={num}
                onClick={() => setSelectedNumber(num)}
                variant={selectedNumber === num ? "default" : "outline"}
                size="sm"
                className="w-12 h-10"
              >
                {num}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning || betAmount > userBalance || betAmount < 10}
        className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {isSpinning ? 'Finding Your Lucky Number...' : 'SPIN FOR LUCK!'}
      </Button>

      {/* Result Display */}
      {result && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-md"
        >
          <Card className={`p-6 bg-gradient-to-r ${getResultColor(result.multiplier)} text-white`}>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                  {result.isWin ? '🎉 Winner! 🎉' : '😔 Better Luck Next Time'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-3xl font-bold">{result.userNumber}</div>
                  <div className="text-sm opacity-90">Your Lucky Number</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-3xl font-bold">{result.winningNumber}</div>
                  <div className="text-sm opacity-90">Winning Number</div>
                </div>
              </div>

              <div className="text-center space-y-2 bg-white/20 rounded-lg p-4">
                <div className="text-lg">
                  Difference: <span className="font-bold">{result.difference} numbers</span>
                </div>
                {result.isWin && (
                  <>
                    <div className="text-lg">
                      Multiplier: <span className="font-bold text-yellow-300">{result.multiplier}x</span>
                    </div>
                    <div className="text-2xl font-bold text-green-300">
                      Won: {result.winAmount} Credits!
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default NumberBetting;

