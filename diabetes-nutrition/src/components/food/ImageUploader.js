"use client";
import { useState } from "react";
import { imageApi } from "../../services/api-image";
import ImagePreview from "./ImagePreview";
import UploadControls from "./UploadControls";
import { captureImageFromCamera } from "./imageCaptureUtil";

export default function ImageUploader({ onFoodDetected }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL for the image
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Process the image file
    analyzeImage(file);
  };

  const analyzeImage = async (file) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Send the image to the API for analysis
      const data = await imageApi.analyzeImage(file);

      if (!data.success) {
        throw new Error(data.message || "Failed to analyze image");
      }

      // Pass the detected food data to parent component
      onFoodDetected({
        name: data.identified,
        carbsPerServing: data.foodData?.carbsPerServing || 0,
        servingSize: data.foodData?.servingSize || "serving",
        confidence: data.confidence,
        estimatedCarbs: data.foodData?.carbsEstimated || true,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      setUploadError(
        error.message || "Failed to analyze image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCaptureImage = async () => {
    try {
      // Request camera access and process image
      const file = await captureImageFromCamera();
      if (file) {
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        analyzeImage(file);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      setUploadError("Failed to access camera. Please check your permissions.");
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <UploadControls
        isUploading={isUploading}
        onFileSelect={handleImageChange}
        onCaptureClick={handleCaptureImage}
      />

      {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}

      {previewUrl && (
        <ImagePreview url={previewUrl} isUploading={isUploading} />
      )}
    </div>
  );
}
