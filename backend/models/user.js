const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false }, // Optional address field
    // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);
