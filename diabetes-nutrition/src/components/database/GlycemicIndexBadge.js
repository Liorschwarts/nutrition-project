import React from "react";

export default function GlycemicIndexBadge({ value }) {
  if (value >= 70) {
    return (
      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
        High
      </span>
    );
  } else if (value >= 55) {
    return (
      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
        Medium
      </span>
    );
  } else {
    return (
      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
        Low
      </span>
    );
  }
}
