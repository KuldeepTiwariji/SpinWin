import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const spinResults = pgTable("spin_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  prize: text("prize").notNull(),
  credits: integer("credits").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSpinResultSchema = createInsertSchema(spinResults).pick({
  userId: true,
  prize: true,
  credits: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSpinResult = z.infer<typeof insertSpinResultSchema>;
export type SpinResult = typeof spinResults.$inferSelect;
