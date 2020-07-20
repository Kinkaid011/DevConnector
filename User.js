const mongoose = require('mongoose');

//remember that models should be done with uppercase letter in beginning
//models interact with the 'database'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email:  {
        type: String,
        required: true,
        unique: true
        //unique because you don't want to people with the same email to be users
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);
// This simply exports the model
// The params are 'user' the name and  User the schema