"use client";
import { InputField } from "../ui/FormElements";

export default function AdvancedSettings({
  bloodGlucose,
  setBloodGlucose,
  targetGlucose,
  setTargetGlucose,
  correctionFactor,
  setCorrectionFactor,
}) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-md">
      <InputField
        label="Current Blood Glucose (mg/dL)"
        id="bloodGlucose"
        type="number"
        value={bloodGlucose}
        onChange={(e) => setBloodGlucose(e.target.value)}
        min="0"
        max="500"
        placeholder="Enter your current blood glucose"
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Target Blood Glucose (mg/dL)"
          id="targetGlucose"
          type="number"
          value={targetGlucose}
          onChange={(e) => setTargetGlucose(e.target.value)}
          min="70"
          max="200"
        />

        <InputField
          label="Correction Factor (mg/dL per unit)"
          id="correctionFactor"
          type="number"
          value={correctionFactor}
          onChange={(e) => setCorrectionFactor(e.target.value)}
          min="1"
          max="150"
        />
      </div>
    </div>
  );
}
