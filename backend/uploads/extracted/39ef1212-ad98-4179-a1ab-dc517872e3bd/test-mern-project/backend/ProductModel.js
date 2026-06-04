const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

// EchoBrain detects Model declarations
module.exports = mongoose.model('Product', ProductSchema);
