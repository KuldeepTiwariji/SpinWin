
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSpinResultSchema, insertUserSchema, loginUserSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

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

  const httpServer = createServer(app);
  return httpServer;
}
