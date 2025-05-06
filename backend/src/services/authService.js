import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} User object with token
 */
export const registerUser = async (userData) => {
  const { email, password, name } = userData;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    name,
  });

  if (!user) {
    throw new Error("Invalid user data");
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    settings: user.settings,
    token: generateToken(user._id),
  };
};

/**
 * Authenticate user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User object with token
 */
export const authenticateUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.comparePassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      settings: user.settings,
      token: generateToken(user._id),
    };
  }

  throw new Error("Invalid email or password");
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Object} User object
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update user settings
 * @param {string} userId - User ID
 * @param {Object} settings - User settings
 * @returns {Object} Updated settings
 */
export const updateUserSettings = async (userId, settings) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Update only the settings that are provided
  if (settings.insulinCarbRatio !== undefined) {
    user.settings.insulinCarbRatio = settings.insulinCarbRatio;
  }

  if (settings.targetGlucose !== undefined) {
    user.settings.targetGlucose = settings.targetGlucose;
  }

  if (settings.correctionFactor !== undefined) {
    user.settings.correctionFactor = settings.correctionFactor;
  }

  await user.save();

  return user.settings;
};
