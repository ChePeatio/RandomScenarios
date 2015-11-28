var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    s1: [Number],
    s2: [Number],
    s3: [Number]
});

module.exports = mongoose.model('User', UserSchema);