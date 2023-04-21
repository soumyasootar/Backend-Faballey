const express = require("express");
const users = require("../models/usermodel");
const cart = require("../models/cartmodel");
const products = require("../models/productmodel");
const order = require("../models/ordermodel");

const orderrouter = express.Router();

orderrouter.post("/order", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user exists
    const userExists = await users.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists
    const productExists = await products.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already has the product in their order
    const cartItem = await order.findOne({
      user: userId,
      "orders.product": productId,
    });

    // If the product doesn't exist in the order, add it
    await order.create({
      user: userId,
      orders: [{ product: productId, quantity: quantity }],
    });

    // if (cartItem) {
    //   // If the product already exists in the order, update the quantity
    //   await order.findOneAndUpdate(
    //     { user: userId, "orders.product": productId },
    //     { $inc: { "orders.$.quantity": quantity } }
    //   );
    // } else {
    // }

    res.status(200).json({ message: "Product added to ordercart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error in orderroute" });
  }
});

orderrouter.delete("/order", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if the user exists
    const userExists = await users.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists
    const productExists = await products.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already has the product in their cart
    try {
      let delprod = await order.findOneAndDelete({
        user: userId,
        "orders.product": productId,
      });
      if (delprod) {
        res.status(200).json({ message: "Product deleted from order" });
      } else {
        return res.status(404).json({
          message: "This Product isnt Available in order of the user given",
        });
      }
    } catch (error) {
      console.log("error: ", error);

      // If the product doesn't exist in the cart, throw error
      return res.status(404).json({
        message: "This Product isnt Available in order of the user given",
      });
    }
    res.status(200).json({ message: "Product deleted from order cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

orderrouter.get("/order/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await users.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all products in the order cart for the specified user
    const cartItems = await order
      .find({ user: userId })
      .populate("orders.product");
    console.log("cartItems: ", cartItems);
    const ordersCart = cartItems.map((item) => item.orders[0].product);
    console.log("ordersCart: ", ordersCart);
    res.status(200).json({ ordersCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = orderrouter;
