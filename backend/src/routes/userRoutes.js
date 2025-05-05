import express from "express";
import { body } from "express-validator";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// Get user profile by ID (admin only)
router.get("/:id", authController.protect, userController.getUserById);

// Update user profile (own profile only)
router.put(
  "/profile",
  authController.protect,
  [
    body("name").optional().notEmpty(),
    body("email").optional().isEmail(),
    validate,
  ],
  userController.updateProfile
);

// Get user foods (custom foods)
router.get("/foods", authController.protect, userController.getUserFoods);

// Change password
router.put(
  "/password",
  authController.protect,
  [
    body("currentPassword").notEmpty(),
    body("newPassword").isLength({ min: 6 }),
    validate,
  ],
  userController.changePassword
);

export default router;
