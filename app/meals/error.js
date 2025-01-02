"use client";

export default function Error({error}) {
  // Note this style (className) comes from globals css
  return <main className="error">
    <h1>An error occurred!</h1>
    <p>Failed to fetch meal data. Please try again later</p>
  </main>
}