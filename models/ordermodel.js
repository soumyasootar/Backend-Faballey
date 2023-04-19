const mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  orders: [{
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

let order = mongoose.model('order', OrderSchema);

module.exports = order;
