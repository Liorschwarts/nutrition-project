const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  data: Object,
});

module.exports = mongoose.model("Product", productSchema);
