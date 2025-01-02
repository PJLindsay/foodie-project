// keeping the database logic separate headers
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  // simulate a slower action (use for debug/demo loading purposes)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // uncomment to simulate error (test our error handler in meals page area)
  //throw new Error("Loading meals failed")

  return db.prepare("SELECT * FROM meals").all(); // use .run() to INSERT/UPDATE .get() for one row
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

// NOTE we use xss to sanitize our instructions input (avoid XSS attacks)
export function saveMeal(meal) {
  const slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
