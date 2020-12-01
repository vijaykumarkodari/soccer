const mongoose = require('mongoose')
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const userSchema = new schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true, required: true },
    password: String,
    userRole: {
        type: String,
        default: "player",
    },
    ranking: {
        type: Number,
        default: 0,
    },
    matches: {
        type: Number,
        default: 0,
    },
    goals: {
        type: Number,
        default: 0,
    },
    passes: {
        type: Number,
        default: 0,
    },
    goalAttempts: {
        type: Number,
        default: 0,
    },
    saves: {
        type: Number,
        default: 0,
    },
    goalMisses: {
        type: Number,
        default: 0,
    },
    teamName: {
        type: String,
        default: null,
    },
    email: String,
    phone: String,
    city: {
        type: String,
        default: null,
    },
    zip: {
        type: String,
        default: null,
    },

    googleId: {
        type: String,
        default: uuidv4()
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    quizScore: {
        Number,
        default: 0

    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;