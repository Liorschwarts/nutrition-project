import React from "react";

export default function SelectedFoodDisplay({ food }) {
  return (
    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
      <h3 className="font-medium text-green-800">Selected Food</h3>
      <p>
        <span className="font-medium">{food.name}</span> -
        {food.servings && food.servings !== 1
          ? ` ${food.servings} servings of `
          : " "}
        {food.servingSize}
      </p>
    </div>
  );
}
