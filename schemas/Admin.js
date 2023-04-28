const mongoose = require("mongoose")
const { Schema } = mongoose;
const Quiz = require("./Quiz")
const adminSchema = new Schema({
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
const Admin = mongoose.model('admin-data', adminSchema);
module.exports = Admin