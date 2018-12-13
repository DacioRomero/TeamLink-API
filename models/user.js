// models/user.js
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
  }],
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

UserSchema.pre('save', function hashPassword(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) return next(saltErr);

    return bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function compare(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
