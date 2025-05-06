"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function InsulinCalculator({ carbGrams = "" }) {
  const { user } = useAuth();

  // Use user settings if available, otherwise default values
  const [insulinCarbRatio, setInsulinCarbRatio] = useState(
    user?.settings?.insulinCarbRatio || 10
  );
  const [bloodGlucose, setBloodGlucose] = useState("");
  const [targetGlucose, setTargetGlucose] = useState(
    user?.settings?.targetGlucose || 120
  );
  const [correctionFactor, setCorrectionFactor] = useState(
    user?.settings?.correctionFactor || 50
  );

  const [insulinDose, setInsulinDose] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Update settings when user data loads
  useEffect(() => {
    if (user?.settings) {
      setInsulinCarbRatio(user.settings.insulinCarbRatio || 10);
      setTargetGlucose(user.settings.targetGlucose || 120);
      setCorrectionFactor(user.settings.correctionFactor || 50);
    }
  }, [user]);

  // Calculate insulin dose whenever inputs change
  useEffect(() => {
    calculateInsulinDose();
  }, [
    carbGrams,
    insulinCarbRatio,
    bloodGlucose,
    targetGlucose,
    correctionFactor,
  ]);

  const calculateInsulinDose = () => {
    // Reset result if no carbs entered
    if (!carbGrams) {
      setInsulinDose(null);
      return;
    }

    // Calculate insulin for carbs
    const carbsInsulin = parseFloat(carbGrams) / parseFloat(insulinCarbRatio);

    // Calculate correction insulin (only if blood glucose is entered)
    let correctionInsulin = 0;
    if (bloodGlucose && targetGlucose && correctionFactor) {
      const glucoseDifference =
        parseFloat(bloodGlucose) - parseFloat(targetGlucose);
      if (glucoseDifference > 0) {
        correctionInsulin = glucoseDifference / parseFloat(correctionFactor);
      }
    }

    // Total insulin dose (rounded to the nearest 0.5 units)
    const total = carbsInsulin + correctionInsulin;
    const roundedTotal = Math.round(total * 2) / 2;

    setInsulinDose(roundedTotal);
  };

  return (
    <div className="space-y-4">
      {/* Basic settings */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">1 unit for every</span>
        <input
          type="number"
          value={insulinCarbRatio}
          onChange={(e) => setInsulinCarbRatio(e.target.value)}
          className="form-input w-20"
          min="1"
          max="100"
          step="1"
        />
        <span className="text-gray-500">g of carbs</span>
      </div>

      {/* Toggle advanced settings */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
        >
          {showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
        </button>
      </div>

      {/* Advanced settings */}
      {showAdvanced && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-md">
          <div>
            <label
              htmlFor="bloodGlucose"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Blood Glucose (mg/dL)
            </label>
            <input
              id="bloodGlucose"
              type="number"
              value={bloodGlucose}
              onChange={(e) => setBloodGlucose(e.target.value)}
              className="form-input"
              min="0"
              max="500"
              placeholder="Enter your current blood glucose"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="targetGlucose"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Target Blood Glucose (mg/dL)
              </label>
              <input
                id="targetGlucose"
                type="number"
                value={targetGlucose}
                onChange={(e) => setTargetGlucose(e.target.value)}
                className="form-input"
                min="70"
                max="200"
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
                type="number"
                value={correctionFactor}
                onChange={(e) => setCorrectionFactor(e.target.value)}
                className="form-input"
                min="1"
                max="150"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results display */}
      <div className="mt-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Calculation Results
          </h3>

          {insulinDose !== null ? (
            <div>
              <p className="mb-1">
                <span className="font-medium">Carbohydrates:</span> {carbGrams}{" "}
                g
              </p>

              <div className="text-3xl font-bold text-blue-600 my-3">
                {insulinDose} units of insulin
              </div>

              {showAdvanced && bloodGlucose && (
                <p className="text-sm text-gray-600">
                  Includes correction for blood glucose of {bloodGlucose} mg/dL
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              Enter carbohydrate amount to calculate insulin dose
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>* Results rounded to nearest 0.5 units</p>
        <p>* These settings are saved in your profile</p>
      </div>
    </div>
  );
}
