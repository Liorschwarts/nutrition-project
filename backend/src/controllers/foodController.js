import * as foodService from "../services/foodService.js";

// @desc    Get all foods (public foods + user's custom foods)
// @route   GET /api/foods
// @access  Private
export const getFoods = async (req, res) => {
  try {
    const foods = await foodService.getAllFoods(req.user._id);
    res.json(foods);
  } catch (error) {
    console.error("Get foods error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// @desc    Search foods by name
// @route   GET /api/foods/search?query=apple
// @access  Public
export const searchFoods = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user ? req.user._id : null;

    const foods = await foodService.searchFoodsByName(query, userId);
    res.json(foods);
  } catch (error) {
    console.error("Search foods error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// @desc    Get food by ID
// @route   GET /api/foods/:id
// @access  Public (with restrictions on custom foods)
export const getFoodById = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const food = await foodService.getFoodById(req.params.id, userId);
    res.json(food);
  } catch (error) {
    console.error("Get food by ID error:", error);

    if (error.message === "Food not found") {
      return res.status(404).json({ message: "Food not found" });
    }

    if (error.message === "Not authorized to access this food") {
      return res
        .status(403)
        .json({ message: "Not authorized to access this food" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create custom food
// @route   POST /api/foods
// @access  Private
export const createFood = async (req, res) => {
  try {
    const food = await foodService.createCustomFood(req.body, req.user._id);
    res.status(201).json(food);
  } catch (error) {
    console.error("Create food error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// @desc    Update custom food
// @route   PUT /api/foods/:id
// @access  Private (only owner)
export const updateFood = async (req, res) => {
  try {
    const food = await foodService.updateFood(
      req.params.id,
      req.body,
      req.user._id
    );
    res.json(food);
  } catch (error) {
    console.error("Update food error:", error);

    if (error.message === "Food not found") {
      return res.status(404).json({ message: "Food not found" });
    }

    if (error.message === "Not authorized to update this food") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this food" });
    }

    res.status(400).json({ message: error.message || "Server error" });
  }
};

// @desc    Delete custom food
// @route   DELETE /api/foods/:id
// @access  Private (only owner)
export const deleteFood = async (req, res) => {
  try {
    await foodService.deleteFood(req.params.id, req.user._id);
    res.json({ message: "Food removed" });
  } catch (error) {
    console.error("Delete food error:", error);

    if (error.message === "Food not found") {
      return res.status(404).json({ message: "Food not found" });
    }

    if (error.message === "Not authorized to delete this food") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this food" });
    }

    res.status(400).json({ message: error.message || "Server error" });
  }
};

// @desc    Get foods by category
// @route   GET /api/foods/category/:category
// @access  Public
export const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.user ? req.user._id : null;

    const foods = await foodService.getFoodsByCategory(category, userId);
    res.json(foods);
  } catch (error) {
    console.error("Get foods by category error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};
