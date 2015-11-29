var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    s1: [Number],
    s2: [Number],
    s3: [Number]
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;