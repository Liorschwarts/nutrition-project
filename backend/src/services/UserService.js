import User from "../models/User.js";
import Food from "../models/Food.js";
import bcrypt from "bcryptjs";

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Object} User profile
 */
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data to update
 * @returns {Object} Updated user profile
 */
export const updateUserProfile = async (userId, profileData) => {
  const { name, email } = profileData;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Update fields
  if (name) user.name = name;

  // If email is changing, check if it's already in use
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error("Email already in use");
    }
    user.email = email;
  }

  await user.save();

  // Return user data without password
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    settings: user.settings,
  };
};

/**
 * Get user's custom foods
 * @param {string} userId - User ID
 * @returns {Array} List of user's custom foods
 */
export const getUserFoods = async (userId) => {
  const foods = await Food.find({
    userId,
    isCustom: true,
  }).sort({ name: 1 });

  return foods;
};

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {boolean} Success status
 */
export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check if current password is correct
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  // Update password
  user.password = newPassword;
  await user.save();

  return true;
};
