require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
