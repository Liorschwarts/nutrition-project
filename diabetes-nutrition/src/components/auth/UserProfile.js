"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Card, Button } from "../ui/FormElements";
import { foodApi } from "../../services/api-food";
import { authApi } from "../../services/api";

// Component to edit settings
function EditSettingsForm({ settings, onClose }) {
  const [formData, setFormData] = useState({
    insulinCarbRatio: settings?.insulinCarbRatio || 10,
    targetGlucose: settings?.targetGlucose || 120,
    correctionFactor: settings?.correctionFactor || 50,
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
      setTimeout(() => {
        if (onClose) onClose();
        window.location.reload();
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

// Component to add custom food
function AddCustomFoodForm({ onClose }) {
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
        window.location.reload();
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

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Food Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="servingSize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Serving Size
          </label>
          <input
            id="servingSize"
            name="servingSize"
            type="text"
            value={formData.servingSize}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. 1 cup, 100g"
            required
          />
        </div>

        <div>
          <label
            htmlFor="carbsPerServing"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Carbs (grams)
          </label>
          <input
            id="carbsPerServing"
            name="carbsPerServing"
            type="number"
            value={formData.carbsPerServing}
            onChange={handleChange}
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

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

// Profile tab component
function ProfileTab({ user }) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1">{user.name}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1">{user.email}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
          <p className="mt-1">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </Card>
  );
}

// Settings tab component
function SettingsTab({ settings, onEditClick }) {
  return (
    <Card title="Calculator Settings">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Insulin to Carb Ratio
          </h3>
          <p className="mt-1">
            1 unit for every {settings?.insulinCarbRatio || 10} grams of carbs
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Target Blood Glucose
          </h3>
          <p className="mt-1">{settings?.targetGlucose || 120} mg/dL</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Correction Factor
          </h3>
          <p className="mt-1">
            1 unit reduces blood glucose by {settings?.correctionFactor || 50}{" "}
            mg/dL
          </p>
        </div>

        <button className="btn btn-primary mt-4" onClick={onEditClick}>
          Edit Settings
        </button>
      </div>
    </Card>
  );
}

// Helper function to convert category code to name
function getCategoryName(categoryCode) {
  const categories = {
    "breads-grains": "Breads & Grains",
    fruits: "Fruits",
    vegetables: "Vegetables",
    dairy: "Dairy",
    "snacks-sweets": "Snacks & Sweets",
    other: "Other",
  };

  return categories[categoryCode] || categoryCode;
}

// Foods tab component
function FoodsTab({ onAddClick }) {
  const [userFoods, setUserFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user foods on mount
  useEffect(() => {
    const loadUserFoods = async () => {
      try {
        setIsLoading(true);
        const foods = await foodApi.getUserFoods();
        setUserFoods(foods);
      } catch (err) {
        console.error("Failed to load user foods:", err);
        setError("Failed to load your custom foods. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFoods();
  }, []);

  // Handle food deletion
  const handleDeleteFood = async (foodId) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      try {
        await foodApi.deleteFood(foodId);
        // Update local list
        setUserFoods(userFoods.filter((food) => food._id !== foodId));
      } catch (error) {
        console.error("Failed to delete food:", error);
        alert("Failed to delete food. Please try again.");
      }
    }
  };

  return (
    <Card title="My Custom Foods">
      {isLoading ? (
        <p className="text-gray-500">Loading your foods...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : userFoods && userFoods.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {userFoods.map((food) => (
            <div
              key={food._id}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{food.name}</div>
                <div className="text-sm text-gray-500">
                  {food.servingSize} | {food.carbsPerServing}g carbs
                </div>
                <div className="text-xs text-gray-400">
                  Category: {getCategoryName(food.category)}
                </div>
              </div>
              <button
                onClick={() => handleDeleteFood(food._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven't added any custom foods yet.</p>
      )}
      <button className="btn btn-primary mt-4" onClick={onAddClick}>
        Add Custom Food
      </button>
    </Card>
  );
}

// Main UserProfile component
export default function UserProfile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [isAddingFood, setIsAddingFood] = useState(false);

  if (!user) {
    return (
      <div className="text-center p-4">
        <p>You need to be logged in to view this page.</p>
        <a href="/login" className="btn btn-primary inline-block mt-2">
          Log In
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button onClick={logout} className="text-red-500 hover:text-red-700">
          Log Out
        </button>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "profile"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("profile");
            setIsEditingSettings(false);
            setIsAddingFood(false);
          }}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "settings"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("settings");
            setIsEditingSettings(false);
            setIsAddingFood(false);
          }}
        >
          Calculator Settings
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "foods"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("foods");
            setIsEditingSettings(false);
            setIsAddingFood(false);
          }}
        >
          My Foods
        </button>
      </div>

      {activeTab === "profile" && <ProfileTab user={user} />}

      {activeTab === "settings" && !isEditingSettings && (
        <SettingsTab
          settings={user.settings}
          onEditClick={() => setIsEditingSettings(true)}
        />
      )}

      {activeTab === "settings" && isEditingSettings && (
        <EditSettingsForm
          settings={user.settings}
          onClose={() => setIsEditingSettings(false)}
        />
      )}

      {activeTab === "foods" && !isAddingFood && (
        <FoodsTab onAddClick={() => setIsAddingFood(true)} />
      )}

      {activeTab === "foods" && isAddingFood && (
        <AddCustomFoodForm onClose={() => setIsAddingFood(false)} />
      )}
    </div>
  );
}
