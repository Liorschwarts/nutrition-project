"use client";

import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [carbs, setCarbs] = useState(0);

  const handleInputChange = (e) => {
    setProduct(e.target.value);
  };

  const handleCarbCalculation = () => {
    setCarbs(Number(product) * 20); // דוגמה לחישוב פחמימות
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl">חישוב פחמימות</h2>
      <input
        type="number"
        value={product}
        onChange={handleInputChange}
        className="border p-2 my-2"
        placeholder="הכנס כמות המוצר"
      />
      <button
        onClick={handleCarbCalculation}
        className="bg-blue-500 text-white p-2"
      >
        חישוב פחמימות
      </button>
      <p className="mt-4">סך הפחמימות: {carbs} גרם</p>
    </div>
  );
}
