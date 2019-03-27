const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var uniqid = require('uniqid');
const mongoose = require('./mongoConnect');
let userDataModel = mongoose.mongoose.model("userData", mongoose.userApplicationDetails, "userData");
let userDetailsModel = mongoose.mongoose.model("user", mongoose.userSchema, "user");

//function to encrypt Data.
function encryptData(dataString, callback) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(dataString);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log("encrypted Data", encrypted.toString('hex'));
    let answer = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    let randomString = uniqid.process();
    answer.encryptedData = answer.encryptedData + randomString;
    let saveData = {
        applicationid: 1,
        userApplication: 'xyz',
        password: answer
    }
    userDataModel.create(saveData, (err, result) => {
        if (err) {
            console.log("error", err);
        }
        else {
            console.log("Result", result);
        }
    })
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
            if (result.length != 0) {
                let response = { msg: 'User is authenticated' };
                callback(null, response);
            }
            else {
                console.log("User not found");
                let response = { msg: 'User not found' };
                callback(null, response);
            }
        }
    })
    callback(null, result);
}

function decryptData(dataString, callback) {
    console.log("Data in decryptFun", dataString);
    if (dataString.encryptedData.length == 44) {
        dataString.encryptedData = (dataString.encryptedData).slice(0, -12);
        console.log("length is 44", dataString.encryptedData);
    }
    else if (dataString.encryptedData.length == 43) {
        dataString.encryptedData = (dataString.encryptedData).slice(0, -11);
        console.log("length is 43", dataString.encryptedData);
    }
    let iv = Buffer.from(dataString.iv, 'hex');
    console.log("data to decrypt", dataString.encryptedData, "  -->", iv);
    let encryptedText = Buffer.from(dataString.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    answer = decrypted.toString();
    callback(null, answer);
}



//user signup
function signup(userDetails, callback) {
    userDetailsModel.create(userDetails, (error, result) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null, result);
        }
    })
    callback(null, result);
}

// temporary call to function
encryptData('text to encrypt', (err, result) => {
    if (err) {

    }
    console.log("data to pass", result);
    // let data = {
    //     iv: 'b46b8c282549c841e859c2077392f4c4',
    //     encryptedData: '75a7b16082b7fec89cdcd198dc7c5c5b3q0jtr3xjbd'
    // }
    let dataFind = { applicationid: 1 };
    userDataModel.find(dataFind, (error, result) => {
        if (error) {
            //code
        }
        else {
            console.log("result", result[0]);
            decryptData(result[0].password, (error, result1) => {
                console.log("Hello-->", result1);
            })
        }
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