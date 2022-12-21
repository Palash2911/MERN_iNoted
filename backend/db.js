const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `${process.env.DATABASE}`
console.log(mongoURI.toString());
// "mongodb://localhost:27017/inoted?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect("mongodb://localhost/inoted");
}

module.exports = connectToMongo
