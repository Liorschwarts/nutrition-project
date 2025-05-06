import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// Register new user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name").not().isEmpty().withMessage("Name is required"),
    validate,
  ],
  authController.register
);

// Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").exists().withMessage("Password is required"),
    validate,
  ],
  authController.login
);

// Get current user (protected route)
router.get("/me", authController.protect, authController.getCurrentUser);

// Update user settings
router.put(
  "/settings",
  authController.protect,
  [
    body("insulinCarbRatio").optional().isNumeric(),
    body("targetGlucose").optional().isNumeric(),
    body("correctionFactor").optional().isNumeric(),
    validate,
  ],
  authController.updateSettings
);

export default router;
