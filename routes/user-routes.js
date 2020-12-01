const router = require('express').Router();
const bcrypt = require('bcrypt');
const keys = require('./../config/keys');
const user = require('../models/user-model')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//auth logout 
router.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body);
    console.log(hash);
    // check user already exists
    user.findOne({ 'userName': req.body.userName }).then((currentUser) => {
        if (currentUser) {
            //console.log("current user is :" + currentUser);
            message = [{ "msg": currentUser.userName + "\t already exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {

            new user({

                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                userRole: req.body.userRole,
                phone: req.body.phoneNumber,
                city: req.body.city,
                zip: req.body.zipcode,
                teamName: req.body.team,
            }).save().then((newUser) => {
                console.log("new user created :" + newUser);
                res.send(JSON.stringify(newUser));

            });
        }
    })
});

router.put('/update', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body);
    console.log(hash);

    // check user already exists
    user.findOne({ 'googleId': req.body.googleId }).then((currentUser) => {
        if (!currentUser) {

            message = [{ "msg": "User doesn't exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {




            user.updateOne({ 'googleId': req.body.googleId }, {
                firstName: req.body.firstName,
                lastName: req.body.lastname,
                userName: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phoneNumber,
                city: req.body.city,
                zip: req.body.zipcode,

            }, {}).then((newUser) => {
                user.findOne({ 'googleId': req.body.googleId }, function(err, result) {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });

            });



        }
    })

});
// get user information
router.get('/getUserInfoById/:id', (req, res) => {
    const id = req.params;
    console.log(id);
    user.findOne({ 'googleId': id.id }).then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

// get all
router.get('/getPlayers', (req, res) => {
    user.find({ 'userRole': "player" }).then((result) => {
        res.send(JSON.stringify(result));
    });
});
module.exports = router;