const express = require("express");
const app= express();
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
//to hide password 
require('dotenv/config');

//middlewares
//to allow use this project online 
app.use(cors());
//to parse through the data and convert it indo json format
app.use(bodyParser.json());
//we can use authenticate whenever we hit the routes 
//you have the ability to create routes
//Routes
//Import Routes
const postRoute = require('./routes/post')

//middlewares 
/* app.use('/post',()=>{
    console.log('this middleware is running')
}) */
app.use('/post',postRoute)


//Routes
app.get('/',(req,res)=>{
    res.send("we are home");
});


//connect to db
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    ()=>{
    console.log('connected to DB')
})


//how do we start listening
app.listen(3000);


