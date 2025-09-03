import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSpinResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Spin wheel result endpoint
  app.post("/api/spin", async (req, res) => {
    try {
      const validatedData = insertSpinResultSchema.parse(req.body);
      const result = await storage.createSpinResult(validatedData);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user spin history
  app.get("/api/spin-history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const results = await storage.getUserSpinResults(userId);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
