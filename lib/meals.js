// keeping the database logic separate headers
import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // simulate a slower action (use for debug/demo loading purposes)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all(); // use .run() to INSERT/UPDATE .get() for one row
}