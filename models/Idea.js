const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const IdeaSchema = new Schema({

    title:{
        type: String,
        reuqired: true
    },
    details:{
        type: String,
        reuqired: true
    },
    user:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('ideas', IdeaSchema);