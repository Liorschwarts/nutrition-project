import React from "react";

export default function ImagePreview({ url, isUploading }) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
      <div className="relative w-full max-w-md h-48 overflow-hidden rounded-lg border border-gray-300">
        <img
          src={url}
          alt="Food preview"
          className="w-full h-full object-cover"
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white">Analyzing image...</div>
          </div>
        )}
      </div>
    </div>
  );
}
