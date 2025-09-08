import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("high_scores", {
  id: int().primaryKey({ autoIncrement: true }),
  date: text().notNull().default(sql`(current_timestamp)`),
  score: int().notNull(),
});
