
import type { Express } from "express";
import { createServer, type Server } from "http";

import { insertSpinResultSchema, insertUserSchema, loginUserSchema, insertGameSchema, updateGameSchema, insertBettingConfigSchema, updateBettingConfigSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import storage  from "server/storage";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthRequest extends Request {
  user?: any;
}

// Middleware to verify JWT token
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin role
const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(validatedData);
      
      // Create wallet for new user
      await storage.createWallet({
        userId: user.id,
        balance: 0
      });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          role: user.role
        },
        token
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      const user = await storage.validateUser(validatedData.username, validatedData.password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          role: user.role
        },
        token
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get current user profile
  app.get("/api/auth/profile", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUserByUsername(req.user.username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin: Get all users
  app.get("/api/admin/users", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const users = await storage.getAllUsers();
      const sanitizedUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        createdAt: user.createdAt
      }));
      res.json(sanitizedUsers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin: Update user role
  app.put("/api/admin/users/:userId/role", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await storage.updateUserRole(userId, role);
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Spin wheel result endpoint
  app.post("/api/spin", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertSpinResultSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const result = await storage.createSpinResult(validatedData);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user spin history
  app.get("/api/spin-history", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const results = await storage.getUserSpinResults(req.user.id);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Games routes
  // Get all games (public)
  app.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get game by ID (public)
  app.get("/api/games/:gameId", async (req, res) => {
    try {
      const { gameId } = req.params;
      const game = await storage.getGameById(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(game);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin: Create game
  app.post("/api/admin/games", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertGameSchema.parse(req.body);
      const game = await storage.createGame(validatedData);
      res.status(201).json(game);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin: Update game
  app.put("/api/admin/games/:gameId", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { gameId } = req.params;
      const validatedData = updateGameSchema.parse(req.body);
      const game = await storage.updateGame(gameId, validatedData);
      res.json(game);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin: Delete game
  app.delete("/api/admin/games/:gameId", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { gameId } = req.params;
      const success = await storage.deleteGame(gameId);
      if (!success) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json({ message: "Game deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin: Update game stats
  app.put("/api/admin/games/:gameId/stats", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { gameId } = req.params;
      const { players, revenue } = req.body;
      const game = await storage.updateGameStats(gameId, players, revenue);
      res.json(game);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Play game - increment player count and add revenue
  app.post("/api/games/:gameId/play", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { gameId } = req.params;
      const game = await storage.getGameById(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      // Increment player count and add random revenue between 10-100
      const newPlayers = game.players + 1;
      const addedRevenue = Math.floor(Math.random() * 91) + 10; // 10-100
      const newRevenue = game.revenue + addedRevenue;
      
      // Get user wallet and update balance
      let userWallet = await storage.getUserWallet(req.user.id);
      if (!userWallet) {
        userWallet = await storage.createWallet({
          userId: req.user.id,
          balance: 0
        });
      }

      const newBalance = userWallet.balance + addedRevenue;
      await storage.updateWalletBalance(req.user.id, newBalance);

      // Add transaction record
      await storage.addTransaction({
        userId: req.user.id,
        type: 'game_earning',
        amount: addedRevenue,
        gameId: gameId,
        status: 'completed'
      });
      
      const updatedGame = await storage.updateGameStats(gameId, newPlayers, newRevenue);
      res.json({ game: updatedGame, earnedRevenue: addedRevenue, newWalletBalance: newBalance });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get user wallet
  app.get("/api/wallet", authenticateToken, async (req: AuthRequest, res) => {
    try {
      let wallet = await storage.getUserWallet(req.user.id);
      if (!wallet) {
        wallet = await storage.createWallet({
          userId: req.user.id,
          balance: 0
        });
      }
      res.json(wallet);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get user transactions
  app.get("/api/transactions", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const transactions = await storage.getUserTransactions(req.user.id);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Withdraw from wallet
  app.post("/api/wallet/withdraw", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { amount } = req.body;
      const wallet = await storage.getUserWallet(req.user.id);
      
      if (!wallet || wallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      const newBalance = wallet.balance - amount;
      await storage.updateWalletBalance(req.user.id, newBalance);

      await storage.addTransaction({
        userId: req.user.id,
        type: 'withdraw',
        amount: -amount,
        status: 'completed'
      });

      res.json({ success: true, newBalance });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Deposit to wallet
  app.post("/api/wallet/deposit", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { amount } = req.body;
      let wallet = await storage.getUserWallet(req.user.id);
      
      if (!wallet) {
        wallet = await storage.createWallet({
          userId: req.user.id,
          balance: 0
        });
      }

      const newBalance = wallet.balance + amount;
      await storage.updateWalletBalance(req.user.id, newBalance);

      await storage.addTransaction({
        userId: req.user.id,
        type: 'deposit',
        amount: amount,
        status: 'completed'
      });

      res.json({ success: true, newBalance });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Betting Config Routes
  // Get betting config for a game type
  app.get("/api/betting-config/:gameType", async (req, res) => {
    try {
      const { gameType } = req.params;
      const config = await storage.getBettingConfig(gameType);
      if (!config) {
        return res.status(404).json({ message: "Betting config not found" });
      }
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin: Get all betting configs
  app.get("/api/admin/betting-config", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const configs = await storage.getAllBettingConfigs();
      res.json(configs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin: Create betting config
  app.post("/api/admin/betting-config", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertBettingConfigSchema.parse(req.body);
      const config = await storage.createBettingConfig(validatedData);
      res.status(201).json(config);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin: Update betting config
  app.put("/api/admin/betting-config/:gameType", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { gameType } = req.params;
      const validatedData = updateBettingConfigSchema.parse(req.body);
      const config = await storage.updateBettingConfig(gameType, validatedData);
      res.json(config);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
