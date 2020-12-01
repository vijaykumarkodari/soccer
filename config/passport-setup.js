const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const user = require('../models/user-model');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    // console.log(user + "serializ user");
    done(null, user.id);
});

passport.deserializeUser((userid, done) => {
    // console.log(userid + "deserializ user");
    user.findOne({ _id: userid }).then((user) => {
        // console.log(user + "deserializ user");
        done(null, user);
    })

});


// Strategy config
passport.use(new GoogleStrategy({
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    },
    // passport callback function
    (accessToken, refreshToken, profile, done) => {
        //console.log(profile);

        // check user already exists
        user.findOne({ googleId: profile.id }).then((currentUser) => {

            //  console.log(profile);
            if (currentUser) {
                //  console.log("current user is :" + currentUser);
                done(null, currentUser);
            } else {

                // console.log("saving user is :" + currentUser);
                new user({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    googleId: profile.id,
                    userName: profile.name.familyName

                }).save().then((newUser) => {
                    console.log("new user created :" + newUser);
                    done(null, newUser);
                });
            }
        })


    }
));

passport.use(new LocalStrategy(function(username, password, done) {

    //  console.log("hi" + username + password);



    // check user already exists
    user.findOne({ 'userName': username }).then((currentUser) => {

        if (currentUser) {

            var pass_retrieved = currentUser.password;
            //  console.log("curpffj :" + currentUser.password + password);
            if (pass_retrieved === password) {

                // console.log("done");
                return done(null, currentUser);

            } else {
                // console.log("No");
                message = [{ "msg": "Incorrect Password!" }];
                return done(null, false, { message: message });
            }

        } else {
            message = [{ "msg": "Incorrect Password!" }];
            return done(null, false, { message: message });
        }
    })

}));