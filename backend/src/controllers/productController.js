const { getProductByName } = require("../services/productService");

async function getProduct(req, res) {
  const name = req.params.name;
  try {
    const product = await getProductByName(name);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { getProduct };
