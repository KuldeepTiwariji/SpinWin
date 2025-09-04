import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  mobile: text("mobile").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const games = pgTable("games", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  status: text("status").notNull().default("active"),
  players: integer("players").notNull().default(0),
  revenue: integer("revenue").notNull().default(0),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const spinResults = pgTable("spin_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  prize: text("prize").notNull(),
  credits: integer("credits").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  balance: integer("balance").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(), // 'deposit', 'withdraw', 'game_earning'
  amount: integer("amount").notNull(),
  gameId: varchar("game_id"),
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bettingConfig = pgTable("betting_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameType: text("game_type").notNull().unique(), // 'spin_wheel'
  minBet: integer("min_bet").notNull().default(10),
  maxBet: integer("max_bet").notNull().default(10000),
  minNumber: integer("min_number").notNull().default(1),
  maxNumber: integer("max_number").notNull().default(100),
  exactMatchMultiplier: integer("exact_match_multiplier").notNull().default(50),
  oneAwayMultiplier: integer("one_away_multiplier").notNull().default(10),
  twoThreeAwayMultiplier: integer("two_three_away_multiplier").notNull().default(5),
  fourFiveAwayMultiplier: integer("four_five_away_multiplier").notNull().default(2),
  isActive: text("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  mobile: true,
  password: true,
  role: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameSchema = createInsertSchema(games).pick({
  name: true,
  status: true,
  players: true,
  revenue: true,
  description: true,
});

export const updateGameSchema = createInsertSchema(games).pick({
  name: true,
  status: true,
  players: true,
  revenue: true,
  description: true,
}).partial();

export const insertSpinResultSchema = createInsertSchema(spinResults).pick({
  userId: true,
  prize: true,
  credits: true,
});

export const insertWalletSchema = createInsertSchema(wallets).pick({
  userId: true,
  balance: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  type: true,
  amount: true,
  gameId: true,
  status: true,
});

export const insertBettingConfigSchema = createInsertSchema(bettingConfig).pick({
  gameType: true,
  minBet: true,
  maxBet: true,
  minNumber: true,
  maxNumber: true,
  exactMatchMultiplier: true,
  oneAwayMultiplier: true,
  twoThreeAwayMultiplier: true,
  fourFiveAwayMultiplier: true,
  isActive: true,
});

export const updateBettingConfigSchema = createInsertSchema(bettingConfig).pick({
  minBet: true,
  maxBet: true,
  minNumber: true,
  maxNumber: true,
  exactMatchMultiplier: true,
  oneAwayMultiplier: true,
  twoThreeAwayMultiplier: true,
  fourFiveAwayMultiplier: true,
  isActive: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type UpdateGame = z.infer<typeof updateGameSchema>;
export type Game = typeof games.$inferSelect;
export type InsertSpinResult = z.infer<typeof insertSpinResultSchema>;
export type SpinResult = typeof spinResults.$inferSelect;
export type Wallet = typeof wallets.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type InsertWallet = z.infer<typeof insertWalletSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type BettingConfig = typeof bettingConfig.$inferSelect;
export type InsertBettingConfig = z.infer<typeof insertBettingConfigSchema>;
export type UpdateBettingConfig = z.infer<typeof updateBettingConfigSchema>;
