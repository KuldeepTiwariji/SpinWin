import { type User, type InsertUser, type SpinResult, type InsertSpinResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSpinResult(result: InsertSpinResult): Promise<SpinResult>;
  getUserSpinResults(userId: string): Promise<SpinResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private spinResults: Map<string, SpinResult>;

  constructor() {
    this.users = new Map();
    this.spinResults = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSpinResult(insertResult: InsertSpinResult): Promise<SpinResult> {
    const id = randomUUID();
    const result: SpinResult = { 
      ...insertResult, 
      id,
      timestamp: new Date()
    };
    this.spinResults.set(id, result);
    return result;
  }

  async getUserSpinResults(userId: string): Promise<SpinResult[]> {
    return Array.from(this.spinResults.values()).filter(
      (result) => result.userId === userId,
    );
  }
}

export const storage = new MemStorage();
