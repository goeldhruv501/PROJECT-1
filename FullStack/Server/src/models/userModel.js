const mongoose = require('mongoose'); // Import mongoose for MongoDB object modeling
const { ValidName, ValidPassword, Validemail } = require('../Validation/allValidation'); // Import validation functions


const userSchema = new mongoose.Schema({
    profileImg: {
        type: String, 
        trim: true 
    },

    name: {
        type: String, 
        required: [true, "Please provide the Name"], 
        validate: [ValidName, "Please provide a valid User Name"], 
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
        validate: [ValidPassword, "Please provide a valid Password"], 
        trim: true 
    },

    isdeleted: {
        type: Boolean, 
        default: false, 
        trim: true 
    },

}, { timestamps: true }); 

module.exports = mongoose.model('User',userSchema)