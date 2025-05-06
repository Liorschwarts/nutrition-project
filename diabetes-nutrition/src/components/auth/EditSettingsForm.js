"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { authApi } from "../../services/api";
import { Card, Button } from "../ui/FormElements";

export default function EditSettingsForm({ onClose }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    insulinCarbRatio: user?.settings?.insulinCarbRatio || 10,
    targetGlucose: user?.settings?.targetGlucose || 120,
    correctionFactor: user?.settings?.correctionFactor || 50,
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
      await authApi.updateSettings(formData);
      setSuccess("Settings updated successfully!");
      // חשוב - נעדכן את מצב המשתמש הגלובלי
      setTimeout(() => {
        if (onClose) onClose(); // סגירת הטופס אם יש פונקצית סגירה
        window.location.reload(); // רענון הדף לעדכון ההגדרות בממשק
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to update settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Edit Calculator Settings">
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

        <div>
          <label
            htmlFor="insulinCarbRatio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Insulin to Carb Ratio (grams of carbs per unit)
          </label>
          <input
            id="insulinCarbRatio"
            name="insulinCarbRatio"
            type="number"
            value={formData.insulinCarbRatio}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="100"
            step="0.5"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            How many grams of carbs are covered by 1 unit of insulin
          </p>
        </div>

        <div>
          <label
            htmlFor="targetGlucose"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Blood Glucose (mg/dL)
          </label>
          <input
            id="targetGlucose"
            name="targetGlucose"
            type="number"
            value={formData.targetGlucose}
            onChange={handleChange}
            className="form-input"
            min="70"
            max="200"
            step="1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="correctionFactor"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correction Factor (mg/dL per unit)
          </label>
          <input
            id="correctionFactor"
            name="correctionFactor"
            type="number"
            value={formData.correctionFactor}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="150"
            step="1"
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Settings"}
          </button>

          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}
