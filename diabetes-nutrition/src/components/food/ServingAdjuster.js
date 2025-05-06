import React from "react";

export default function ServingAdjuster({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Number of servings
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 1)}
        className="form-input w-20"
        min="0.25"
        step="0.25"
      />
    </div>
  );
}
