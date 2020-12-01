const match = require('../models/match-model');
const user = require('../models/user-model');
const router = require('express').Router();
router.put('/updateMatch/:id', async(req, res) => {
    var i;

    var data = req.body;
    var current;
    // check user already exists
    match.findOne({ 'matchId': req.params.id }).then((currentMatch) => {
        current = currentMatch;

        if (!currentMatch) {

            message = [{ "msg": "User doesn't exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            console.log("vijay-------------" + data["team1score"]);
            current.teamOne.teamScore = data["team1score"];
            current.teamTwo.teamScore = data["team2score"];

            for (i = 0; i < current.teamOne.players.length; i++) {
                console.log(i + "prior");
                getData2(current.teamOne.players[i], data, "teamOne" + i);

                current.teamOne.players[i].goals = data["teamOne" + i + "Goals"];
                current.teamOne.players[i].passes = data["teamOne" + i + "Passes"];
                current.teamOne.players[i].goalAttempts = data["teamOne" + i + "GoalAttempts"];
                current.teamOne.players[i].saves = data["teamOne" + i + "Saves"];
                current.teamOne.players[i].goalMisses = data["teamOne" + i + "GoalMisses"];
            }

            for (i = 0; i < current.teamTwo.players.length; i++) {
                getData(current.teamTwo.players[i], data, "teamTwo" + i);
                current.teamTwo.players[i].goals = data["teamTwo" + i + "Goals"];
                current.teamTwo.players[i].passes = data["teamTwo" + i + "Passes"];
                current.teamTwo.players[i].goalAttempts = data["teamTwo" + i + "GoalAttempts"];
                current.teamTwo.players[i].saves = data["teamTwo" + i + "Saves"];
                current.teamTwo.players[i].goalMisses = data["teamTwo" + i + "GoalMisses"];





            }


            match.updateOne({ 'matchId': req.params.id }, {

                teamOne: current.teamOne,
                teamTwo: current.teamTwo,
                city: data.city,
                matchStatus: data.matchStatus


            }, {}).then((newUser) => {
                match.findOne({ 'matchId': req.params.id }, function(err, result) {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });

            });



        }
    })

});

async function getData(current, data, i) {
    console.log("i value " + i);
    // check user already exists
    try {
        user.findOne({ 'userName': current.userName }).then((currentUser) => {
            if (!currentUser) {

                message = [{ "msg": "User doesn't exist" }];
                console.log(message);
                //res.send(JSON.stringify({ message: message }));
            } else {

                user.updateOne({ 'userName': currentUser.userName }, {

                    goals: currentUser.goals + data[i + "Goals"],
                    passes: currentUser.passes + data[i + "Passes"],
                    goalAttempts: currentUser.goalAttempts + data[i + "GoalAttempts"],
                    saves: currentUser.saves + data[i + "Saves"],
                    goalMisses: currentUser.goalMisses + data[i + "GoalMisses"]
                }, {}).then((newUser) => {
                    user.findOne({ 'userName': newUser.userName }, function(err, result) {
                        if (err) throw err;
                        console.log("updated user");
                        // res.send(JSON.stringify(result));
                        return "data";
                    });

                });

                setTimeout(() => {

                }, 2000);

            }
        })
    } catch (err) {
        console.error(err);
    }

}

const getData2 = async(current, data, i) => {
        // check user already exists
        console.log("i value " + i);


        try {
            user.findOne({ 'userName': current.userName }).then((currentUser) => {
                console.log(i + "prior3");
                if (!currentUser) {

                    message = [{ "msg": "User doesn't exist" }];
                    console.log(message);
                    //res.send(JSON.stringify({ message: message }));
                } else {
                    console.log(data);
                    console.log(i + "vijay" + data[i + "Goals"]);
                    console.log(i + "prior4");
                    user.updateOne({ 'userName': currentUser.userName }, {
                        goals: currentUser.goals + data[i + "Goals"],
                        passes: currentUser.passes + data[i + "Passes"],
                        goalAttempts: currentUser.goalAttempts + data[i + "GoalAttempts"],
                        saves: currentUser.saves + data[i + "Saves"],
                        goalMisses: currentUser.goalMisses + data[i + "GoalMisses"]

                    }, {}).then((newUser) => {
                        user.findOne({ 'userName': newUser.userName }, function(err, result) {
                            if (err) throw err;
                            console.log("updated user");
                            // res.send(JSON.stringify(result));
                            return "data";
                        });

                    });

                    setTimeout(() => {

                    }, 2000);

                }
            })
        } catch (err) {
            console.error(err);
        }
    }
    // get all
router.get('/getAllMatches', (req, res) => {
    match.find().then((result) => {
        res.send(JSON.stringify(result));
    });
});
module.exports = router;