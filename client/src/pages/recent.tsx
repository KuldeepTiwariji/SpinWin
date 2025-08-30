
import { useState, useMemo } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { GameCard } from "@/components/game-card";
import { newGames } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function Recent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

  const filteredAndSortedGames = useMemo(() => {
    let filtered = newGames;
    
    if (searchQuery) {
      filtered = newGames.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return b.rating - a.rating;
    });
  }, [searchQuery, sortBy]);

  const handleGameClick = (gameId: string) => {
    console.log(`Game ${gameId} clicked - navigation to be implemented`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-20 lg:ml-64 min-h-screen">
        <Header onSearchChange={setSearchQuery} />
        
        <main className="p-6">
          {/* Page Header */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2" data-testid="text-recent-title">
                  Recent Games
                </h1>
                <p className="text-muted-foreground" data-testid="text-recent-subtitle">
                  Latest additions to our gaming collection
                </p>
              </div>
              
              {/* Sort Controls */}
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("date")}
                  data-testid="button-sort-date"
                >
                  <i className="fas fa-clock mr-2"></i>
                  Newest First
                </Button>
                <Button
                  variant={sortBy === "rating" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("rating")}
                  data-testid="button-sort-rating"
                >
                  <i className="fas fa-star mr-2"></i>
                  Highest Rated
                </Button>
              </div>
            </div>
          </section>

          {/* Stats Banner */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    <i className="fas fa-plus text-green-500 mr-2"></i>
                    {newGames.length}
                  </div>
                  <div className="text-sm text-muted-foreground">New Games</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {(newGames.reduce((total, game) => total + game.rating, 0) / newGames.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {newGames.reduce((total, game) => total + game.playCount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Plays</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Games Grid */}
          <section>
            {filteredAndSortedGames.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <i className="fas fa-search text-4xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query or browse all games.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-recent-games">
                {filteredAndSortedGames.map((game, index) => (
                  <div key={game.id} className="relative">
                    {/* New Badge */}
                    <div className="absolute -top-2 -left-2 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-3 py-1 text-xs font-bold">
                      NEW
                    </div>
                    <GameCard
                      game={game}
                      onClick={() => handleGameClick(game.id)}
                      showStats={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
