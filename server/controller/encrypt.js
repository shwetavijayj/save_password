const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const mongoose = require('./mongoConnect');
let userDataModel = mongoose.mongoose.Model("userData", mongoose.userDetails, "userData");
let userDetailsModel = mongoose.mongoose.Model("userSchema", mongoose.userSchema, "userSchema");
function encryptData(dataString, callback) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(dataString);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log("encrypted Data", encrypted.toString('hex'));
    let answer = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

    callback(null, answer)
}

function login(userDetails, callback) {
    callback(null, result);
}

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