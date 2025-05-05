import React from "react";

export default function PageHeader({ title, description }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {description && (
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
