const mongoose = require("mongoose")
const { Schema } = mongoose;
//One question data
const questionsData = new Schema({
    questionId: {
        type: Number,
        required: true
    },
    questionText: {
        type: String, 
        required: true,
        unique: false,
    },
    options: {
        type: Array,
        require: true,
    },
    marks: {
        type: Number,
        required: true
    },
    correctOptions: {
        type: Array,
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})

const Quiz = mongoose.model('questions', questionsData);
module.exports = Quiz