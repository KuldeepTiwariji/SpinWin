import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/ui/game-card";
import { Slider } from "@/components/ui/slider";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLocation } from "wouter";
import { Shield, Gem, Trophy } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [betAmount, setBetAmount] = useState([100]);

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
      {/* Hero Carousel Banner */}
      <div className="relative max-h-screen flex items-center justify-center px-4">
        <div className="max-w-12xl mx-auto w-full">
          <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
            <CarouselContent>
              <CarouselItem>
                <motion.div 
                  className="relative bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-12 text-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800')] bg-cover bg-center opacity-20"></div>
                  <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Welcome to Premium Gaming</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">Experience luxury casino gaming like never before</p>
                    <Button 
                      onClick={() => setLocation("/games")}
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-accent transition-all duration-300 hover:gold-glow transform hover:scale-105"
                    >
                      EXPLORE GAMES
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
              
              <CarouselItem>
                <motion.div 
                  className="relative bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl p-12 text-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800')] bg-cover bg-center opacity-20"></div>
                  <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Spin the Fortune Wheel</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">Try your luck with our exciting spin wheel game</p>
                    <Button 
                      onClick={() => setLocation("/spin-wheel")}
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-accent transition-all duration-300 hover:gold-glow transform hover:scale-105"
                      data-testid="button-play-now"
                    >
                      SPIN NOW
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
              
              <CarouselItem>
                <motion.div 
                  className="relative bg-gradient-to-r from-secondary/20 to-primary/20 rounded-3xl p-12 text-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800')] bg-cover bg-center opacity-20"></div>
                  <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Big Rewards Await</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">Join thousands of winners and claim your prizes</p>
                    <Button 
                      onClick={() => setLocation("/wallet")}
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-accent transition-all duration-300 hover:gold-glow transform hover:scale-105"
                    >
                      VIEW REWARDS
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
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

      {/* Slider Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-serif font-bold text-center text-primary mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Experience Premium Gaming
          </motion.h2>
          <motion.div 
            className="bg-card rounded-2xl p-8 border border-border"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-primary mb-4">Bet Amount</h3>
                <p className="text-muted-foreground mb-6">Adjust your betting amount for the ultimate gaming experience</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Amount (USDT)</span>
                    <span className="text-lg font-bold text-primary">${betAmount[0]}</span>
                  </div>
                  <div className="px-4">
                    <Slider
                      value={betAmount}
                      onValueChange={setBetAmount}
                      max={500}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$1</span>
                    <span>$500</span>
                  </div>
                </div>
                <div className="text-center">
                  <Button 
                    onClick={() => setLocation("/vault")}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all duration-300 hover:gold-glow transform hover:scale-105"
                  >
                    Start Gaming
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
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
