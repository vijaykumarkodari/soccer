const { json } = require('express');
const quiz = require('../models/quiz-model');
const user = require('../models/user-model');
const router = require('express').Router();

router.get('/getLeaderBoard', (req, res) => {

    user.find().then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            //   console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            //res.send(JSON.stringify(result));
            result.sort((a, b) => (a.quizScore > b.quizScore) ? 1 : -1);
            res.send(JSON.stringify(result.slice(0, 10)));
        }
    });
});

//auth login 
router.post('/addQuizQuestions', (req, res) => {
    console.log("got" + req.body.question + quiz);
    new quiz({
        question: req.body.question,
        answer: req.body.answer,
        points: req.body.points,
        options: req.body.options,

    }).save().then((newUser) => {
        console.log("new user created :" + newUser);
        res.send(JSON.stringify(newUser));

    });

});

router.get('/getQuizQuestions', (req, res) => {

    quiz.find().then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            //   console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            //res.send(JSON.stringify(result));
            const shuffled = result.sort(() => 0.5 - Math.random());
            res.send(JSON.stringify(shuffled.slice(0, 10)));
        }
    });
});

router.put('/update/:id', (req, res) => {
    //var data = JSON.parse(req.body);
    console.log(req.body.quizScore);
    // check user already exists
    user.findOne({ 'userName': req.params.id }).then((currentUser) => {
        if (!currentUser) {

            message = [{ "msg": "User doesn't exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {

            user.updateOne({ 'userName': req.params.id }, {
                quizScore: req.body.quizScore

            }, {}).then((newUser) => {
                user.findOne({ 'userName': req.params.id }, function(err, result) {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });

            });



        }
    })

});
module.exports = router;