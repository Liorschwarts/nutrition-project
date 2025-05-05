import Product from "../models/Product.js";

// Create a new product
const createProduct = async (name, carbs) => {
  try {
    const newProduct = new Product({ name, carbs });
    await newProduct.save();
    return newProduct;
  } catch (err) {
    throw new Error("Error creating product: " + err.message);
  }
};

// Get all products
const getProducts = async () => {
  try {
    return await Product.find();
  } catch (err) {
    throw new Error("Error fetching products: " + err.message);
  }
};

// Get a single product by ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  } catch (err) {
    throw new Error("Error fetching product: " + err.message);
  }
};

// Update a product
const updateProduct = async (id, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct) throw new Error("Product not found");
    return updatedProduct;
  } catch (err) {
    throw new Error("Error updating product: " + err.message);
  }
};

// Delete a product
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error("Product not found");
    return { message: "Product deleted" };
  } catch (err) {
    throw new Error("Error deleting product: " + err.message);
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
