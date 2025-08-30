import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { mockBetHistory, type BetHistory } from "@/lib/mockData";

export default function BetHistoryPage() {
  const [betHistory, setBetHistory] = useState(mockBetHistory);
  const [filter, setFilter] = useState<'all' | 'win' | 'loss' | 'pending'>('all');

  const getResultColor = (result: string) => {
    switch (result) {
      case "win": return "bg-green-500";
      case "loss": return "bg-red-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getGameIcon = (game: string) => {
    if (game.includes("Spin Wheel")) return "fas fa-circle-notch";
    if (game.includes("Sports")) return "fas fa-futbol";
    return "fas fa-dice";
  };

  const filteredHistory = filter === 'all' 
    ? mockBetHistory 
    : mockBetHistory.filter(bet => bet.result === filter);

  const totalBets = betHistory.length;
  const totalAmount = betHistory.reduce((sum, bet) => sum + bet.amount, 0);
  const totalWinnings = betHistory.reduce((sum, bet) => sum + (bet.payout || 0), 0);
  const winRate = (betHistory.filter(bet => bet.result === "win").length / totalBets * 100).toFixed(1);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header onSearchChange={() => {}} />
        <main className=" p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bet History</h1>
            <p className="text-muted-foreground">Track your betting performance</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center">
              <i className="fas fa-dice text-3xl text-blue-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Total Bets</h3>
              <p className="text-3xl font-bold">{totalBets}</p>
            </Card>

            <Card className="p-6 text-center">
              <i className="fas fa-money-bill text-3xl text-red-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Total Wagered</h3>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </Card>

            <Card className="p-6 text-center">
              <i className="fas fa-trophy text-3xl text-green-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Total Winnings</h3>
              <p className="text-2xl font-bold text-green-500">${totalWinnings.toFixed(2)}</p>
            </Card>

            <Card className="p-6 text-center">
              <i className="fas fa-percentage text-3xl text-purple-500 mb-3"></i>
              <h3 className="text-lg font-semibold text-muted-foreground">Win Rate</h3>
              <p className="text-2xl font-bold">{winRate}%</p>
            </Card>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-6">
            {["all", "win", "loss", "pending"].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                onClick={() => setFilter(filterType)}
                className="capitalize"
              >
                {filterType === "all" ? "All Bets" : filterType}
              </Button>
            ))}
          </div>

          {/* Bet History List */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-history mr-2"></i>
              Betting History
            </h3>

            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <i className="fas fa-search text-4xl mb-4"></i>
                <p>No bets found for the selected filter</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((bet) => (
                  <div key={bet.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <i className={`${getGameIcon(bet.game)} text-2xl text-primary`}></i>
                        <div>
                          <h4 className="font-semibold">{bet.game}</h4>
                          <p className="text-sm text-muted-foreground">{bet.betType}</p>
                          <p className="text-xs text-muted-foreground">
                            {bet.date.toLocaleDateString()} at {bet.date.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="font-medium">Bet: ${bet.amount.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">Odds: {bet.odds}x</p>
                            {bet.payout && (
                              <p className="text-sm font-medium text-green-500">
                                Payout: ${bet.payout.toFixed(2)}
                              </p>
                            )}
                          </div>
                          <Badge className={`${getResultColor(bet.result)} text-white capitalize`}>
                            {bet.result}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}