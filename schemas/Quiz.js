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
        unique: true
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
//Set of Questions(Quiz)
const quizSchema = new Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    questions: [
        questionsData,
    ],
    quizTime: {
        type: Number,
        default: 30,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    questionCount: {
        type: Number,
        required: true
    }
});

const Quiz = mongoose.model('quiz_questions', quizSchema);
module.exports = Quiz