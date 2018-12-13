// models/player.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = Schema({
  poster: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
  }],
  iconUrl: String,
});

module.exports = mongoose.model('Team', TeamSchema);
