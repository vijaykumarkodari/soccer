const router = require('express').Router();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const querystring = require('querystring');

//auth login 
router.get('/login', (req, resp) => {

    resp.redirect('/'); //change later  --vijay
});


//auth logout 
router.get('/logout', (req, resp) => {
    //handle with passport
    req.logout();
    resp.redirect('/');

});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'],

}));
//handling call back uri
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //handle with passport
    //console.log("emo" + req.user);
    const query = JSON.stringify(req.user);
    //console.log("emo" + query);
    var responceDate = { 'id': req.user.googleId }
        //req.session.valid = true;
    res.redirect('http://soccer-spike.herokuapp.com/home?name=' + req.user.googleId);
    //res.redirect('http://localhost:4200/auth/login?' + req.user);
    //res.redirect('http://localhost:4200/dashboard');
    // res.send(req.user);

});

router.post('/local', passport.authenticate('local'));

router.post('/local', passport.authenticate('local'), function(req, res) {
    console.log("passport user", req.user);
    res.send(JSON.stringify(req.user));
});

module.exports = router;