// models/player.js
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Team', {
    name: {
        type: String,
        required: true
    },
    description: String,
    players: [{
        type: ObjectId,
        ref: 'Player'
    }],
    iconURL: String
});
