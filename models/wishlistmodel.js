const mongoose = require('mongoose');

let WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  wishlists: [{
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

let wishlist = mongoose.model('wishlist', WishlistSchema);

module.exports = wishlist;
