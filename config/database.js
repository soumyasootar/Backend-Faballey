const mongoose = require('mongoose');

async function database(){
    // await mongoose.connect('mongodb://localhost:27017/faballey')
    await mongoose.connect(process.env.MONGO_ATLAS_URL)
    .then(()=>{
        console.log('MongoDb Database connected');
    }).catch((e)=>{
        console.log('Error connecting MongoDB');
    })
}
//user-faballeyindia1
//pass-faballey1234
module.exports = database