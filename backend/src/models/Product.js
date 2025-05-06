import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  carbsPer100g: { type: Number, required: true },
  portionSize: Number,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
