
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/ashok_gaming";

let client: postgres.Sql;
let db: any;

try {
  client = postgres(connectionString, {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ashok_gaming',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false
  });
  
  db = drizzle(client);
  console.log('Database connection initialized successfully');
} catch (error) {
  console.error('Database connection failed:', error);
  throw error;
}

export { db };
