import express from "express";
import {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController.js";

const router = express.Router();

// CRUD Routes
router.post("/", createProductHandler);
router.get("/", getProductsHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
