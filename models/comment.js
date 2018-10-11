// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('comment', {
    playerId: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    battletag: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
