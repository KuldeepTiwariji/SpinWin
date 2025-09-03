import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/ui/game-card";
import { useLocation } from "wouter";
import { Shield, Gem, Trophy } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const gameCategories = [
    {
      title: "POKER",
      description: "Master the art of strategy",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      route: "/games"
    },
    {
      title: "SLOT MACHINES", 
      description: "Spin your way to fortune",
      image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      route: "/games"
    },
    {
      title: "BLACKJACK",
      description: "Beat the dealer at 21", 
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      route: "/games"
    },
    {
      title: "CRAPS",
      description: "Roll the dice of destiny",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", 
      route: "/games"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Gaming",
      description: "State-of-the-art security ensuring your data and funds are protected"
    },
    {
      icon: Gem,
      title: "Premium Experience", 
      description: "Ashok Gaming gaming environment with premium graphics and smooth gameplay"
    },
    {
      icon: Trophy,
      title: "Big Rewards",
      description: "Generous bonuses and rewards for our valued premium members"
    }
  ];

  return (
    <div className="min-h-screen Ashok Gaming-gradient pt-16">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 floating"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            data-testid="hero-title"
          >
            Ashok Gaming GAMING
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            data-testid="hero-description"
          >
            Experience the pinnacle of opulence and entertainment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button 
              onClick={() => setLocation("/spin-wheel")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-accent transition-all duration-300 hover:gold-glow transform hover:scale-105"
              data-testid="button-play-now"
            >
              PLAY NOW
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Game Categories */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-serif font-bold text-center text-primary mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="games-section-title"
          >
            Premium Games
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gameCategories.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GameCard
                  title={game.title}
                  description={game.description}
                  image={game.image}
                  onPlay={() => setLocation(game.route)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-serif font-bold text-center text-primary mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="features-section-title"
          >
            Why Choose Ashok Gaming Gaming
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
