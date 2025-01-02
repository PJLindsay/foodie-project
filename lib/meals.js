// keeping the database logic separate headers
import fs from "node:fs";

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
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  // TODO: consider adding unique segment to avoid overwriting file with same name on server
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Save image failed!");
    }
  });

  // store the PATH to the image in the database (*do not* save image in database - just path to it...)
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title, @summary, @instructions, @creator, @creator_email, @image, @slug
    )`
  ).run(meal);
}
