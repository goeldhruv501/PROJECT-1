const {errorHandling} = require('../ErrorHandling/errorHandling')
const shopKepperModel = require('../models/shopKeppermodel')
// const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.createShopKepper = async (req, res) => {
    try {
        
        const data = req.body;

        if (!data.password) {
            return res.status(400).send({ status: false, msg: "Password is required" });
        }

        const bcryptPassword = await bcrypt.hash(data.password, 10);
        data.password = bcryptPassword; 

        const createData = await shopKepperModel.create(data);

        return res.status(201).send({
            status: true,
            message: "Admin created successfully!",
            data: createData
        });

    } catch (e) {
        return errorHandling(e,res)
   }
}

exports.loginShopKepper = async (req, res) => {
    try {
   

        const data = req.body;

        const checkMailId = await shopKepperModel.findOne({ email: data.email });
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
            process.env.ShopKepperAcessSecretKey, 
            { expiresIn: '12h' } 
        );

        return res.send({ status: true, token, id: checkMailId._id });

    } catch (e) {
        return errorHandling(e,res)
   }
}



exports.deleteUserApi = async (req, res) => {
    
    try {
        let id = req.params.UserId;

        const deleteduser = await userModel.findOneAndUpdate(
            { _id: id },
            { $set: { isdeleted: true } },
            { new: true }
        );

        if (!deleteduser) {
            return res.status(404).send({ Status: false, Message: 'User not found' });
        }

        return res.status(200).send({ Status: true, data: deleteduser });
    } 
    catch (err) {
        return res.status(500).send({ Status: false, Message: err.message });
    }
};