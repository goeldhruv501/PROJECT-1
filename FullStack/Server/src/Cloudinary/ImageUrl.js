const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIKey,
    api_secret: process.env.APiSecretKey
});


exports.createImgURL = async (img) => {
    try {
        const result = await cloudinary.uploader.upload(img)
            .catch((error) => { console.log(error) });

        return result
    }
    catch (e) { console.log(e.message) }
}