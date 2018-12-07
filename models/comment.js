// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
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

module.exports = mongoose.model('comment', CommentSchema);
