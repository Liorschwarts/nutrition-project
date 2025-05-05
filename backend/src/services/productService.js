const axios = require("axios");
const Product = require("../models/Product");

async function getProductByName(name) {
  const cached = await Product.findOne({ name: name.toLowerCase() });
  if (cached) {
    return cached.data;
  }

  const url = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(
    name
  )}.json`;
  const res = await axios.get(url);
  const data = res.data;

  if (data.status === 1) {
    await Product.create({ name: name.toLowerCase(), data: data.product });
    return data.product;
  } else {
    throw new Error("Product not found in external API");
  }
}

module.exports = { getProductByName };
