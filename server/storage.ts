import { type User, type InsertUser, type SpinResult, type InsertSpinResult, users, games, type InsertGame, type UpdateGame, type Game, spinResults, wallets, transactions, type Wallet, type Transaction, type InsertWallet, type InsertTransaction } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(username: string, password: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(userId: string, role: string): Promise<User>;
  createSpinResult(result: InsertSpinResult): Promise<SpinResult>;
  getUserSpinResults(userId: string): Promise<SpinResult[]>;

  // Games operations
  getAllGames(): Promise<Game[]>;
  getGameById(gameId: string): Promise<Game | null>;
  createGame(gameData: InsertGame): Promise<Game>;
  updateGame(gameId: string, gameData: UpdateGame): Promise<Game>;
  deleteGame(gameId: string): Promise<boolean>;
  updateGameStats(gameId: string, players: number, revenue: number): Promise<Game>;

  // Wallet operations
  getUserWallet(userId: string): Promise<Wallet | null>;
  createWallet(walletData: InsertWallet): Promise<Wallet>;
  updateWalletBalance(userId: string, amount: number): Promise<Wallet>;
  addTransaction(transactionData: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: string): Promise<Transaction[]>;

  // Betting operations
  updateBettingConfig(gameType: string, data: any): Promise<any>;
  addNumberBet(data: any): Promise<any>;
  getUserNumberBetHistory(userId: string): Promise<any[]>;
}

export class PostgresStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);

    const userToInsert = {
      ...insertUser,
      password: hashedPassword
    };

    const result = await db.insert(users).values(userToInsert).returning();
    return result[0];
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUserRole(userId: string, role: string): Promise<User> {
    const result = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId))
      .returning();

    if (result.length === 0) {
      throw new Error("User not found");
    }

    return result[0];
  }

  async createSpinResult(insertResult: InsertSpinResult): Promise<SpinResult> {
    const result = await db.insert(spinResults).values(insertResult).returning();
    return result[0];
  }

  async getUserSpinResults(userId: string): Promise<SpinResult[]> {
    return await db.select().from(spinResults).where(eq(spinResults.userId, userId));
  }

  // Games operations
  async getAllGames(): Promise<Game[]> {
    return await db.select().from(games);
  }

  async getGameById(gameId: string): Promise<Game | null> {
    const result = await db
      .select()
      .from(games)
      .where(eq(games.id, gameId))
      .limit(1);
    return result[0] || null;
  }

  async createGame(gameData: InsertGame): Promise<Game> {
    const [game] = await db
      .insert(games)
      .values(gameData)
      .returning();
    return game;
  }

  async updateGame(gameId: string, gameData: UpdateGame): Promise<Game> {
    const [game] = await db
      .update(games)
      .set({ ...gameData, updatedAt: new Date() })
      .where(eq(games.id, gameId))
      .returning();
    return game;
  }

  async deleteGame(gameId: string): Promise<boolean> {
    const result = await db
      .delete(games)
      .where(eq(games.id, gameId));
    return result.rowCount > 0;
  }

  async updateGameStats(gameId: string, players: number, revenue: number): Promise<Game> {
    const [game] = await db
      .update(games)
      .set({ players, revenue, updatedAt: new Date() })
      .where(eq(games.id, gameId))
      .returning();
    return game;
  }

  // Wallet operations
  async getUserWallet(userId: string): Promise<Wallet | null> {
    const result = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId))
      .limit(1);
    return result[0] || null;
  }

  async createWallet(walletData: InsertWallet): Promise<Wallet> {
    const [wallet] = await db
      .insert(wallets)
      .values(walletData)
      .returning();
    return wallet;
  }

  async updateWalletBalance(userId: string, amount: number): Promise<Wallet> {
    const [wallet] = await db
      .update(wallets)
      .set({ balance: amount, updatedAt: new Date() })
      .where(eq(wallets.userId, userId))
      .returning();
    return wallet;
  }

  async addTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(transactionData)
      .returning();
    return transaction;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId));
  }

  async updateBettingConfig(gameType: string, data: any) {
    const [config] = await this.db
      .update(bettingConfig)
      .set(data)
      .where(eq(bettingConfig.gameType, gameType))
      .returning();
    return config;
  }

  // Number Betting methods
  async addNumberBet(data: any) {
    const [bet] = await this.db
      .insert(numberBets)
      .values(data)
      .returning();
    return bet;
  }

  async getUserNumberBetHistory(userId: string) {
    return await this.db
      .select()
      .from(numberBets)
      .where(eq(numberBets.userId, userId))
      .orderBy(desc(numberBets.createdAt))
      .limit(50);
  }
}

export const storage = new PostgresStorage();