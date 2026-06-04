const express = require('express');
const router = express.Router();
const { getProducts } = require('./productController');

// EchoBrain should scan this route definition and pair it with frontend calls
router.get('/products', getProducts);

module.exports = router;
