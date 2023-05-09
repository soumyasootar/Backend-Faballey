const express = require('express');
const fs = require('fs')
const cors=require('cors');
const database=require('./config/database');
const UserAuth = require('./routers/userrouter');
const productrouter= require('./routers/productrouter');
const cartrouter = require('./routers/cartrouter');
const orderrouter = require('./routers/orderrouter');
const wishlistrouter = require('./routers/wishlistrouter');
const product = require('./models/productmodel');
const cowsay = require("cowsay");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use(cors())
app.use('/faballey',UserAuth);
app.use('/faballey',productrouter);
app.use('/faballey',cartrouter);
app.use('/faballey',orderrouter);
app.use('/faballey',wishlistrouter);
var figlet = require("figlet");



app.get("/faballey",async(req,res)=>{
    figlet("welcome to faballey backend", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
    });
    res.write("Welcome To Faballey Backend\n")
    res.write("\n")
    res.write("Routes :- \n ")
    res.write("\n ")
    res.write("User Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/loggedInUser GET")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/login POST")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/register POST")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/users GET" )
    res.write("\n ")
    res.write("\n ")
    res.write("Order Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/order  POST DELETE" ) 
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/order/:userId GET")
    res.write("\n ")
    res.write("\n ")
    res.write("Cart Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/cart  POST DELETE" ) 
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/cart/:userId GET")
    res.write("\n ")
    res.write("\n ")
    res.write("WishList Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/wishlist  POST DELETE" ) 
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/wishlist/:userId GET")
    res.write("\n ")
    res.write("\n ")
    res.write("Product Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/tops GET")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/dress GET")
    res.write("\n ")
    res.write("\n ")
    res.end("----------x-------------")
})
app.get("/",async(req,res)=>{
    figlet("welcome to faballey backend", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
    });
    res.write("Welcome To Faballey Backend\n")
    res.write("\n")
    res.write("Routes :- \n ")
    res.write("\n ")
    res.write("User Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/loggedInUser GET")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/login POST")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/register POST")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/users GET" )
    res.write("\n ")
    res.write("\n ")
    res.write("Order Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/order  POST DELETE" ) 
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/order/:userId GET")
    res.write("\n ")
    res.write("\n ")
    res.write("Cart Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/cart  POST DELETE" ) 
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/cart/:userId GET")
    res.write("\n ")
    res.write("\n ")
    res.write("WishList Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/wishlist  POST DELETE" ) 
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/wishlist/:userId GET")
    res.write("\n ")
    res.write("\n ")
    res.write("Product Routes:- \n ")
    res.write("https://backend-faballey.vercel.app/faballey/tops GET")
    res.write("\n ")
    res.write("https://backend-faballey.vercel.app/faballey/dress GET")
    res.write("\n ")
    res.write("\n ")
    res.end("----------x-------------")
})





// const port=3002;
const port = process.env.PORT || 3002
database();
app.listen(port,() => {
    console.log("listening on port "+`http://localhost:${port}/faballey`);
});




// <------IMPORT JSON TO MONGO ATLAS ------>
//DONT UNCOMMENT BELOW CODE

// const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

// console.log(data)

// const importData = async () => {
//   try {
//     await product.create(data)
//     console.log('data successfully imported')
//     // to exit the process
//     process.exit()
//   } catch (error) {
//     console.log('error', error)
//   }
// }