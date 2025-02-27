const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        default: null, // Optional field
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null, // Optional field
    },
    salary: {
        type: Number,
        default: null, // Optional field
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    collection: 'employees', // MongoDB collection name
    timestamps: false,       // Disable auto timestamps (createdAt, updatedAt)
});

module.exports = mongoose.model('Employee', employeeSchema);
