const team = require('../models/team-model');
const user = require('../models/user-model');
const tournament = require('../models/tournment-model');
const match = require('../models/match-model');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

//auth login 
router.post('/addTeam', (req, res) => {
    // console.log(req.body);
    // check user already exists
    team.findOne({ 'teamName': req.body.teamName }, { upsert: true }).then((currentUser) => {
        if (currentUser) {
            //console.log("current user is :" + currentUser);
            message = [{ "msg": currentUser.teamName + "\t already exist" }];
            //  console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            var users = [];
            // var i = 0;
            Object.keys(req.body).forEach(function(key) {
                // console.log(key, req.body[key]);
                if (key != "teamName") {
                    // console.log(key + "\t" + i);
                    user.findOne({ 'userName': req.body[key] }).then((currentUser) => {
                        //  console.log(currentUser + "vijay");
                        if (currentUser) {
                            users.push(currentUser);
                        }
                    });
                }
            });
            setTimeout(() => {
                new team({

                    teamName: req.body.teamName,
                    players: users

                }).save().then((newUser) => {
                    //  console.log("new user created :" + newUser);
                    res.send(JSON.stringify(newUser));

                });
            }, 2000);

        }
    })
});
// get all
router.get('/getTeams', (req, res) => {
    team.find().then((result) => {
        res.send(JSON.stringify(result));
    });
});

//auth login 
router.post('/createTournament', (req, res) => {
    // console.log(req.body);
    // check user already exists
    tournament.findOne({ 'tournamentName': req.body.tournamentName }).then((currentUser) => {
        if (currentUser) {
            //console.log("current user is :" + currentUser);
            message = [{ "msg": currentUser.teamName + "\t already exist" }];
            // console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            var users = [];
            // var i = 0;
            let k = false;
            Object.keys(req.body).forEach(function(key) {
                // console.log(key, req.body[key]);
                if (key.includes("team")) {
                    // console.log(key + "\t" + i);
                    team.findOne({ 'teamName': req.body[key] }).then((currentUser) => {
                        // console.log(currentUser + "vijay");
                        if (currentUser) {
                            users.push(currentUser);
                            // console.log(users + "vijay")
                        }
                    });
                }
            });
            setTimeout(() => {
                new tournament({

                    tournamentName: req.body.tournamentName,
                    teams: users,
                    city: req.body.city,
                    zip: req.body.zip,
                    tournamentId: uuidv4()

                }).save().then((newUser) => {
                    //   console.log("new user created :" + newUser);
                    res.send(JSON.stringify(newUser));

                });
            }, 2000);

        }
    })
});
// get all
router.get('/getAllTournaments', (req, res) => {
    tournament.find().then((result) => {
        res.send(JSON.stringify(result));
    });
});

// get user information
router.get('/getTournamentInfoById/:id', (req, res) => {
    const id = req.params;
    //  console.log(id);
    tournament.findOne({ 'tournamentName': id.id }).then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            //   console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            res.send(JSON.stringify(result));
        }
    });
});
router.post('/sheduleMatches', (req, res) => {
    var message = "";
    //console.log(req.body);

    req.body.forEach(match1 => {
        // console.log(flag);
        match.findOne({ 'tournamentId': match1.tournamentId, 'matchNumber': match1.matchNumber }).then((currentUser) => {
            if (currentUser) {
                //console.log("current user is :" + currentUser);
                message = "Already Sheduled";
                // res.send(JSON.stringify(message));
            } else {

                new match({
                    teamOne: match1.teamOne,
                    teamTwo: match1.teamTwo,
                    matchDate: match1.matchDate,
                    tournamentName: match1.tournamentName,
                    tournamentId: match1.tournamentId,
                    matchNumber: match1.matchNumber,
                    city: match1.city,
                    zip: match1.zip,
                    matchId: uuidv4()

                }).save().then((newUser) => {
                    console.log(":" + newUser);
                    message = "Successfuly Sheduled";
                    //  res.send(JSON.stringify(message));

                });
            }

            // res.send(JSON.stringify(message));
        })

        // resp.push(message);
    });
    // console.log(message);
    setTimeout(() => {
        res.send(JSON.stringify(message));
    }, 2000);

});

// get all matches by tournment id
router.get('/getMatchesByTournamentId/:id', (req, res) => {
    const id = req.params.id;
    //  console.log(id);
    match.find({ 'tournamentId': id }).then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            //   console.log(message);
            // res.send(JSON.stringify({ message: message }));
        } else {
            //res.send(JSON.stringify(result));
            result.sort((a, b) => (a.matchNumber > b.matchNumber) ? 1 : -1);
            console.log(result);
            console.log(id);
            res.render("all-matches", { title: 'Tournaments', data: result });
        }
    });
});

// get all match by match id
router.get('/getMatchById/:id', async(req, res) => {
    const id = req.params.id;
    console.log(id);
    match.find().then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            //   console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            result.forEach(x => {
                if (x.matchId.trim() === id.trim())
                    res.send(JSON.stringify(x));

            });

        }
    });

});
module.exports = router;