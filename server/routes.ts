import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game-related API routes
  app.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch games" });
    }
  });

  app.get("/api/games/featured", async (req, res) => {
    try {
      const featuredGames = await storage.getFeaturedGames();
      res.json(featuredGames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured games" });
    }
  });

  app.get("/api/games/popular", async (req, res) => {
    try {
      const popularGames = await storage.getPopularGames();
      res.json(popularGames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular games" });
    }
  });

  app.get("/api/games/new", async (req, res) => {
    try {
      const newGames = await storage.getNewGames();
      res.json(newGames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch new games" });
    }
  });

  app.get("/api/games/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Search query is required" });
      }
      const games = await storage.searchGames(q);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: "Failed to search games" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/games/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const games = await storage.getGamesByCategory(category);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch games by category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
