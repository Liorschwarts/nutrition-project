import Food from "../models/Food.js";

/**
 * Get all foods (public foods + user's custom foods)
 * @param {string} userId - User ID
 * @returns {Array} List of foods
 */
export const getAllFoods = async (userId) => {
  // Find public foods and user's custom foods
  const foods = await Food.find({
    $or: [
      { isCustom: false }, // Public foods
      { userId }, // User's custom foods
    ],
  }).sort({ name: 1 });

  return foods;
};

/**
 * Search foods by name
 * @param {string} query - Search query
 * @param {string} [userId] - Optional user ID for including custom foods
 * @returns {Array} List of matching foods
 */
export const searchFoodsByName = async (query, userId = null) => {
  if (!query) {
    throw new Error("Search query is required");
  }

  // Build query conditions
  const conditions = {
    $or: [
      // Use text search if text index is set up
      { $text: { $search: query } },
      // Fallback to regex search
      { name: { $regex: query, $options: "i" } },
    ],
  };

  // If user is authenticated, include their custom foods
  if (userId) {
    conditions.$and = [
      {
        $or: [{ isCustom: false }, { userId }],
      },
    ];
  } else {
    // For unauthenticated users, only include public foods
    conditions.isCustom = false;
  }

  const foods = await Food.find(conditions).sort({ name: 1 });

  return foods;
};

/**
 * Get food by ID
 * @param {string} foodId - Food ID
 * @param {string} [userId] - Optional user ID for authorization check
 * @returns {Object} Food object
 */
export const getFoodById = async (foodId, userId = null) => {
  const food = await Food.findById(foodId);

  if (!food) {
    throw new Error("Food not found");
  }

  // Check if food is public or belongs to the user
  if (
    food.isCustom &&
    (!userId || food.userId.toString() !== userId.toString())
  ) {
    throw new Error("Not authorized to access this food");
  }

  return food;
};

/**
 * Create custom food
 * @param {Object} foodData - Food data
 * @param {string} userId - User ID
 * @returns {Object} Created food
 */
export const createCustomFood = async (foodData, userId) => {
  const { name, servingSize, carbsPerServing, category, glycemicIndex } =
    foodData;

  // Create new food
  const food = await Food.create({
    name,
    servingSize,
    carbsPerServing,
    category: category || "other",
    glycemicIndex: glycemicIndex || null,
    isCustom: true,
    userId,
  });

  return food;
};

/**
 * Update custom food
 * @param {string} foodId - Food ID
 * @param {Object} foodData - Updated food data
 * @param {string} userId - User ID
 * @returns {Object} Updated food
 */
export const updateFood = async (foodId, foodData, userId) => {
  // Find food
  const food = await Food.findById(foodId);

  if (!food) {
    throw new Error("Food not found");
  }

  // Check if food is custom and belongs to the user
  if (!food.isCustom || food.userId.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this food");
  }

  // Update food properties
  const { name, servingSize, carbsPerServing, category, glycemicIndex } =
    foodData;

  if (name) food.name = name;
  if (servingSize) food.servingSize = servingSize;
  if (carbsPerServing) food.carbsPerServing = carbsPerServing;
  if (category) food.category = category;
  if (glycemicIndex !== undefined) food.glycemicIndex = glycemicIndex;

  await food.save();

  return food;
};

/**
 * Delete custom food
 * @param {string} foodId - Food ID
 * @param {string} userId - User ID
 * @returns {boolean} Success status
 */
export const deleteFood = async (foodId, userId) => {
  // Find food
  const food = await Food.findById(foodId);

  if (!food) {
    throw new Error("Food not found");
  }

  // Check if food is custom and belongs to the user
  if (!food.isCustom || food.userId.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this food");
  }

  await Food.deleteOne({ _id: foodId });

  return true;
};

/**
 * Get foods by category
 * @param {string} category - Category name
 * @param {string} [userId] - Optional user ID for including custom foods
 * @returns {Array} List of foods in the category
 */
export const getFoodsByCategory = async (category, userId = null) => {
  // Validate category
  const validCategories = [
    "breads-grains",
    "fruits",
    "vegetables",
    "dairy",
    "snacks-sweets",
    "other",
  ];
  if (!validCategories.includes(category)) {
    throw new Error("Invalid category");
  }

  // Build query conditions
  const conditions = { category };

  // If user is authenticated, include their custom foods
  if (userId) {
    conditions.$or = [{ isCustom: false }, { userId }];
  } else {
    // For unauthenticated users, only include public foods
    conditions.isCustom = false;
  }

  const foods = await Food.find(conditions).sort({ name: 1 });

  return foods;
};
