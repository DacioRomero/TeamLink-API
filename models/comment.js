// models/comment.js
const mongoose = require('mongoose');
const Populate = require('mongoose-populate');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    content: {
        type: String,
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    on: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Player']
    }
});

CommentSchema
    .pre('find', Populate('poster'))
    .pre('findOne', Populate('poster'));

module.exports = mongoose.model('comment', CommentSchema);
