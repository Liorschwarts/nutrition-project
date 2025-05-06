"use client";

export default function CarbResult({ carbs }) {
  return (
    <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
      <h3 className="text-xl font-semibold text-green-700">Result:</h3>
      <p className="text-lg text-gray-800">
        Total carbs:{" "}
        <span className="font-bold text-blue-600">{carbs} grams</span>
      </p>
    </div>
  );
}
