const mongoose = require('mongoose')
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const tournamentSchema = new schema({
    tournamentId: {
        type: String,
        default: uuidv4()
    },
    tournamentName: String,
    teams: [{
        teamId: {
            type: String,
            default: uuidv4()
        },

        teamName: {
            type: String,
            default: null
        },
        teamRanking: {
            type: String,
            default: null,
        },
        players: [{
            firstName: String,
            lastName: String,
            userName: String,
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

            },

        }],



        createdOn: {
            type: Date,
            default: Date.now()
        },
        updatedOn: {
            type: Date,
            default: Date.now()
        }
    }],
    city: String,
    zip: String,

    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
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

const Tournament = mongoose.model('tournament', tournamentSchema);
module.exports = Tournament;