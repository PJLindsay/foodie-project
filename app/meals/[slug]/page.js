import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/meals";

import classes from "./page.module.css";

// this is how you can create dynamic metadata
// this is a reserved function name that next.js seeks in order to create dynamic metadata
export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }
  
  return { title: meal.title, description: meal.summary };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    // use the closest "not found" page
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
