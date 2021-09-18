const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create schema
let userSchema = new Schema({
    userName: String,
    password: String,
    email: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

