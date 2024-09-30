const errorHandling = require('../ErrorHandling/errorHandling')
const adminModel = require('../models/adminModel')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.createAdmin = async (req, res) => {
    try {
        
        const data = req.body;

        if (!data.password) {
            return res.status(400).send({ status: false, msg: "Password is required" });
        }

        const bcryptPassword = await bcrypt.hash(data.password, 10);
        data.password = bcryptPassword; 

        const createData = await adminModel.create(data);

        return res.status(201).send({
            status: true,
            message: "Admin created successfully!",
            data: createData
        });

    } catch (err) {
        return res.status(500).send({ status: false, message: "Internal Server Error: " + err.message });
    }
}

exports.getAllData = async (req, res) => {
    try {
      
        
        const data = await userModel.find({ isdeleted: false });
        
        
        return res.send({
            status: true,
            msg: "Retrieved all user data successfully",
            data: data
        });

    } catch (err) {
        return res.status(500).send({ status: false, message: "Internal Server Error: " + err.message });
    }
}

exports.loginAdmin = async (req, res) => {
    try {
   

        const data = req.body;

        const checkMailId = await adminModel.findOne({ email: data.email });
        if (!checkMailId) {
            return res.status(404).send({ status: false, msg: "Admin not found" });
        }

        const checkPass = await bcrypt.compare(data.password.trim(), checkMailId.password);
        if (!checkPass) {
            return res.status(401).send({ status: false, msg: "Wrong password" });
        }

        const token = jwt.sign(
            {
                adminId: checkMailId._id, 
                AuthorName: 'Dhruv' 
            },
            process.env.AdminAcessSecretKey, 
            { expiresIn: '12h' } 
        );

        return res.send({ status: true, token, id: checkMailId._id });

    } catch (err) {
        return res.status(500).send({ status: false, msg: "Internal Server Error: " + err.message });
    }
}



// exports.deleteUserApi = async (req, res) => {
    
//     try {
//         let id = req.params.UserId;

//         const deleteduser = await userModel.findOneAndUpdate(
//             { _id: id },
//             { $set: { isdeleted: true } },
//             { new: true }
//         );

//         if (!deleteduser) {
//             return res.status(404).send({ Status: false, Message: 'User not found' });
//         }

//         return res.status(200).send({ Status: true, data: deleteduser });
//     } 
//     catch (err) {
//         return res.status(500).send({ Status: false, Message: err.message });
//     }
// };