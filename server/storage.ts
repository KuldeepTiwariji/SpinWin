
import { type User, type InsertUser, type SpinResult, type InsertSpinResult, users, spinResults } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
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
}

export const storage = new PostgresStorage();
