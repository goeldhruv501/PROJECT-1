const { errorHandling } = require('../ErrorHandling/errorHandling')
const userModel = require('../models/userModel')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
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

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.UserNameNodeMailer,
                pass: process.env.Password
            }
        });
        let randomOtp = Math.floor(1000 + Math.random() * 9000);

        // const checkUserId = await usermodel.findOne({email:data.email});
        const checkUserId = await userModel.findOneAndUpdate(
            { email: data.email },
            { $set: { OtpVerification: randomOtp } }
        )

        if (checkUserId) {

            const info = await transporter.sendMail({
                from: '"Ravi Singh :ghost::blush::two_hearts::blush:" <your-email@gmail.com>',
                to: data.email,
                subject: "Your Email OTP to SignUp Verification",
                html: `
                <div style="background-color:#16253D;padding:20px;color:#fff;font-family:Arial, sans-serif;border-radius:10px;">
                    <h2 style="color:#FF4500;">MoviesAll</h2>
                    <p>Hi ${checkUserId.name},</p>
                    <p>Please find your One Time Password (OTP) for reset password below:</p>
                    <div style="background-color:#fff;color:#000;font-size:24px;font-weight:bold;text-align:center;padding:10px;margin:20px 0;border-radius:5px;">
                        ${randomOtp}
                    </div>
                    <p>The OTP is valid for 5 minutes.</p>
                    <p>For account safety, do not share your OTP with others.</p>
                    <br>
                    <p>Regards,</p>
                    <p>Team MoviesAll</p>
                </div>
                `,
            });


            return res.status(201).send({ status: true, msg: "Successfully Send OTP",id:checkUserId._id })


        }

        if (!data.password) {
            return res.status(400).send({ status: false, msg: "provide the password first" })
        }



        if (ImageData) {
            const result = await cloudinary.uploader.upload(ImageData.path)
            data.profileImg = result.secure_url;
        }

        // OTP send To mail


        const bcryptPassword = await bcrypt.hash(data.password, 10);
        data.password = bcryptPassword;
        data.OtpVerification = randomOtp;
        const createData = await userModel.create(data);



        const info = await transporter.sendMail({
            from: '"Ravi Singh :ghost::blush::two_hearts::blush:" <your-email@gmail.com>',
            to: createData.email,
            subject: "Your Email OTP to SignUp Verification",
            html: `
            <div style="background-color:#16253D;padding:20px;color:#fff;font-family:Arial, sans-serif;border-radius:10px;">
                <h2 style="color:#FF4500;">MoviesAll</h2>
                <p>Hi ${createData.name},</p>
                <p>Please find your One Time Password (OTP) for reset password below:</p>
                <div style="background-color:#fff;color:#000;font-size:24px;font-weight:bold;text-align:center;padding:10px;margin:20px 0;border-radius:5px;">
                    ${randomOtp}
                </div>
                <p>The OTP is valid for 5 minutes.</p>
                <p>For account safety, do not share your OTP with others.</p>
                <br>
                <p>Regards,</p>
                <p>Team MoviesAll</p>
            </div>
            `,
        });

        return res.status(201).send({ status: true, message: "User Data Created successfully!", data: createData })
    }
    catch (e) {
            return res.status(404).send({status:false,Msg:e.message})
    }
};


exports.verifyOTP = async (req, res) => {
    try {
        console.log(req.params.UserId,req.body)
        const userId = req.params.UserId
        const OTP = req.body.OtpVerification
        const checkOTP = await userModel.findOneAndUpdate(
            { _id: userId, OtpVerification: OTP },
            { $set: { isOTPVerified: true, OtpVerification: 0 } }
        )
     
        if (checkOTP === null) return res.status(400).send({ status: false, msg: "Wrong OTP" })
        return res.send({ Status: true, msg: checkOTP })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
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
        return errorHandling(e, res)
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
        return errorHandling(e, res)
    }
}

