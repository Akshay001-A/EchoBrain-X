const Product = require('./ProductModel');

// The route handler mapped in the AST execution graph
const getProducts = async (req, res) => {
  try {
    // EchoBrain should detect this MongoDB query
    const products = await Product.find({ active: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProducts
};
