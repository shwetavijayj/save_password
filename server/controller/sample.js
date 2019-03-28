var crypto = require("crypto");
function encrypt(text, password) {

    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    var data = new Buffer(text, 'utf8').toString('binary');

    var cipher = crypto.createCipher('aes-256-cbc', key, iv.slice(0, 16));

    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    var crypted = new Buffer(encrypted, 'binary').toString('base64');
    return crypted;
}

function decrypt(text, password) {
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');
    // Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');
    var input = text.replace(/\-/g, '+').replace(/_/g, '/');
    var edata = new Buffer(input, 'base64').toString('binary');

    var decipher = crypto.createDecipher('aes-256-cbc', key, iv.slice(0, 16));

    var decrypted = decipher.update(edata, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    var dec = new Buffer(decrypted, 'binary').toString('utf8');
    return dec;
}

var pass = 'test';
var hw = encrypt("hello world the is one of the best one eight 333 43345 45654654", pass);
console.log(hw);
var dd = decrypt(hw, pass);
console.log(dd);