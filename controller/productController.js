const mongoose = require("mongoose");
const product = require("../models/productmodel");

async function getproductTops({ title, q, price1, limit, page }) {
  const filters = {};

  if (title) filters.Title = new RegExp(title, "i");
  if (q) filters.Title = new RegExp(q, "i");
  if (price1) filters.Rating = price1;

  const data = await product
    .find({ category: "tops" }, filters)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ Rating: -1 });
  return data;
}

async function getProductDresses({ title, q, price1, limit, page }) {
  const filters = {};

  if (title) filters.Title = new RegExp(title, "i");
  if (q) filters.Title = new RegExp(q, "i");
  if (price1) filters.Rating = price1;

  const data = await product
    .find({ category: "dress" }, filters)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ Rating: -1 });
  return data;
}

async function createOne(data) {
  console.log(data);
  let productex = await product.find({ title: data.title });
  console.log(productex);
  if (productex.length === 1) {
    throw new Error("This Product Already Exists");
  }
  let Cproduct = await product.create({ ...data });
  console.log("Cproduct");
  Cproduct = await Cproduct.toJSON();
  return Cproduct;
}



async function AddCart({ _id }) {
  try {
    let cartitem = await product.findById(_id);
    return cartitem;
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = { getproductTops, getProductDresses, createOne, AddCart };
