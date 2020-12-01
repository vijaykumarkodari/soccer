const mongoose = require('mongoose')
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const quizSchema = new schema({
    questionId: {
        type: String,
        default: uuidv4()
    },
    question: String,
    answer: String,
    options: [String],
    points: Number
});

const quiz = mongoose.model('quiz', quizSchema);
module.exports = quiz;