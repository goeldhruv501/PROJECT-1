const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.ShopKepperAuthenticate = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];

        if (!token) {
            return res.status(400).send({ status: false, msg: "Token must be present" });
        }

        let decodedToken = jwt.verify(token, process.env.ShopKepperAcessSecretKey);

        if (!decodedToken) {
            return res.status(400).send({ status: false, msg: "Invalid token" });
        }

        req.adminId = decodedToken.adminId;
        next();
    } catch (err) {
        return res.status(500).send({ status: false, msg: "Internal Server Error: " + err.message });
    }
}

exports.ShopKepperAuthorisation = async (req, res, next) => {
    try {
        let id = req.body.adminId;
        if (id == req.adminId) {
            req.UserId = id;
            next();
        } else {
            return res.status(403).send({ status: false, msg: "Unauthorized" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: "Internal Server Error: " + err.message });
    }
}
