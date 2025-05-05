import axios from "axios";

/**
 * Get food from database using API service
 * @param {string} foodName - Name of the food to look up
 * @returns {Promise<Object|null>} - Food data including carbohydrate content
 */
export const getFoodFromDatabase = async (foodName) => {
  try {
    // Call the API service to search for the food
    const response = await axios.get(
      `${process.env.API_SERVICE_URL}/api/foods/search`,
      {
        params: { query: foodName },
      }
    );

    if (response.data && response.data.length > 0) {
      return response.data[0]; // Return the first matching food
    }

    return null;
  } catch (error) {
    console.error("Error getting food from database:", error);
    return null;
  }
};

/**
 * Estimate carbohydrate content for common foods
 * @param {string} foodName - Name of the food
 * @returns {Object|null} - Estimated carbohydrate content or null if unknown
 */
export const estimateCarbs = (foodName) => {
  // Basic estimations for common foods
  const foodName_lower = foodName.toLowerCase();

  // Map of common foods and their approximate carb content per serving
  const commonFoods = {
    apple: { carbsPerServing: 15, servingSize: "1 medium" },
    banana: { carbsPerServing: 27, servingSize: "1 medium" },
    bread: { carbsPerServing: 15, servingSize: "1 slice" },
    rice: { carbsPerServing: 45, servingSize: "1 cup cooked" },
    potato: { carbsPerServing: 30, servingSize: "1 medium" },
    pasta: { carbsPerServing: 45, servingSize: "1 cup cooked" },
    orange: { carbsPerServing: 15, servingSize: "1 medium" },
    milk: { carbsPerServing: 12, servingSize: "1 cup" },
    yogurt: { carbsPerServing: 15, servingSize: "1 cup" },
    cereal: { carbsPerServing: 30, servingSize: "1 cup" },
    bagel: { carbsPerServing: 48, servingSize: "1 whole" },
    pizza: { carbsPerServing: 30, servingSize: "1 slice" },
    sandwich: { carbsPerServing: 30, servingSize: "1 sandwich" },
    cookie: { carbsPerServing: 15, servingSize: "1 medium" },
    cake: { carbsPerServing: 30, servingSize: "1 slice" },
    "ice cream": { carbsPerServing: 15, servingSize: "1/2 cup" },
  };

  // Check if the food name contains any of the common foods
  for (const [key, value] of Object.entries(commonFoods)) {
    if (foodName_lower.includes(key)) {
      return {
        name: foodName,
        ...value,
        carbsEstimated: true,
        message: "Carbohydrate content is estimated",
      };
    }
  }

  return null;
};
