const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create schema
let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });   // schema option which creates timestamps

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

