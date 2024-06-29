import { useState, useEffect } from "react";

//@ts-ignore
export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => setImageUrl(data.image))
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  return (
    <article className="shadow-md rounded-lg p-4 flex flex-col max-w-sm m-2 bg-white">
      <h1 className="text-xl font-medium mb-4">{meal.title}</h1>
      <img src={imageUrl} alt="recipe" className="w-full mb-2" />
      <ul className="list-none mb-4">
        <li className="text-gray-700">
          Preparation time: {meal.readyInMinutes} minutes
        </li>
        <li className="text-gray-700">Number of servings: {meal.servings}</li>
      </ul>

      <a
        href={meal.sourceUrl}
        className="text-white bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Go to Recipe
      </a>
    </article>
  );
}
