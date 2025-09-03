import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Games() {
  const gameCategories = [
    {
      title: "Poker Games",
      description: "Experience the ultimate poker challenge with Texas Hold'em, Omaha, and more variants.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      variants: [
        { name: "Texas Hold'em", type: "Classic variant" },
        { name: "Omaha", type: "Four-card action" }
      ]
    },
    {
      title: "Slot Machines", 
      description: "Spin the reels of fortune with our collection of premium slot games.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      variants: [
        { name: "Classic Slots", type: "Traditional style" },
        { name: "Video Slots", type: "Modern themes" }
      ]
    },
    {
      title: "Blackjack Tables",
      description: "Challenge the dealer and master the game of 21 with perfect strategy.",
      image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      variants: [
        { name: "Classic 21", type: "Traditional rules" },
        { name: "VIP Tables", type: "High stakes" }
      ]
    },
    {
      title: "Craps Tables",
      description: "Roll the dice and experience the excitement of this classic casino game.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      variants: [
        { name: "Standard Craps", type: "Classic gameplay" },
        { name: "High Roller", type: "Premium tables" }
      ]
    }
  ];

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
        
        {/* Game Categories Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {gameCategories.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-card rounded-2xl border border-border overflow-hidden" data-testid={`game-category-${game.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={`${game.title} preview`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-4">{game.title}</h2>
                  <p className="text-muted-foreground mb-6">{game.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {game.variants.map((variant) => (
                      <div key={variant.name} className="bg-muted/20 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-primary">{variant.name}</h4>
                        <p className="text-sm text-muted-foreground">{variant.type}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition-colors duration-200"
                    data-testid={`button-play-${game.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Play {game.title.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
