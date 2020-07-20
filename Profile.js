const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },

    experience: [ {
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            required: false
        },
        description: {
            type: String
        }
    } ],

    education: [ {
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            required: false
        },
        description: {
            type: String
        }
    } ],

    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        llinkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//Storing the models in objects vs arrays is all for organizational purposes, when we go to store the educational model we'll need to store the whole list, as oppose to the social model which we can pull specific properties as needed


module.exports = mongoose.model('profile', ProfileSchema);