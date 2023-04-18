const product = require("../models/productmodel")


async function getProductTops({title,q,price1,limit,page}){
    const filters = {}

        if (title) filters.Title = new RegExp(title, 'i')
        if (q) filters.Title = new RegExp(q, 'i')
        if (price1) filters.Rating =  (price1)

        const data = await product.find({category:"tops"},filters).limit(limit).skip((page-1)*limit).sort({Rating: -1});
        return data;

}


async function getProductDresses({title,q,price1,limit,page}){
    const filters = {}

        if (title) filters.Title = new RegExp(title, 'i')
        if (q) filters.Title = new RegExp(q, 'i')
        if (price1) filters.Rating =  (price1)

        const data = await product.find({category:"dress"},filters).limit(limit).skip((page-1)*limit).sort({Rating: -1});
        return data;

}

async function createOne(data){
// console.log(data)
    let productex=await product.find({title:data.title});
    console.log(productex)
    if(productex.length===1){
        throw new Error('User already exists with the given email')
    }
    let Cproduct=await product.create({...data});
    console.log("Cproduct")
        Cproduct=await Cproduct.toJSON()
        return Cproduct;
    

}

module.exports ={ getProductTops,getProductDresses,createOne}