const express = require('express');
const cors=require('cors');
const database=require('./config/database');
const UserAuth = require('./routers/userrouter');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use(cors())
app.use('/faballey',UserAuth);





const port="3002";
database();
app.listen(port,() => {
    console.log("listening on port " + `http://localhost:${port}/faballey`);
});