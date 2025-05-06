import React from "react";

export default function SelectedFoodDisplay({ food }) {
  if (!food) return null;

  return (
    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
      <h3 className="font-medium text-green-800 mb-2">Selected Food</h3>

      <div className="space-y-2">
        <div>
          <span className="font-medium">Name:</span> {food.name}
        </div>

        <div>
          <span className="font-medium">Serving Size:</span> {food.servingSize}
          {food.servings &&
            food.servings !== 1 &&
            ` (${food.servings} servings)`}
        </div>

        <div>
          <span className="font-medium">Carbs:</span> {food.carbsPerServing}g
        </div>

        {food.confidence && (
          <div>
            <span className="font-medium">Confidence:</span>{" "}
            {Math.round(food.confidence * 100)}%
          </div>
        )}

        {food.estimatedCarbs && (
          <div className="text-amber-600 text-sm">
            Note: Carbohydrate content is estimated
          </div>
        )}
      </div>
    </div>
  );
}
