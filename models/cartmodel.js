const mongoose = require('mongoose');

let CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
}, {timestamps: true});

let cart = mongoose.model('cart', CartSchema);

module.exports = cart;
