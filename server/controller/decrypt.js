const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function decryptData(dataString, callback) {
    console.log(dataString);
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
    // decrypted = Buffer.concat([decrypted, decipher.final()]);
    answer = decrypted.toString();
    callback(null, answer);
}

let data = {
    iv: 'b46b8c282549c841e859c2077392f4c4',
    encryptedData: '75a7b16082b7fec89cdcd198dc7c5c5b3q0jtr3xjbd'
}
decryptData(data, (error, result1) => {
    console.log("Hello-->", result1);
})


module.exports = {
    decryptData
}