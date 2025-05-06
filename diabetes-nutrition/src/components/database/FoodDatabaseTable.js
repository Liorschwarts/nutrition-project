import React from "react";
import GlycemicIndexBadge from "./GlycemicIndexBadge";

export default function FoodDatabaseTable({ foods, showGlycemicIndex }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Food
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Serving Size
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Carbs (g)
            </th>
            {showGlycemicIndex && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Glycemic Index
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {foods.map((food) => (
            <tr key={food.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{food.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {food.servingSize}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                {food.carbsPerServing}g
              </td>
              {showGlycemicIndex && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {food.glycemicIndex}
                  <GlycemicIndexBadge value={food.glycemicIndex} />
                </td>
              )}
            </tr>
          ))}

          {foods.length === 0 && (
            <tr>
              <td
                colSpan={showGlycemicIndex ? 4 : 3}
                className="px-6 py-4 text-center text-gray-500"
              >
                No foods found matching your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
