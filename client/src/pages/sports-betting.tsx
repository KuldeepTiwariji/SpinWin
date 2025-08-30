import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { mockSportsMatches, mockUser, type SportsMatch } from "@/lib/mockData";

export default function SportsBetting() {
  const [matches, setMatches] = useState(mockSportsMatches);
  const [user, setUser] = useState(mockUser);
  const [selectedBet, setSelectedBet] = useState<{match: SportsMatch, type: string, odds: number} | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");

  const placeBet = () => {
    if (!selectedBet || !betAmount) return;

    const amount = parseFloat(betAmount);
    if (amount <= 0 || amount > user.balance) return;

    setUser({ ...user, balance: user.balance - amount });
    setBetAmount("");
    setSelectedBet(null);
    alert(`Bet placed: $${amount} on ${selectedBet.match.homeTeam} vs ${selectedBet.match.awayTeam}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-500";
      case "live": return "bg-red-500";
      case "finished": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case "football": return "fas fa-futbol";
      case "basketball": return "fas fa-basketball-ball";
      case "tennis": return "fas fa-table-tennis";
      default: return "fas fa-trophy";
    }
  };

  const filteredMatches = matches.filter(match => match.status === activeTab);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className=" p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sports Betting</h1>
            <p className="text-muted-foreground">Place bets on your favorite sports</p>
          </div>

          {/* Balance Display */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="fas fa-wallet text-2xl text-green-500"></i>
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold text-green-500">${user.balance.toFixed(2)}</p>
                </div>
              </div>
              <Button variant="outline" className="border-green-500/50">
                <i className="fas fa-plus mr-2"></i>
                Add Funds
              </Button>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
            {["upcoming", "live", "finished"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Matches */}
          <div className="grid gap-4">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <i className={`${getSportIcon(match.sport)} text-2xl text-primary`}></i>
                    <div>
                      <h3 className="text-lg font-bold">{match.homeTeam} vs {match.awayTeam}</h3>
                      <p className="text-sm text-muted-foreground">
                        {match.date.toLocaleDateString()} at {match.date.toLocaleTimeString()}
                      </p>
                      {match.score && (
                        <p className="text-sm font-medium text-primary">Score: {match.score}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(match.status)} text-white capitalize`}>
                    {match.status}
                  </Badge>
                </div>

                {match.status === "upcoming" || match.status === "live" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-4 h-auto flex flex-col border-green-500/50 hover:bg-green-500/10"
                          onClick={() => setSelectedBet({match, type: `${match.homeTeam} Win`, odds: match.homeOdds})}
                        >
                          <span className="font-medium">{match.homeTeam}</span>
                          <span className="text-2xl font-bold text-green-500">{match.homeOdds}</span>
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    {match.drawOdds && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="p-4 h-auto flex flex-col border-yellow-500/50 hover:bg-yellow-500/10"
                            onClick={() => setSelectedBet({match, type: "Draw", odds: match.drawOdds!})}
                          >
                            <span className="font-medium">Draw</span>
                            <span className="text-2xl font-bold text-yellow-500">{match.drawOdds}</span>
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-4 h-auto flex flex-col border-blue-500/50 hover:bg-blue-500/10"
                          onClick={() => setSelectedBet({match, type: `${match.awayTeam} Win`, odds: match.awayOdds})}
                        >
                          <span className="font-medium">{match.awayTeam}</span>
                          <span className="text-2xl font-bold text-blue-500">{match.awayOdds}</span>
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Match finished - No betting available
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Bet Dialog */}
          {selectedBet && (
            <Dialog open={!!selectedBet} onOpenChange={() => setSelectedBet(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Place Bet</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">{selectedBet.match.homeTeam} vs {selectedBet.match.awayTeam}</p>
                    <p className="text-sm text-muted-foreground">Betting on: {selectedBet.type}</p>
                    <p className="text-lg font-bold">Odds: {selectedBet.odds}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bet Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                    />
                  </div>

                  {betAmount && (
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <p className="text-sm">Potential payout:
                        <span className="font-bold text-green-500 ml-1">
                          ${(parseFloat(betAmount) * selectedBet.odds).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={placeBet}
                    className="w-full"
                    disabled={!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > user.balance}
                  >
                    Place Bet
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
}