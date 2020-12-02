const mongoose = require('mongoose')
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const matchSchema = new schema({
    matchId: {
        type: String,
        default: null
    },
    tournamentId: {
        type: String,
        default: null
    },
    matchNumber: Number,
    matchDate: {
        type: Date,
        default: null
    },
    tournamentName: {
        type: String,
        default: null
    },
    matchStatus: {
        type: String,
        default: "NOT_COMPLETED"
    },

    teamOne: {
        teamName: {
            type: String,
            default: null
        },
        teamScore: {
            type: Number,
            default: 0
        },
        players: [{
            playerId: {
                type: String,
                default: null
            },
            firstName: String,
            lastName: String,
            userName: String,
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

        }]


    },
    teamTwo: {

        teamName: {
            type: String,
            default: null
        },
        teamScore: {
            type: Number,
            default: 0
        },
        players: [{
            playerId: {
                type: String,
                default: null
            },
            firstName: String,
            lastName: String,
            userName: String,
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

        }]


    },
    city: {
        type: String,
        default: null,
    },
    zip: {
        type: String,
        default: null,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    }
});

const Match = mongoose.model('match', matchSchema);
module.exports = Match;