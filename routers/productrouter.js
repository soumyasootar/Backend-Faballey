const express = require("express");
const authLoginUser = require("../Middleware/auth.middleware");
const {
  getproductTops,
  getProductDresses,
  createOne,
  AddCart,
} = require("../controller/productController");
const users = require("../models/usermodel");
const cart = require("../models/cartmodel");
const products = require("../models/productmodel");
 
const product = express.Router();

product.get("/tops", async (req, res) => {
  try {
    const response = req.query;
    console.log(rating);
    const data = await getproductTops(response);
    res.status(200).send(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
});

product.get("/dress", async (req, res) => {
  try {
    const response = req.query;
    console.log(rating);
    const data = await getProductDresses(response);
    res.status(200).send(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
});

product.post("/products", async (req, res) => {
  try {
    const body = req.body;
    const data = await createOne(body);
    res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({
      error: "Already exists",
    });
  }
});

product.post("/cart", async (req, res) => {
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

module.exports = product;

// product.delete("/cart", async (req, res) => {
//   try {
//     const { userId, productId} = req.body;

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
//       let delprod=await cart.findOneAndDelete({
//         user: userId,
//         "products.product": productId,
//       });
//       if(delprod){
//         res.status(200).json({ message: "Product deleted from cart" });
//       }else{
//         return res.status(404).json({ message: "This Product isnt Available in cart of the user given" });
//       }
//     } catch (error) {
//       console.log("error: ", error);
      
//       // If the product doesn't exist in the cart, throw error 
//       return res.status(404).json({ message: "This Product isnt Available in cart of the user given" });
//     }
//     res.status(200).json({ message: "Product deleted from cart" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// product.post("/cart", async (req, res) => {
//   try {
//     const body = req.body;
//     console.log("body: ", body);
//     const cartdata = await AddCart(body);

//     let userExist = await users.findOne({ email: body.email });
//     if (!userExist) {
//       res.status(500).send({
//         error: "Error in Finding user while adding to cart",
//       });
//     } else {
//       let cartitems = [...userExist.cart] || [];
//       cartitems.push(cartdata);
//       console.log("cartitems: ", cartitems);
//       userExist.cart = cartitems;
//       await users.findByIdAndUpdate(userExist._id, userExist);
//       console.log("userExist: ", userExist);
//     }

//     res.status(200).send("add to cart");
//   } catch (e) {
//     console.log("e: ", e);
//     return res.status(500).send({
//       error: "Error in Adding To Cart",
//     });
//   }
// });

// product.delete("/cart", async (req, res) => {
//   try {
//     const body = req.body;
//     console.log("body: ", body);

//     let userExist = await users.findOne({ email: body.email });
//     if (!userExist) {
//       res.status(500).send({
//         error: "Error in Finding user while deleting from cart",
//       });
//     } else {
//       let cartitems = [...userExist.cart] || [];
//       console.log("cartitems: ", cartitems);
//       let afterDeleteCart = cartitems.filter(
//         (item) => item._id.toString()!= body._id
//         );
//       // userExist.cart = afterDeleteCart;
//       console.log("afterDeleteCart: ", afterDeleteCart);
//       // await users.findByIdAndUpdate(userExist._id, userExist);
//       console.log("userExist: ", userExist);
//     }

//     res.status(200).send("deleted from cart");
//   } catch (e) {
//     console.log("e: ", e);
//     return res.status(500).send({
//       error: "Error in deleting from cart",
//     });
//   }
// });
