import { Suspense } from 'react';
import Link from 'next/link';

import classes from "./page.module.css";
import MealsGrid from '@/components/meals/meals-grid';

import { getMeals } from "@/lib/meals";

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community',
};

// we outsource data fetching into a separate component
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />
}

export default function MealsPage() {

  return (<>
    <header classes={classes.header}>
      <h1>Delicious meals, created{" "}
        <span className={classes.highlight}>by you</span>
      </h1>
      <p>Choose your favourite recipe and cook it yourself. It is easy and fun!</p>
      <p className={classes.cta}>
        <Link href="/meals/share">
          Share your favourite recipe
        </Link>
      </p>
    </header>
    <main classes={classes.main}>
      <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
        <Meals />
      </Suspense>
    </main>
  </>);
}