const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const mongoose = require('./mongoConnect');
let userDataModel = mongoose.mongoose.Model("userData", mongoose.userApplicationDetails, "userData");
let userDetailsModel = mongoose.mongoose.Model("userSchema", mongoose.userSchema, "userSchema");

//function to encrypt Data.
function encryptData(dataString, callback) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(dataString);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log("encrypted Data", encrypted.toString('hex'));
    let answer = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

    callback(null, answer)
}

//user login
function login(userDetails, callback) {
    userDetailsModel.find(userDetails, (err, result) => {
        if (err) {
            console.log("Error is :", err);
            callback(err);
        }
        else {
            console.log("The result is :", result);
            callback(null, result);
        }
    })
    callback(null, result);
}

//user signup
function signup(userDetails, callback) {
    callback(null, result);
}

// temporary call to function
encryptData('text to encrypt', (err, result) => {
    if (err) {

    }
    console.log(result);
    decryptData(result, (error, result1) => {
        console.log("Hello-->", result1);
    })
});



module.exports = {
    encryptData,
    login,
    signup
}

//todays task 
// 1.complete login signup api's with testing
// 2. expand functionality of encryption.

//use React -redux for front-end