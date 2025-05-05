import React from "react";

export default function FoodDatabaseFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  showGlycemicIndex,
  setShowGlycemicIndex,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:flex-1">
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
      </div>

      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-input"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showGI"
          checked={showGlycemicIndex}
          onChange={() => setShowGlycemicIndex(!showGlycemicIndex)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="showGI" className="text-sm text-gray-700">
          Show Glycemic Index
        </label>
      </div>
    </div>
  );
}
