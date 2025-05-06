"use client";

export default function CalculationResult({
  insulinDose,
  carbGrams,
  showAdvanced,
  bloodGlucose,
}) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Calculation Results
      </h3>

      {insulinDose !== null ? (
        <div>
          <p className="mb-1">
            <span className="font-medium">Carbohydrates:</span> {carbGrams} g
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
  );
}
