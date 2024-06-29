import Meal from "./Meal";

//@ts-ignore
export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients;

  return (
    <main className="flex flex-col items-center">
      <section className="nutrients mt-8 mb-4">
        <h1 className="text-center text-2xl font-medium mb-4">Macros</h1>
        <ul className="flex justify-between items-center">
          <li className="text-gray-700">
            Calories: {nutrients.calories.toFixed(0)}
          </li>
          <li className="text-gray-700">
            Carbohydrates: {nutrients.carbohydrates.toFixed(0)}
          </li>
          <li className="text-gray-700">Fat: {nutrients.fat.toFixed(0)}</li>
          <li className="text-gray-700">Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals flex flex-col items-center">
        {mealData.meals.map((meal :any) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </section>
    </main>
  );
}
