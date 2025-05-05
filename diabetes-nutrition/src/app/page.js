"use client";
import { useState } from "react";
import { Card } from "../components/ui/FormElements";
import InsulinCalculator from "../components/calculator/InsulinCalculator";
import FoodSelector from "../components/food/FoodSelector";
import SelectedFoodDisplay from "../components/food/SelectedFoodDisplay";
import PageHeader from "../components/ui/PageHeader";
import InfoDisclaimer from "../components/ui/InfoDisclaimer";

export default function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [carbGrams, setCarbGrams] = useState("");

  // Update carb grams when a food is selected
  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setCarbGrams(food.carbsPerServing.toString());
  };

  // Update carb grams manually
  const handleCarbInputChange = (value) => {
    setCarbGrams(value);
    setSelectedFood(null); // Clear selected food when manually entering carbs
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Diabetes Carb Calculator"
        description="Easily calculate insulin doses based on the carbohydrate content of your food."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Select Food or Enter Carbs">
          <FoodSelector
            onFoodSelect={handleFoodSelect}
            onCarbInputChange={handleCarbInputChange}
            carbGrams={carbGrams}
          />
        </Card>

        <Card title="Calculate Insulin Dose">
          <InsulinCalculator carbGrams={carbGrams} />
        </Card>
      </div>

      <InfoDisclaimer />

      {selectedFood && <SelectedFoodDisplay food={selectedFood} />}
    </div>
  );
}
