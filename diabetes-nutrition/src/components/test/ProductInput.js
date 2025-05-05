"use client";

import { useState } from "react";

export default function ProductInput({
  product,
  grams,
  setProduct,
  setGrams,
  onCalc,
  loading,
}) {
  return (
    <div className="mb-4">
      <label htmlFor="product" className="block text-lg font-semibold mb-2">
        Product
      </label>
      <input
        id="product"
        type="text"
        placeholder="Enter product name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="grams" className="block text-lg font-semibold mt-4 mb-2">
        Amount (grams)
      </label>
      <input
        id="grams"
        type="number"
        value={grams}
        onChange={(e) => setGrams(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onCalc}
        disabled={loading}
        className={`mt-4 w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Calculating..." : "Calculate Carbs"}
      </button>
    </div>
  );
}
