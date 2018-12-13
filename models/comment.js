// models/comment.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  parent: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'parentModel',
  },
  parentModel: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('comment', CommentSchema);
