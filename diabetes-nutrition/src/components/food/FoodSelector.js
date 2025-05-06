"use client";
import { useState, useEffect } from "react";
import { InputField } from "../ui/FormElements";
import { searchFoods } from "../../lib/foodData";
import FoodList from "./FoodList";
import ServingAdjuster from "./ServingAdjuster";
import CustomFoodForm from "./CustomFoodForm";
import FutureFeature from "./FutureFeature";

export default function FoodSelector({
  onFoodSelect,
  onCarbInputChange,
  carbGrams,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customServings, setCustomServings] = useState(1);

  // Filter foods when search term changes
  useEffect(() => {
    const foods = searchFoods(searchTerm);
    setFilteredFoods(foods);
  }, [searchTerm]);

  // Handle selecting a food item
  const handleFoodClick = (food) => {
    const adjustedFood = {
      ...food,
      carbsPerServing: food.carbsPerServing * customServings,
      servings: customServings,
    };
    onFoodSelect(adjustedFood);
  };

  // Handle custom food submission
  const handleCustomFoodSubmit = (customFood) => {
    handleFoodClick(customFood);
    setShowCustomForm(false);
  };

  return (
    <div className="space-y-4">
      {/* Manual carb input */}
      <InputField
        label="Enter carbs manually (grams)"
        id="manual-carbs"
        type="number"
        value={carbGrams}
        onChange={(e) => onCarbInputChange(e.target.value)}
        min="0"
        placeholder="Enter carbohydrate amount in grams"
      />

      {/* Food search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="form-input pl-10"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Food list */}
      <FoodList foods={filteredFoods} onFoodClick={handleFoodClick} />

      {/* Serving multiplier */}
      <ServingAdjuster value={customServings} onChange={setCustomServings} />

      {/* Custom food option */}
      {!showCustomForm ? (
        <button
          type="button"
          onClick={() => setShowCustomForm(true)}
          className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
        >
          + Add custom food
        </button>
      ) : (
        <CustomFoodForm
          onSubmit={handleCustomFoodSubmit}
          onCancel={() => setShowCustomForm(false)}
        />
      )}

      {/* Future feature placeholder */}
      <FutureFeature />
    </div>
  );
}
