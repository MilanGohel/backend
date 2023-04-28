const mongoose = require("mongoose")
const { Schema } = mongoose;

const studentSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
});
const Admin = mongoose.model('student', studentSchema);
module.exports = Admin