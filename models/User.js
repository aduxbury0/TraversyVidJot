const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const UserSchema = new Schema({

    name:{
        type: String,
        reuqired: true
    },
    email:{
        type: String,
        reuqired: true
    },
    password:{
        type: String,
        required: true

    },
    date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);