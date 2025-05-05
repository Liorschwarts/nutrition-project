import express from "express";
import { body } from "express-validator";
import * as foodController from "../controllers/foodController.js";
import * as authController from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// Get all foods (public foods + user's custom foods)
router.get("/", authController.protect, foodController.getFoods);

// Search foods
router.get("/search", foodController.searchFoods);

// Get food by ID
router.get("/:id", foodController.getFoodById);

// Create custom food (protected)
router.post(
  "/",
  authController.protect,
  [
    body("name").not().isEmpty().withMessage("Food name is required"),
    body("servingSize").not().isEmpty().withMessage("Serving size is required"),
    body("carbsPerServing").isNumeric().withMessage("Carbs must be a number"),
    body("category")
      .optional()
      .isIn([
        "breads-grains",
        "fruits",
        "vegetables",
        "dairy",
        "snacks-sweets",
        "other",
      ]),
    body("glycemicIndex").optional().isNumeric(),
    validate,
  ],
  foodController.createFood
);

// Update custom food (protected & must be owner)
router.put(
  "/:id",
  authController.protect,
  [
    body("name").optional(),
    body("servingSize").optional(),
    body("carbsPerServing").optional().isNumeric(),
    body("category")
      .optional()
      .isIn([
        "breads-grains",
        "fruits",
        "vegetables",
        "dairy",
        "snacks-sweets",
        "other",
      ]),
    body("glycemicIndex").optional().isNumeric(),
    validate,
  ],
  foodController.updateFood
);

// Delete custom food (protected & must be owner)
router.delete("/:id", authController.protect, foodController.deleteFood);

// Get foods by category
router.get("/category/:category", foodController.getFoodsByCategory);

export default router;
