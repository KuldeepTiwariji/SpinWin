import { type Game, type Category } from "@shared/schema";

export const featuredGames: Game[] = [
  {
    id: "1",
    title: "Warrior Quest",
    description: "Epic medieval adventure game",
    category: "Action",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 48,
    playCount: 15230,
    isNew: 0,
    isFeatured: 1,
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    title: "Neon Racer",
    description: "Futuristic racing experience",
    category: "Racing",
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 46,
    playCount: 12840,
    isNew: 0,
    isFeatured: 1,
    createdAt: new Date("2024-01-10")
  },
  {
    id: "3",
    title: "Magic Puzzles",
    description: "Enchanting puzzle adventures",
    category: "Puzzle",
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 49,
    playCount: 9876,
    isNew: 0,
    isFeatured: 1,
    createdAt: new Date("2024-01-08")
  },
  {
    id: "4",
    title: "Galaxy Shooter",
    description: "Space combat arcade game",
    category: "Arcade",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 47,
    playCount: 18560,
    isNew: 0,
    isFeatured: 1,
    createdAt: new Date("2024-01-05")
  }
];

export const popularGames: Game[] = [
  {
    id: "5",
    title: "Pixel Runner",
    description: "Retro platformer adventure",
    category: "Arcade",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    rating: 45,
    playCount: 25670,
    isNew: 0,
    isFeatured: 0,
    createdAt: new Date("2023-12-20")
  },
  {
    id: "6",
    title: "Soccer Master",
    description: "Ultimate football experience",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    rating: 44,
    playCount: 20130,
    isNew: 0,
    isFeatured: 0,
    createdAt: new Date("2023-12-18")
  },
  {
    id: "7",
    title: "Castle Defense",
    description: "Strategic tower defense",
    category: "Strategy",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    rating: 46,
    playCount: 16780,
    isNew: 0,
    isFeatured: 0,
    createdAt: new Date("2023-12-15")
  },
  {
    id: "8",
    title: "Treasure Hunt",
    description: "Adventure treasure seeking",
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    rating: 48,
    playCount: 14320,
    isNew: 0,
    isFeatured: 0,
    createdAt: new Date("2023-12-12")
  },
  {
    id: "9",
    title: "Robot Wars",
    description: "Futuristic combat simulator",
    category: "Action",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    rating: 47,
    playCount: 19450,
    isNew: 0,
    isFeatured: 0,
    createdAt: new Date("2023-12-10")
  },
  {
    id: "10",
    title: "Bike Rush",
    description: "High-speed motorcycle racing",
    category: "Racing",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    rating: 45,
    playCount: 11230,
    isNew: 0,
    isFeatured: 0,
    createdAt: new Date("2023-12-08")
  }
];

export const newGames: Game[] = [
  {
    id: "11",
    title: "Cyber Strike",
    description: "Cyberpunk action adventure",
    category: "Action",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 46,
    playCount: 3240,
    isNew: 1,
    isFeatured: 0,
    createdAt: new Date("2024-01-28")
  },
  {
    id: "12",
    title: "Dragon Realm",
    description: "Fantasy RPG with magical creatures",
    category: "RPG",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 47,
    playCount: 2140,
    isNew: 1,
    isFeatured: 0,
    createdAt: new Date("2024-01-25")
  },
  {
    id: "13",
    title: "Space Explorer",
    description: "Deep space exploration adventure",
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 45,
    playCount: 1890,
    isNew: 1,
    isFeatured: 0,
    createdAt: new Date("2024-01-23")
  },
  {
    id: "14",
    title: "City Builder",
    description: "Urban simulation and management",
    category: "Simulation",
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 48,
    playCount: 4560,
    isNew: 1,
    isFeatured: 0,
    createdAt: new Date("2024-01-23")
  }
];

export const gameCategories: Category[] = [
  {
    id: "1",
    name: "Action",
    icon: "fas fa-crosshairs",
    color: "from-red-500/20 to-orange-500/20 border-red-500/30",
    gameCount: 234
  },
  {
    id: "2",
    name: "Puzzle",
    icon: "fas fa-puzzle-piece",
    color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    gameCount: 189
  },
  {
    id: "3",
    name: "Racing",
    icon: "fas fa-car",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    gameCount: 156
  },
  {
    id: "4",
    name: "Sports",
    icon: "fas fa-futbol",
    color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
    gameCount: 142
  },
  {
    id: "5",
    name: "Arcade",
    icon: "fas fa-dice",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    gameCount: 198
  },
  {
    id: "6",
    name: "Strategy",
    icon: "fas fa-chess",
    color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
    gameCount: 87
  }
];

export const navigationItems = [
  { name: "Home", icon: "fas fa-home", href: "/" },
  { name: "Popular", icon: "fas fa-fire", href: "/popular" },
  { name: "Featured", icon: "fas fa-star", href: "/featured" },
  { name: "Recent", icon: "fas fa-clock", href: "/recent" }
];
