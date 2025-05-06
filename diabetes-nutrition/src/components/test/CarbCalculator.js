"use client";
import { useState } from "react";

export default function CarbCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintain",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCarbs = (e) => {
    e.preventDefault();

    // Basic BMR calculation using the Mifflin-St Jeor Equation
    const { age, gender, weight, height, activityLevel, goal } = formData;

    // Convert inputs to numbers
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight); // kg
    const heightNum = parseFloat(height); // cm

    // Calculate BMR
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Adjust based on goal
    let carbPercentage;
    let adjustedCalories = tdee;

    switch (goal) {
      case "lose":
        adjustedCalories = tdee * 0.8; // 20% deficit
        carbPercentage = 0.4; // 40% carbs for weight loss
        break;
      case "maintain":
        carbPercentage = 0.5; // 50% carbs for maintenance
        break;
      case "gain":
        adjustedCalories = tdee * 1.15; // 15% surplus
        carbPercentage = 0.55; // 55% carbs for muscle gain
        break;
      default:
        carbPercentage = 0.5;
    }

    // Calculate carbs in grams (1g of carbs = 4 calories)
    const carbCalories = adjustedCalories * carbPercentage;
    const carbGrams = Math.round(carbCalories / 4);

    setResult({
      carbGrams,
      totalCalories: Math.round(adjustedCalories),
      carbPercentage: Math.round(carbPercentage * 100),
    });

    setShowResults(true);
  };

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "male",
      weight: "",
      height: "",
      activityLevel: "moderate",
      goal: "maintain",
    });
    setShowResults(false);
    setResult(null);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">
        Calculate Your Daily Carbohydrate Needs
      </h2>

      {!showResults ? (
        <form onSubmit={calculateCarbs} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                placeholder="Years"
                min="18"
                max="120"
                required
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Weight
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="form-input"
                placeholder="Kilograms"
                min="30"
                max="300"
                step="0.1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Height
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="form-input"
                placeholder="Centimeters"
                min="120"
                max="250"
                required
              />
            </div>

            <div>
              <label
                htmlFor="activityLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="sedentary">
                  Sedentary (little or no exercise)
                </option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">
                  Moderate (exercise 3-5 days/week)
                </option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="veryActive">
                  Very Active (exercise 2x/day)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="goal"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Goal
              </label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Muscle</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Calculate
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-bold text-center text-blue-800 mb-4">
              Your Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-500">Daily Carbs</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.carbGrams}g
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Calories</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.totalCalories}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-500">Carb Percentage</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.carbPercentage}%
                </p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>
                These recommendations are based on your personal metrics and
                goals. Adjust as needed based on your specific dietary
                requirements or consult with a nutritionist for personalized
                advice.
              </p>
            </div>
          </div>

          <button onClick={resetForm} className="btn btn-secondary w-full">
            Calculate Again
          </button>
        </div>
      )}
    </div>
  );
}
