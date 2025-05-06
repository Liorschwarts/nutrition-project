import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SettingsSchema = new mongoose.Schema({
  insulinCarbRatio: {
    type: Number,
    default: 10, // 1 unit per 10g carbs
  },
  targetGlucose: {
    type: Number,
    default: 120, // Target: 120 mg/dL
  },
  correctionFactor: {
    type: Number,
    default: 50, // 1 unit reduces 50 mg/dL
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  settings: {
    type: SettingsSchema,
    default: () => ({}),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified("password")) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
