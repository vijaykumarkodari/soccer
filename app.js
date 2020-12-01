// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const tournamentRoutes = require('./routes/tournamentRoutes');
const userRoutes = require('./routes/user-routes');
const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const matchRoutes = require('./routes/match-routes');
const quizRoutes = require('./routes/quiz-routes');
const match = require('./models/match-model')
    //connecting to DB
mongoose.connect(keys.mongodb.dbUri, () => {
    console.log("connected to mongoDB");
})


const app = express()
const port = 3000

// setting up session cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initializing passport
app.use(passport.initialize());
//initializing session
app.use(passport.session());

// Body parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
    //set routes
app.use('/auth', authRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/user', userRoutes);
app.use('/match', matchRoutes);
app.use('/quiz', quizRoutes);
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

// Routes
app.get('/login', (req, res) => {
    res.render('login', { title: 'Home Page', layout: './layouts/loginLayout' })
})

app.get('/home', (req, res) => {
    res.render('index', { title: 'Home Page' })
})
app.get('', (req, res) => {
    res.render('index', { title: 'Home Page' })
})

app.get('/allTournaments', (req, resp) => {

    resp.render('all-tournaments', { title: 'Tournaments', layout: './layouts/tournamentsLayout' });
});

app.get('/addTeam', (req, resp) => {

    resp.render('add-team', { title: 'Tournaments', layout: './layouts/tournamentsLayout' });
});
app.get('/add-local-team', (req, resp) => {

    resp.render('add-team', { title: 'Friendly match', layout: './layouts/friendlyMatchesLayout' });
});

app.get('/createTournament', (req, resp) => {

    resp.render('create-tournament', { title: 'Tournaments', layout: './layouts/tournamentsLayout' });
});

app.get('/create-friendly-tournament', (req, resp) => {

    resp.render('create-tournament', { title: 'Tournaments', layout: './layouts/friendlyMatchesLayout' });
});

app.get('/allTeams', (req, resp) => {

    resp.render('all-teams', { title: 'Tournaments', layout: './layouts/tournamentsLayout' });
});
app.get('/quiz', (req, resp) => {

    resp.render('quiz', { title: 'Weekly Quiz' });
});

app.get('/user-statistics', (req, resp) => {

    resp.render('user-statistics', { title: 'User-Statistics' });
});

app.get('/all-nearby-matches', (req, resp) => {
    let data;
    match.find().then((result) => {
        console.log("data fetched");
        resp.render('nearbymatches', { title: 'Tournaments', data: result, layout: './layouts/friendlyMatchesLayout' });
    });



});
// Listen on Port 3000
app.listen(port, () => console.info(`App listening on port ${port}`))