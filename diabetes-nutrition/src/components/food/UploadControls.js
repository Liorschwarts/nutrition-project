import React from "react";
import { Button } from "../ui/FormElements";

export default function UploadControls({
  isUploading,
  onFileSelect,
  onCaptureClick,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <label className="btn btn-primary flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileSelect}
          disabled={isUploading}
        />
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        {isUploading ? "Analyzing..." : "Upload Photo"}
      </label>

      <Button
        type="button"
        onClick={onCaptureClick}
        disabled={isUploading}
        className="flex items-center justify-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        Take Photo
      </Button>

      <p className="text-sm text-gray-500">
        Take or upload a photo of your food to detect carbs
      </p>
    </div>
  );
}
