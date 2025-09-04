import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Game {
  id: string;
  name: string;
  status: string;
  players: number;
  revenue: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/games");
      if (response.ok) {
        const data = await response.json();
        // Only show active games to public users
        setGames(data.filter((game: Game) => game.status === 'active'));
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const getGameImage = () => {
    return 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400';
  };

  const playGame = (gameId: string, gameName: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to play games");
      return;
    }

    // Redirect to spin-wheel page for spin-wheel game
    if (gameName.toLowerCase().includes('spin') || gameName.toLowerCase().includes('wheel')) {
      window.location.href = '/spin-wheel';
    } else {
      // For other games, you can add different routes
      console.log(`Playing game: ${gameName}`);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl font-serif font-bold text-center text-primary mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-testid="games-page-title"
        >
          Game Collection
        </motion.h1>
        
        {/* Games Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No games available at the moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card rounded-2xl border border-border overflow-hidden" data-testid={`game-card-${game.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={getGameImage()} 
                      alt={`${game.name} preview`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-serif font-bold text-primary">{game.name}</h2>
                      <Badge className="bg-blue-100 text-blue-800">Game</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{game.description}</p>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>{game.players.toLocaleString()} players</span>
                      <span>${game.revenue.toLocaleString()} revenue</span>
                    </div>
                    <Button 
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition-colors duration-200"
                      data-testid={`button-play-${game.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => playGame(game.id, game.name)}
                    >
                      Play {game.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
