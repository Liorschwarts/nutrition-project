import React from "react";

export default function BasicSettings({ insulinCarbRatio, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-500">1 unit for every</span>
      <input
        type="number"
        value={insulinCarbRatio}
        onChange={(e) => onChange("insulinCarbRatio", e.target.value)}
        className="form-input w-20"
        min="1"
        max="100"
        step="1"
      />
      <span className="text-gray-500">g of carbs</span>
    </div>
  );
}
