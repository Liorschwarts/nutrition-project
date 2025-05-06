import React from "react";

export default function FoodList({ foods, onFoodClick }) {
  return (
    <div className="h-64 overflow-y-auto border border-gray-200 rounded-md">
      <ul className="divide-y divide-gray-200">
        {foods.map((food) => (
          <li
            key={food.id}
            className="p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => onFoodClick(food)}
          >
            <div className="flex items-center">
              <div className="ml-3">
                <p className="font-medium">{food.name}</p>
                <p className="text-sm text-gray-500">
                  {food.servingSize} | {food.carbsPerServing}g carbs
                </p>
              </div>
            </div>
          </li>
        ))}

        {foods.length === 0 && (
          <li className="p-3 text-center text-gray-500">
            No results found. Try a different search term or add a custom food.
          </li>
        )}
      </ul>
    </div>
  );
}
