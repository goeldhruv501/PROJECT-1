const { ValidName, ValidPassword, ValidUserName } = require('../validation/allvalidation')



exports.userValidation = async (req, res, next) => {
    try {

        const data = req.body;
        const { name, email, password } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "body Empty" })

        if (!name) return res.status(400).send({ status: false, msg: "pls Provoided Name" })
        if (!ValidName(name)) return res.status(400).send({ status: false, msg: "Invalid Name" })

        if (!email) return res.status(400).send({ status: false, msg: "pls Provoided Email" })
        if (!ValidUserName(email)) return res.status(400).send({ status: false, msg: "Invalid Email" })

        if (!password) return res.status(400).send({ status: false, msg: "pls Provoided Password" })
        if (!ValidPassword(password)) return res.status(400).send({ status: false, msg: "Invalid Password" })

            next()


    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}