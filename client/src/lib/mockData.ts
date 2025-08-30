
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
    id: "15",
    title: "Spin Wheel Casino",
    description: "Classic casino wheel betting game",
    category: "Casino",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    rating: 49,
    playCount: 5670,
    isNew: 1,
    isFeatured: 1,
    createdAt: new Date("2024-01-30")
  },
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
  },
  {
    id: "7",
    name: "Casino",
    icon: "fas fa-coins",
    color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    gameCount: 24
  }
];

export const navigationItems = [
  { name: "Home", icon: "fas fa-home", href: "/" },
  { name: "Popular", icon: "fas fa-fire", href: "/popular" },
  { name: "Featured", icon: "fas fa-star", href: "/featured" },
  { name: "Recent", icon: "fas fa-clock", href: "/recent" },
  { name: "Sports Betting", icon: "fas fa-futbol", href: "/sports-betting" },
  { name: "Wallet", icon: "fas fa-wallet", href: "/wallet" },
  { name: "Bet History", icon: "fas fa-history", href: "/bet-history" }
];

// Betting Application Data
export interface BetHistory {
  id: string;
  game: string;
  betType: string;
  amount: number;
  odds: number;
  result: 'win' | 'loss' | 'pending';
  payout?: number;
  date: Date;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface SportsMatch {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  awayOdds: number;
  drawOdds?: number;
  date: Date;
  status: 'upcoming' | 'live' | 'finished';
  score?: string;
}

export const mockUser = {
  id: "1",
  name: "Demo Player",
  email: "demo@example.com",
  balance: 5000,
  totalDeposits: 10000,
  totalWithdrawals: 3000,
  totalBets: 2000,
  totalWinnings: 2500,
  joinDate: new Date("2024-01-01")
};

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 1000,
    description: "Bank deposit",
    date: new Date("2024-02-01"),
    status: "completed"
  },
  {
    id: "2",
    type: "bet",
    amount: -50,
    description: "Spin Wheel Casino - Red bet",
    date: new Date("2024-02-01"),
    status: "completed"
  },
  {
    id: "3",
    type: "win",
    amount: 100,
    description: "Spin Wheel Casino - Win",
    date: new Date("2024-02-01"),
    status: "completed"
  },
  {
    id: "4",
    type: "bet",
    amount: -25,
    description: "Sports Bet - Real Madrid vs Barcelona",
    date: new Date("2024-02-02"),
    status: "completed"
  },
  {
    id: "5",
    type: "deposit",
    amount: 500,
    description: "Credit card deposit",
    date: new Date("2024-02-03"),
    status: "completed"
  }
];

export const mockBetHistory: BetHistory[] = [
  {
    id: "1",
    game: "Spin Wheel Casino",
    betType: "Red",
    amount: 50,
    odds: 2.0,
    result: "win",
    payout: 100,
    date: new Date("2024-02-01")
  },
  {
    id: "2",
    game: "Sports Betting",
    betType: "Real Madrid Win",
    amount: 25,
    odds: 1.8,
    result: "loss",
    date: new Date("2024-02-02")
  },
  {
    id: "3",
    game: "Spin Wheel Casino",
    betType: "Number 7",
    amount: 10,
    odds: 36.0,
    result: "loss",
    date: new Date("2024-02-03")
  },
  {
    id: "4",
    game: "Sports Betting",
    betType: "Barcelona Win",
    amount: 30,
    odds: 2.2,
    result: "pending",
    date: new Date("2024-02-04")
  }
];

export const mockSportsMatches: SportsMatch[] = [
  {
    id: "1",
    sport: "Football",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeOdds: 1.8,
    awayOdds: 2.2,
    drawOdds: 3.4,
    date: new Date("2024-02-10"),
    status: "upcoming"
  },
  {
    id: "2",
    sport: "Basketball",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeOdds: 1.9,
    awayOdds: 1.9,
    date: new Date("2024-02-11"),
    status: "upcoming"
  },
  {
    id: "3",
    sport: "Football",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeOdds: 2.1,
    awayOdds: 1.7,
    drawOdds: 3.6,
    date: new Date("2024-02-05"),
    status: "live",
    score: "1-0"
  },
  {
    id: "4",
    sport: "Tennis",
    homeTeam: "Djokovic",
    awayTeam: "Nadal",
    homeOdds: 1.6,
    awayOdds: 2.4,
    date: new Date("2024-02-03"),
    status: "finished",
    score: "6-4, 6-2"
  }
];
