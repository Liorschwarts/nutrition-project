import React, { useState } from "react";
import { InputField, Button } from "../ui/FormElements";

export default function CustomFoodForm({ onSubmit, onCancel }) {
  const [customFood, setCustomFood] = useState({
    name: "",
    carbsPerServing: "",
    servingSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFood = {
      id: "custom-" + Date.now(),
      ...customFood,
      carbsPerServing: parseFloat(customFood.carbsPerServing),
    };
    onSubmit(newFood);
    setCustomFood({ name: "", carbsPerServing: "", servingSize: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-3 bg-gray-50 rounded-md"
    >
      <h3 className="font-medium">Add New Food</h3>

      <InputField
        label="Food Name"
        id="name"
        value={customFood.name}
        onChange={handleChange}
        required={true}
      />

      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Serving Size"
          id="servingSize"
          value={customFood.servingSize}
          onChange={handleChange}
          placeholder="e.g. 1 cup"
          required={true}
        />

        <InputField
          label="Carbs (grams)"
          id="carbsPerServing"
          type="number"
          value={customFood.carbsPerServing}
          onChange={handleChange}
          min="0"
          step="0.1"
          required={true}
        />
      </div>

      <div className="flex space-x-3">
        <Button type="submit" variant="primary">
          Add
        </Button>

        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
