import React from "react";
import { Card } from "../ui/FormElements";

export default function GlycemicIndexInfo() {
  return (
    <Card
      title="Understanding Glycemic Index"
      className="mt-8 bg-blue-50 border border-blue-100"
    >
      <p className="text-gray-700 mb-3">
        The glycemic index (GI) measures how quickly food raises blood glucose
        levels. Foods with a high GI are rapidly digested and cause significant
        fluctuations in blood sugar, while foods with a low GI are digested more
        slowly, producing a more gradual rise in blood sugar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-green-50 p-3 rounded-md border border-green-100">
          <h3 className="font-medium text-green-800">Low GI (55 or less)</h3>
          <p className="text-sm text-gray-600">
            Slowly digested, gradual rise in blood sugar
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Examples: most fruits, vegetables, beans, whole grains
          </p>
        </div>

        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
          <h3 className="font-medium text-yellow-800">Medium GI (56-69)</h3>
          <p className="text-sm text-gray-600">
            Moderate impact on blood sugar
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Examples: whole wheat products, brown rice, sweet potato
          </p>
        </div>

        <div className="bg-red-50 p-3 rounded-md border border-red-100">
          <h3 className="font-medium text-red-800">High GI (70 or more)</h3>
          <p className="text-sm text-gray-600">
            Rapidly digested, quick rise in blood sugar
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Examples: white bread, potatoes, most white rice
          </p>
        </div>
      </div>
    </Card>
  );
}
