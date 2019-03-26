const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function decryptData(dataString, callback) {
    let iv = Buffer.from(dataString.iv, 'hex');
    let encryptedText = Buffer.from(dataString.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    answer = decrypted.toString();
    callback(null, answer);
}


module.exports = {
    decryptData
}