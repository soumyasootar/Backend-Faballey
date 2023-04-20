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

app.get("/faballey",async(req,res)=>{
    res.end("welcome to faballey backend")
})
app.get("/",async(req,res)=>{
    res.end("welcome to faballey backend")
})





const port="3002";
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