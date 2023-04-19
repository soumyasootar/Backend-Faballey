const mongoose = require('mongoose');

let UserSchema= new mongoose.Schema({
    name:{type:"string", required:true},
    email:{type:"string", required:true,unique:true},
    password:{type:"string", required:true},
    method:{type:"string"},
    cart:[],
    wishlist:[],
    order:[],
},
{timestamps:true}
)

let users=mongoose.model("user",UserSchema);

module.exports= users;