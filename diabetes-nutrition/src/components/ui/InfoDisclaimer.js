import React from "react";

export default function InfoDisclaimer() {
  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h2 className="text-xl font-semibold mb-3">Important Information</h2>
      <p className="text-gray-700 mb-4">
        This application is designed to help calculate insulin units based on
        carbohydrate content in food. Calculations are based on your personal
        insulin-to-carb ratio (ICR) as determined by your healthcare provider.
      </p>
      <p className="text-gray-700 font-bold">
        This tool should not be used as a substitute for professional medical
        advice. Always consult with your healthcare provider regarding the
        appropriate insulin dosage for your specific needs.
      </p>
    </div>
  );
}
