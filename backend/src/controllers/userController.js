import * as userService from "../services/userService.js";

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (admin only - future feature)
export const getUserById = async (req, res) => {
  try {
    // In the future, we could add admin role checks here
    // For now, users can only access their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this profile" });
    }

    const user = await userService.getUserProfile(req.params.id);
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(404).json({ message: error.message || "User not found" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(
      req.user._id,
      req.body
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// @desc    Get user's custom foods
// @route   GET /api/users/foods
// @access  Private
export const getUserFoods = async (req, res) => {
  try {
    const foods = await userService.getUserFoods(req.user._id);
    res.json(foods);
  } catch (error) {
    console.error("Get user foods error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// @desc    Change user password
// @route   PUT /api/users/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changeUserPassword(
      req.user._id,
      currentPassword,
      newPassword
    );
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);

    if (error.message === "Current password is incorrect") {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    res.status(400).json({ message: error.message || "Server error" });
  }
};
