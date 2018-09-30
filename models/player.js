// models/player.js
const mongoose = require('mongoose');

module.exports = mongoose.model('Player', {
    battletag: {
        type: String,
        required: true
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
    iconURL: String
});
