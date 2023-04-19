const express = require("express");
const users = require("../models/usermodel");
const cart = require("../models/cartmodel");
const products = require("../models/productmodel");
const wishlist = require("../models/wishlistmodel");


const wishlistrouter = express.Router();

wishlistrouter.post("/wishlist", async (req, res) => {
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
    const cartItem = await wishlist.findOne({
      user: userId,
      "wishlists.product": productId,
    });
    if (cartItem) {
      // If the product already exists in the cart, update the quantity
      await wishlist.findOneAndUpdate(
        { user: userId, "wishlists.product": productId },
        { $inc: { "wishlists.$.quantity": quantity } }
      );
    } else {
      // If the product doesn't exist in the cart, add it
      await wishlist.create({
        user: userId,
        wishlists: [{ product: productId, quantity: quantity }],
      });
    }

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error in wishlist router" });
  }
});

wishlistrouter.get("/wishlist/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await users.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all products in the order cart for the specified user
    const cartItems = await wishlist.find({ user: userId }).populate("wishlists.product");
    const wishlistsCart = cartItems.map(item => item.orders[0].product);
    console.log("wishlistsCart: ", wishlistsCart);
    res.status(200).json({ wishlistsCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// wishlistrouter.delete("/wishlist", async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     // Check if the user exists
//     const userExists = await users.findById(userId);
//     if (!userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the product exists
//     const productExists = await products.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Check if the user already has the product in their cart
//     try {
//       let delprod = await wishlist.findOneAndDelete({
//         user: userId,
//         "wishlists.product": productId,
//       });
//       if (delprod) {
//         res.status(200).json({ message: "Product deleted from wishlist" });
//       } else {
//         return res
//           .status(404)
//           .json({
//             message: "This Product isnt Available in wishlist of the user given",
//           });
//       }
//     } catch (error) {
//       console.log("error: ", error);

//       // If the product doesn't exist in the cart, throw error
//       return res
//         .status(404)
//         .json({
//           message: "This Product isnt Available in wishlist of the user given",
//         });
//     }
//     res.status(200).json({ message: "Product deleted from wishlist" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error in wishlist router" });
//   }
// });

wishlistrouter.delete("/wishlist", async (req, res) => {
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
      let delprod = await wishlist.findOneAndDelete({
        user: userId,
        "wishlists.product": productId,
      });
      if (delprod) {
        res.status(200).json({ message: "Product deleted from wishlist" });
      } else {
        return res
          .status(404)
          .json({
            message: "This Product isnt Available in wishlist of the user given",
          });
      }
    } catch (error) {
      console.log("error: ", error);

      // If the product doesn't exist in the cart, throw error
      return res
        .status(404)
        .json({
          message: "This Product isnt Available in wishlist of the user given",
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error in wishlist router" });
  }
});


module.exports = wishlistrouter;
