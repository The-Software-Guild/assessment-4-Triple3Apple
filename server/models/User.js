const mongoose = require('mongoose');
// const { Schema } = mongoose;

// Create schema
let userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3
        },
        password: {
            type: String,
            required: true,
            // password is not returned for security reasons
            // to get password use: .select('+password') in a mongoose db call
            select: false,
            minlength: 5
        },
        email: {
            type: String,
            required: true,
            minlength: 7
        }
    },
    { timestamps: true }     // schema option which creates timestamps
);

// const User = mongoose.model('User', userSchema, 'users');

// module.exports = User;

module.exports = mongoose.model("user", userSchema, "users");

