const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value), 
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
}, {
    collection: 'users', 
    timestamps: true,    
});

module.exports = mongoose.model('User', userSchema);
