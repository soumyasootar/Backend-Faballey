const mongoose = require('mongoose');

let ProductSchema= new mongoose.Schema({
    category:{type:"string", required:true},
    title:{type:"string", required:true},
    discount:{type:"string", required:true},
    price2:{type:"string"},
    price1:{type:"string", required:true},
    colour:{type:"string"},
    site:{type:"string", required:true},
    img1:{type:"string"},
    img2:{type:"string"},
    img3:{type:"string"},
    img4:{type:"string"},
}
)

let product=mongoose.model("product",ProductSchema);

module.exports= product;