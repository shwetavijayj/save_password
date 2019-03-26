//import mongoose lib
const mongoose = require('mongoose');

//set global promise
mongoose.Promise = global.Promise;

//set connection with mongodb
mongoose.connect("mongodb://localhost/PersonalInfo", {
    useNewUrlParser: true
});
let dbconnect = mongoose.connection;
if (!dbconnect) {
    console.log("Sorry, Database connection fail!");
    return;
}

//define schema

let userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

let userApplicationDetails = mongoose.Schema({
    applicationid: Number,
    userApplication: String,
    password: Object
})

module.exports = {
    mongoose,
    userSchema,
    userApplicationDetails
}