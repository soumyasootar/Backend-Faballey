const mongoose = require('mongoose');

async function database(){
    await mongoose.connect('mongodb://localhost:27017/faballey')
    .then(()=>{
        console.log('Database connected');
    }).catch((e)=>{
        console.log('Error connecting');
    })
}

module.exports = database