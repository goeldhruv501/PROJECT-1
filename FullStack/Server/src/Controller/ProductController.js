const productModel = require('../models/productModel')
const { errorhandling } = require('../ErrorHandling/errorHandling')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { otpsend } = require('../NodeMailer/SendOtpVerify')
const { ProductImg } = require('../Cloudinary/ImageUrl')
require('dotenv').config()

exports.createProduct = async (req, res) => {
    try {
        const data = req.body
        const ImageData = req.file
        if (ImageData) {
            const img = ImageData.path
            const result = await ProductImg(img)
            data.ProductImg = result.secure_url;
        }

        const ProductDBData = await productModel.create(data)
        return res.status(201).send({ status: true, msg: "Product Created Successfully ", data: ProductDBData })

    }
    catch (e) {
        return errorhandling(e, res)
    }
}

exports.getAllProductdata = async (req, res) => {
    try {
        const category = req.params.getallData

        if (category === 'getallData') {
            const allDBData = await productModel.find()
            return res.status(200).send({ status: true, msg: "Successfully Get All Data", data: allDBData })

        }
        else {
            const categoryDBData = await productModel.find({ category: category })
            console.log(categoryDBData.length)
            if (categoryDBData.length == 0) {
                return res.status(404).send({ status: false, msg: "Inavlid category" })
            }
            return res.status(200).send({ status: true, msg: "Successfully Get All Data", data: categoryDBData })

        }
    }
    catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}