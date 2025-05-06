import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authService.registerUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error("Register error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    res.json(user);
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(401)
      .json({ message: error.message || "Invalid email or password" });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(404).json({ message: error.message || "User not found" });
  }
};

// @desc    Update user settings
// @route   PUT /api/auth/settings
// @access  Private
export const updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    const updatedSettings = await authService.updateUserSettings(
      req.user._id,
      settings
    );

    res.json({
      message: "Settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// Middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from token
    try {
      const user = await authService.getUserById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
