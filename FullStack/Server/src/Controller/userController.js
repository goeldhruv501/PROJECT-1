const errorHandling = require('../ErrorHandling/errorHandling')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIKey,
    api_secret: process.env.APISecret
});

exports.createUser = async (req, res) => {
    try {

        const data = req.body;

        if (!data.password) {
            return res.status(400).send({ status: false, message: "Password is required" });
        }

        const ImageData = req.file;

        const bcryptPassword = await bcrypt.hash(data.password, 10);

        if (!ImageData) {
            data.password = bcryptPassword;

            const createData = await userModel.create(data); 

            return res.status(201).send({
                status: true,
                message: "User data created successfully!",
                data: createData
            });
        }

        const result = await cloudinary.uploader.upload(ImageData.path);
        data.profileImg = result.secure_url; 
        data.password = bcryptPassword; 

        const createData = await userModel.create(data);

        return res.status(201).send({
            status: true,
            message: "User data created successfully!",
            data: createData
        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

exports.LoginApi = async (req, res) => {
    try {
      

        const data = req.body;

        const checkMailId = await userModel.findOne({ email: data.email });

        if (!checkMailId) {
            return res.status(404).send({ status: false, msg: "User not present" });
        }

        const checkPass = await bcrypt.compare(data.password.trim(), checkMailId.password);
        if (!checkPass) {
            return res.status(401).send({ status: false, msg: "Wrong password" });
        }

        const token = jwt.sign(
            {
                UserId: checkMailId._id, 
                AuthorName: 'Dhruv' 
            },
            process.env.JWTAcessToken, 
            { expiresIn: '12h' } 
        );

        return res.send({ status: true, token, id: checkMailId._id });

    } catch (err) {
        return res.status(500).send({ status: false, msg: "Internal Server Error: " + err.message });
    }
}


exports.updateApi = async (req, res) => {
    try {

        


        let id = req.params.UserId;


        let data = req.body;

        const updateData = await userModel.findOneAndUpdate(
            { _id: id },  
            { $set: { name: data.name } },  
            { new: true } 
        );

        if (!updateData) {
            return res.status(404).send({ status: false, message: 'User not found' });
        }

        return res.send({ status: true, data: updateData });
    } catch (err) {
        { return res.status(400).send({ status: false, msg: err.message }) }
    }
}
