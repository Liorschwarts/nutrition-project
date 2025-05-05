const express = require("express");
const router = express.Router();
const { getProduct } = require("../controllers/productController");

router.get("/:name", getProduct);

module.exports = router;
