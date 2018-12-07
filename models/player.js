// models/player.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = Schema({
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    battletag: {
        type: String,
        required: true,
        index: { unique: true }
    },
    description: String,
    rank: {
        type: Number,
        min: 1,
        max: 5000,
        required: true
    },
    role: {
        type: String,
        enum: ['DPS', 'Support', 'Tank', 'Flex'],
        required: true
    },
    iconUrl: String
});

module.exports = mongoose.model('Player', PlayerSchema);
