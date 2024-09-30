const mongoose = require('mongoose'); 
const { ValidName, ValidPassword, Validemail } = require('../Validation/allValidation'); 

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        trim: true  
    },
    name: {
        type: String,
        required: [true, "Please provide the Name"], 
        validate: [ValidName, "Please provide a valid name"], 
        trim: true 
    },
    email: {
        type: String,
        required: [true, "Please provide the email"], 
        validate: [Validemail, "Please provide a valid email"],
        unique: true, 
        trim: true 
    },
    password: {
        type: String,
        required: [true, "Please provide the Password"], 
        validate: [ValidPassword, "Please provide a valid password"],
        trim: true 
    },
}, { timestamps: true }); 

module.exports = mongoose.model('admin', adminSchema);
