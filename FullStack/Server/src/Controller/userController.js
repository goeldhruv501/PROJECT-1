const { errorhandling } = require('../ErrorHandling/errorHandling')
const userModel = require('../models/userModel')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {otpsend} = require('../NodeMailer/SendOtpVerify')
const {createImgURL} = require('../Cloudinary/ImageUrl')
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIKey,
    api_secret: process.env.APISecret
});

// exports.createUser = async (req, res) => {
//     try {
//         const data = req.body;

//         if (!data.password) {
//             return res.status(400).send({ status: false, message: "Password is required" });
//         }

//         const ImageData = req.file;

//         const bcryptPassword = await bcrypt.hash(data.password, 10);

//         if (!ImageData) {
//             data.password = bcryptPassword;

//             const createData = await userModel.create(data); 

//             return res.status(201).send({
//                 status: true,
//                 message: "User data created successfully!",
//                 data: createData
//             });
//         }

//         const result = await cloudinary.uploader.upload(ImageData.path);
//         data.profileImg = result.secure_url; 
//         data.password = bcryptPassword; 

//         const createData = await userModel.create(data);

//         return res.status(201).send({
//             status: true,
//             message: "User data created successfully!",
//             data: createData
//         });

//     } catch (e) {
//          return errorHandling(e,res)
//     }
// };

exports.createUser = async (req, res) => {
    try {

        const ImageData = req.file;
        const data = req.body;
        const { name, email, password } = data
        
        const randomOtp = Math.floor(1000 + Math.random() * 9000);
        
        const checkUserId = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { OtpVerification: randomOtp } }
        )
        console.log(ImageData)

        if (checkUserId) {
            otpsend(name, email, randomOtp)
            return res.status(201).send({ status: true, msg: "Successfully Send OTP", id: checkUserId._id })
        }


        if (ImageData) {
            const img = ImageData.path
            const result = await createImgURL(img)
            data.profileImg = result.secure_url;
        }


        const bcryptPassword = await bcrypt.hash(password, 10);
        data.password = bcryptPassword;
        data.OtpVerification = randomOtp;
        const createData = await userModel.create(data);

        otpsend(name, email, randomOtp)
        return res.status(201).send({ status: true, message: "User Data Created successfully!", data: createData })
    }
    catch (err) { return errorhandling(err, res) }
}

exports.verifyOTP = async (req, res) => {
    try {

        const userId = req.params.userId
        const OTP = req.body.OTP
        console.log(typeof OTP)
        const checkOTP = await userModel.findOneAndUpdate(
            { _id: userId, OtpVerification: OTP },
            { $set: { isOTPVerified: true, OtpVerification: 0 } }
        )
        console.log(OTP, userId, checkOTP)
        if (!checkOTP) return res.status(400).send({ status: false, msg: "Wrong OTP" })

        return res.status(200).send({ Status: true, msg: "verifyed" })
    }
    catch (e) {
        return res.status(500).send({ status: true, msg: e.message })
    }
}




exports.LoginApi = async (req, res) => {
    try {


        const data = req.body;

        const checkMailId = await userModel.findOne({ email: data.email, isOTPVerified: true });

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

    } catch (e) {
        return errorhandling(e, res)
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
    } catch (e) {
        return errorhandling(e, res)
    }
}

