/**
 * Image API calls
 */

import { handleResponse } from "./api-helpers.js";

const IMAGE_SERVICE_URL =
  process.env.NEXT_PUBLIC_IMAGE_SERVICE_URL || "http://localhost:3002";

export const imageApi = {
  /**
   * Analyze food image
   * @param {File} imageFile - Image file to analyze
   * @returns {Promise<Object>} - Analysis results
   */
  analyzeImage: async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${IMAGE_SERVICE_URL}/api/images/analyze`, {
      method: "POST",
      body: formData,
    });

    return handleResponse(response);
  },

  /**
   * Analyze food from base64 image
   * @param {string} base64Image - Base64 encoded image
   * @returns {Promise<Object>} - Analysis results
   */
  analyzeBase64Image: async (base64Image) => {
    const response = await fetch(
      `${IMAGE_SERVICE_URL}/api/images/analyze-base64`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      }
    );

    return handleResponse(response);
  },
};
