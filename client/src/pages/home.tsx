import { useState, useMemo } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { GameCard } from "@/components/game-card";
import { CategoryCard } from "@/components/category-card";
import { featuredGames, popularGames, newGames, gameCategories } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeaturedGames = useMemo(() => {
    if (!searchQuery) return featuredGames;
    return featuredGames.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredPopularGames = useMemo(() => {
    if (!searchQuery) return popularGames;
    return popularGames.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredNewGames = useMemo(() => {
    if (!searchQuery) return newGames;
    return newGames.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameClick = (gameId: string) => {
    console.log(`Game ${gameId} clicked - navigation to be implemented`);
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Category ${categoryName} clicked - filtering to be implemented`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-20 lg:ml-64 min-h-screen">
        <Header onSearchChange={setSearchQuery} />
        
        <main className="p-6">
          {/* Hero Banner */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 border border-primary/20" data-testid="hero-banner">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 mb-6 lg:mb-0">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    <span className="gradient-text" data-testid="text-hero-title">4000+ Free Games</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6" data-testid="text-hero-subtitle">
                    No downloads, no installs. Play instantly on any device!
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-download text-primary"></i>
                      <span>No install needed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-mobile-alt text-primary"></i>
                      <span>On any device</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-users text-primary"></i>
                      <span>Play with friends</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="Gaming character with VR headset" 
                    className="rounded-xl w-full h-auto"
                    data-testid="img-hero"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured Games */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" data-testid="text-featured-title">Our Top Games</h2>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary/80 font-medium"
                data-testid="button-view-all-featured"
              >
                View all
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-featured-games">
              {filteredFeaturedGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => handleGameClick(game.id)}
                />
              ))}
            </div>
          </section>
          
          {/* Popular Games Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" data-testid="text-popular-title">Popular This Week</h2>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary/80 font-medium"
                data-testid="button-view-all-popular"
              >
                View all
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4" data-testid="grid-popular-games">
              {filteredPopularGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  size="small"
                  onClick={() => handleGameClick(game.id)}
                />
              ))}
            </div>
          </section>
          
          {/* Categories Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" data-testid="text-categories-title">Browse by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" data-testid="grid-categories">
              {gameCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category.name)}
                />
              ))}
            </div>
          </section>
          
          {/* New Releases */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" data-testid="text-new-releases-title">New Releases</h2>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary/80 font-medium"
                data-testid="button-view-all-new"
              >
                View all
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-new-games">
              {filteredNewGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => handleGameClick(game.id)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
