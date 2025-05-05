"use client";
import { useState, useEffect } from "react";
import BasicSettings from "./BasicSettings";
import AdvancedSettings from "./AdvancedSettings";
import CalculationResults from "./CalculationResults";
import { useSettings } from "../../hooks/useSettings";

export default function InsulinCalculator({ carbGrams = "" }) {
  const { settings, updateSetting } = useSettings();

  const [bloodGlucose, setBloodGlucose] = useState("");
  const [insulinDose, setInsulinDose] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate insulin dose whenever inputs change
  useEffect(() => {
    calculateInsulinDose();
  }, [
    carbGrams,
    settings.insulinCarbRatio,
    bloodGlucose,
    settings.targetGlucose,
    settings.correctionFactor,
  ]);

  const calculateInsulinDose = () => {
    // Reset result if no carbs entered
    if (!carbGrams) {
      setInsulinDose(null);
      return;
    }

    // Calculate insulin for carbs
    const carbsInsulin =
      parseFloat(carbGrams) / parseFloat(settings.insulinCarbRatio);

    // Calculate correction insulin (only if blood glucose is entered)
    let correctionInsulin = 0;
    if (bloodGlucose && settings.targetGlucose && settings.correctionFactor) {
      const glucoseDifference =
        parseFloat(bloodGlucose) - parseFloat(settings.targetGlucose);
      if (glucoseDifference > 0) {
        correctionInsulin =
          glucoseDifference / parseFloat(settings.correctionFactor);
      }
    }

    // Total insulin dose (rounded to the nearest 0.5 units)
    const total = carbsInsulin + correctionInsulin;
    const roundedTotal = Math.round(total * 2) / 2;

    setInsulinDose(roundedTotal);
  };

  return (
    <div className="space-y-4">
      <BasicSettings
        insulinCarbRatio={settings.insulinCarbRatio}
        onChange={updateSetting}
      />

      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
        >
          {showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
        </button>
      </div>

      {showAdvanced && (
        <AdvancedSettings
          bloodGlucose={bloodGlucose}
          setBloodGlucose={setBloodGlucose}
          targetGlucose={settings.targetGlucose}
          correctionFactor={settings.correctionFactor}
          onChange={updateSetting}
        />
      )}

      <CalculationResults
        insulinDose={insulinDose}
        carbGrams={carbGrams}
        showAdvanced={showAdvanced}
        bloodGlucose={bloodGlucose}
      />
    </div>
  );
}
