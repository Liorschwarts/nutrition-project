"use client";
import { useState } from "react";
import { foodCategories } from "../../lib/foodData";
import PageHeader from "../../components/ui/PageHeader";
import FoodDatabaseFilters from "../../components/database/FoodDatabaseFilters";
import FoodDatabaseTable from "../../components/database/FoodDatabaseTable";
import GlycemicIndexInfo from "../../components/database/GlycemicIndexInfo";

const metadata = {
  title: "Food Database | Diabetes Carb Calculator",
  description:
    "Browse our food database with carbohydrate content for various foods",
};

export default function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showGlycemicIndex, setShowGlycemicIndex] = useState(false);

  // Filter foods based on search term and category
  const getFilteredFoods = () => {
    let foods = [];

    // Get foods from all categories or selected category
    if (selectedCategory === "all") {
      foods = foodCategories.flatMap((category) => category.foods);
    } else {
      const category = foodCategories.find(
        (cat) => cat.id === selectedCategory
      );
      foods = category ? category.foods : [];
    }

    // Apply search filter if searchTerm exists
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      foods = foods.filter((food) => food.name.toLowerCase().includes(term));
    }

    return foods;
  };

  const filteredFoods = getFilteredFoods();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Food Database"
        description="Browse our database of common foods with their carbohydrate content per serving."
      />

      <FoodDatabaseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showGlycemicIndex={showGlycemicIndex}
        setShowGlycemicIndex={setShowGlycemicIndex}
        categories={foodCategories}
      />

      <FoodDatabaseTable
        foods={filteredFoods}
        showGlycemicIndex={showGlycemicIndex}
      />

      {showGlycemicIndex && <GlycemicIndexInfo />}
    </div>
  );
}
