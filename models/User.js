var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    s1: [Number],
    s2: [Number],
    s3: [Number]
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;