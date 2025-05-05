import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
  carbsPerServing: {
    type: Number,
    required: true,
  },
  glycemicIndex: {
    type: Number,
    default: null,
  },
  category: {
    type: String,
    enum: [
      "breads-grains",
      "fruits",
      "vegetables",
      "dairy",
      "snacks-sweets",
      "other",
    ],
    default: "other",
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // Required only if the food is custom
    required: function () {
      return this.isCustom;
    },
  },
  imageUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create text index for better search performance
FoodSchema.index({ name: "text" });

const Food = mongoose.model("Food", FoodSchema);

export default Food;
