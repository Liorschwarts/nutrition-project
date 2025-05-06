// frontend/components/food/AddCustomFoodForm.jsx
"use client";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Card, Button, InputField } from "../ui/FormElements";
import { foodApi } from "../../services/api-food";

export default function AddCustomFoodForm({ onClose }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    servingSize: "",
    carbsPerServing: "",
    category: "other",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await foodApi.createFood(formData);
      setSuccess("Food added successfully!");
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to add food.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: "breads-grains", label: "Breads & Grains" },
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "dairy", label: "Dairy" },
    { value: "snacks-sweets", label: "Snacks & Sweets" },
    { value: "other", label: "Other" },
  ];

  return (
    <Card title="Add Custom Food">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <InputField
          label="Food Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Serving Size"
          id="servingSize"
          name="servingSize"
          value={formData.servingSize}
          onChange={handleChange}
          placeholder="e.g. 1 cup, 100g"
          required
        />

        <InputField
          label="Carbs (grams)"
          id="carbsPerServing"
          name="carbsPerServing"
          type="number"
          value={formData.carbsPerServing}
          onChange={handleChange}
          min="0"
          step="0.1"
          required
        />

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Food"}
          </button>

          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}
