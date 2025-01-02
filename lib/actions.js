"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // NOTE: this is better UX than throwing an error (which would destroy user input)
    return {
      message: "Invalid or incomplete meal data! (user input)",
    };
  }

  await saveMeal(meal);
  // note only assets (eg. images) that are in the public directory at run time will be served
  // so images created after build won't be shown (using 3rd party like AWS is recommended by next.js documentation)
  // Max provided AWS S3 instructions here: https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41162250#overview
  revalidatePath("/meals"); // trigger revalidate cache (important for Production)
  redirect("/meals");
}
