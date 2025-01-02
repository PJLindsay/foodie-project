"use client";

import { useFormStatus } from "react-dom";

// we're isolating this "submit button"
// because it belongs inside a form and to isolate the "client side" logic
export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
