import { identifyFoodFromImage } from "./clarifaiService.js";
import { getFoodFromDatabase, estimateCarbs } from "./foodDataService.js";

/**
 * Main function to analyze food image and get carbohydrate content
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<Object>} - Analyzed food data
 */
export const analyzeFoodImage = async (imageBase64) => {
  try {
    // Identify food from image
    const concepts = await identifyFoodFromImage(imageBase64);

    if (!concepts || concepts.length === 0) {
      return {
        success: false,
        message: "No food detected in the image",
      };
    }

    // Get the top food concept
    const topFood = concepts[0];
    const foodName = topFood.name;
    const confidence = topFood.value;

    // Try to get food data from internal database first
    let foodData = await getFoodFromDatabase(foodName);

    // If not found in database, use estimation
    if (!foodData) {
      foodData = estimateCarbs(foodName);
    }

    // If we still don't have data, return the name but no carb info
    if (!foodData) {
      return {
        success: true,
        identified: foodName,
        confidence,
        message: "Food identified but carbohydrate information not available",
      };
    }

    // Return the food data
    return {
      success: true,
      identified: foodName,
      confidence,
      foodData: {
        ...foodData,
        confidence,
      },
    };
  } catch (error) {
    console.error("Error analyzing food image:", error);
    return {
      success: false,
      message: "Error analyzing food image",
    };
  }
};
