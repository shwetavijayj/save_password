const express = require('express');
const router = express.Router();
let login = require('../controller/encrypt');
let uniqid = require('uniqid');
/* GET home page. */
router.post('/', function (req, res, next) {
    userData = {
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password
    }
    login.login(userData, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send({ msg: result });
        }
    })

});

router.post('/signup', function (req, res) {
    userData = {
        userid: uniqid.process(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }
    login.signup(userData, (error, result) => {
        if (error) {
            console.log("Error is", error);
        }
        else {
            console.log("result is", result)
            res.send({ msg: 'User created successfully' });
        }
    })
})

module.exports = router;
