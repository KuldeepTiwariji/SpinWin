
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SpinResult {
  number: number;
  color: string;
  prize: number;
}

export default function SpinWheel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Demo Player", balance: 5000 });
  const [betAmount, setBetAmount] = useState(10);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);
  const [gameHistory, setGameHistory] = useState<SpinResult[]>([]);

  const numbers = Array.from({ length: 37 }, (_, i) => i); // 0-36
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  
  const getNumberColor = (num: number) => {
    if (num === 0) return "green";
    return redNumbers.includes(num) ? "red" : "black";
  };

  const handleStaticLogin = () => {
    // Static login - no actual authentication
    setIsLoggedIn(true);
    setCurrentUser({ name: "Demo Player", balance: 1000 });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGameHistory([]);
    setLastResult(null);
  };

  const spinWheel = () => {
    if (!isLoggedIn) {
      alert("Please login to play!");
      return;
    }

    

    if (!selectedNumber && !selectedColor) {
      alert("Please select a number or color to bet on!");
      return;
    }

    if (betAmount < 1) {
      alert("Minimum bet is 1!");
      return;
    }

    setIsSpinning(true);
    
    // Random spin rotation (multiple full rotations + random position)
    const spins = Math.floor(Math.random() * 5) + 5; // 5-9 full rotations
    const finalPosition = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + finalPosition;
    
    setRotation(totalRotation);

    setTimeout(() => {
      // Calculate winning number based on final position
      const normalizedPosition = (360 - (totalRotation % 360)) % 360;
      const sectionSize = 360 / 37;
      const winningNumber = Math.floor(normalizedPosition / sectionSize);
      
      const result: SpinResult = {
        number: winningNumber,
        color: getNumberColor(winningNumber),
        prize: 0
      };

      // Calculate winnings
      let winnings = 0;
      if (selectedNumber !== null && selectedNumber === winningNumber) {
        winnings = betAmount * 35; // 35:1 payout for straight number bet
        result.prize = winnings;
      }

      setLastResult(result);
      setGameHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
      setIsSpinning(false);
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-20 lg:ml-64 min-h-screen">
          <Header onSearchChange={() => {}} />
          
          <main className="p-6 flex items-center justify-center min-h-[80vh]">
            <Card className="p-8 max-w-md w-full text-center">
              <div className="mb-6">
                <i className="fas fa-dharmachakra text-6xl text-primary mb-4"></i>
                <h1 className="text-3xl font-bold mb-2">Spin Wheel Casino</h1>
                <p className="text-muted-foreground">
                  Welcome to the ultimate spinning experience! Place your bets and win big.
                </p>
              </div>
              
              <Button 
                onClick={handleStaticLogin}
                className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login to Play
              </Button>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Static Demo Login - No registration required
              </div>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64 min-h-screen">
        <Header onSearchChange={() => {}} />
        
        <main className="p-6">
          {/* User Info Bar */}
          <div className="mb-6 flex justify-between items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold">{currentUser.name}</h3>
                <p className="text-sm text-muted-foreground">Balance: ${currentUser.balance}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Spin Wheel */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 border-2 border-gradient-to-r border-yellow-500/30 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                    🎰 Spin Wheel Casino
                  </h2>
                  <p className="text-lg text-muted-foreground">Place your bet and spin to win!</p>
                </div>
                
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 blur-xl opacity-30 animate-pulse"></div>
                    
                    {/* Main wheel */}
                    <div 
                      className={`relative w-96 h-96 rounded-full border-8 border-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-2xl transition-transform duration-[4000ms] ease-out ${isSpinning ? '' : ''}`}
                      style={{ 
                        transform: `rotate(${rotation}deg)`,
                        background: 'conic-gradient(from 0deg, #dc2626, #000000, #16a34a, #dc2626, #000000, #16a34a)',
                        boxShadow: '0 0 50px rgba(255, 215, 0, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {/* Wheel segments */}
                      {numbers.map((num, index) => {
                        const angle = (360 / 37) * index;
                        const color = getNumberColor(num);
                        return (
                          <div
                            key={num}
                            className={`absolute w-full h-full ${
                              color === 'red' ? 'bg-red-600' : 
                              color === 'black' ? 'bg-gray-900' : 'bg-green-600'
                            } opacity-90`}
                            style={{
                              transform: `rotate(${angle}deg)`,
                              clipPath: 'polygon(50% 50%, 50% 0%, 52.7% 0%)',
                              borderRadius: '50%'
                            }}
                          >
                            <div 
                              className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg drop-shadow-lg"
                              style={{ transform: `rotate(${-angle}deg)` }}
                            >
                              {num}
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Center hub */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                        <i className="fas fa-star text-white text-2xl"></i>
                      </div>
                    </div>
                    
                    {/* Enhanced Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                      <div className="relative">
                        <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-transparent border-b-yellow-400 drop-shadow-lg"></div>
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result Display */}
                {lastResult && (
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-lg border border-purple-500/30">
                      <div className="flex justify-center mb-4">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-white font-bold text-2xl shadow-xl border-4 border-white ${
                          lastResult.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                          lastResult.color === 'black' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-500 to-green-600'
                        }`}>
                          {lastResult.number}
                        </div>
                      </div>
                      
                      {lastResult.prize > 0 ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-400 mb-2 animate-bounce">
                            🎉 WINNER! 🎉
                          </div>
                          <div className="text-2xl font-bold text-green-400">
                            You won ${lastResult.prize}!
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xl font-bold text-red-400 mb-2">
                            Better luck next time!
                          </div>
                          <div className="text-lg text-gray-300">
                            Try again with a new bet
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Betting Panel */}
            <div className="space-y-6">
              {/* Bet Controls */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bet Amount</label>
                    <Input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={currentUser.balance}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Select Number (0-36)</label>
                    <div className="grid grid-cols-6 gap-1 mb-4">
                      {numbers.slice(0, 37).map(num => (
                        <Button
                          key={num}
                          variant={selectedNumber === num ? "default" : "outline"}
                          size="sm"
                          className={`text-xs ${
                            getNumberColor(num) === 'red' ? 'text-red-600' : 
                            getNumberColor(num) === 'black' ? 'text-gray-900' : 'text-green-600'
                          }`}
                          onClick={() => setSelectedNumber(num)}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={spinWheel}
                    disabled={isSpinning || selectedNumber === null}
                    className="w-full text-lg py-6 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                  >
                    {isSpinning ? (
                      <>
                        <i className="fas fa-spinner animate-spin mr-2"></i>
                        Spinning...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play mr-2"></i>
                        Spin (${betAmount})
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Game History */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Results</h3>
                <div className="space-y-2">
                  {gameHistory.length === 0 ? (
                    <p className="text-muted-foreground text-center">No games played yet</p>
                  ) : (
                    gameHistory.map((result, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded bg-muted">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            result.color === 'red' ? 'bg-red-600' : 
                            result.color === 'black' ? 'bg-gray-900' : 'bg-green-600'
                          }`}>
                            {result.number}
                          </div>
                        </div>
                        <div className={`font-semibold ${result.prize > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {result.prize > 0 ? `+$${result.prize}` : `-$${betAmount}`}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
