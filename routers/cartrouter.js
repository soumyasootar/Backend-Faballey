const express = require("express");
const users = require("../models/usermodel");
const cart = require("../models/cartmodel");
const products = require("../models/productmodel");

const cartrouter = express.Router();

cartrouter.post("/cart", async (req, res) => {
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

    // Check if the user already has the product in their cart
    const cartItem = await cart.findOne({
      user: userId,
      "products.product": productId,
    });
    if (cartItem) {
      // If the product already exists in the cart, update the quantity
      await cart.findOneAndUpdate(
        { user: userId, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      // If the product doesn't exist in the cart, add it
      await cart.create({
        user: userId,
        products: [{ product: productId, quantity: quantity }],
      });
    }

    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

cartrouter.delete("/cart", async (req, res) => {
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
      let delprod = await cart.findOneAndDelete({
        user: userId,
        "products.product": productId,
      });
      if (delprod) {
        res.status(200).json({ message: "Product deleted from cart" });
      } else {
        return res
          .status(404)
          .json({
            message: "This Product isnt Available in cart of the user given",
          });
      }
    } catch (error) {
      console.log("error: ", error);

      // If the product doesn't exist in the cart, throw error
      return res
        .status(404)
        .json({
          message: "This Product isnt Available in cart of the user given",
        });
    }
    res.status(200).json({ message: "Product deleted from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

cartrouter.get("/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await users.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all products in the cart for the specified user
    const cartItems = await cart.find({ user: userId }).populate("products.product");
    console.log("cartItems: ", cartItems);
    const productsCart = cartItems.map(item => item.products[0].product);
    console.log("productsCart: ", productsCart);
    res.status(200).json({ productsCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = cartrouter;
