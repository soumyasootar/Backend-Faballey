const express = require('express');
const authLoginUser = require('../Middleware/auth.middleware');
const {getproductTops,getProductDresses,createOne} = require('../controller/productController');
const product=express.Router();


product.get('/tops', async (req, res) => {
    try {
        const response=req.query;
        console.log(rating)
        const data= await getproductTops(response);
      res.status(200).send(data)
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

product.get('/dress', async (req, res) => {
    try {
        const response=req.query;
        console.log(rating)
        const data= await getProductDresses(response);
      res.status(200).send(data)
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})


product.post('/products',async (req, res) => {
    const body= req.body;
    try{
const data= await createOne(body)
res.status(200).send(data);

    }catch(e){
        return res.status(500).send({
            error: 'Already exists'
        })
    }
})





module.exports =product;