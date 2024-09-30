const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for token verification
require('dotenv').config(); // Load environment variables from a .env file

exports.authenticate = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "token must be present" });
        }

        let decodetoken = jwt.verify(token, process.env.JWTAcessToken);
        if (!decodetoken) {
            return res.status(400).send({ status: false, msg: "invalid token" });
        }

        req.UserId = decodetoken.UserId;
        next();

    } catch (err) {
        return res.status(404).send({ status: false, msg: err.message });
    }
}

exports.Authorisation = async (req, res, next) => {
    try {
        let id = req.params.UserId;
        if (id == req.UserId) {
            req.userId = id;
            next();
        } else {
            return res.status(403).send({ status: false, msg: "Unauthorized access" });
        }
    } catch (err) {
        return res.status(404).send({ status: false, msg: err.message });
    }
}
