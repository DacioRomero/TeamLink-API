// models/user.js
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
