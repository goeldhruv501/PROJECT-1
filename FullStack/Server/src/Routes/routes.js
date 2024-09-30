const express = require('express');
const Router = express.Router();
const { createUser, LoginApi, updateApi } = require('../Controller/userController');
const { createAdmin, getAllData, deleteUserApi, loginAdmin } = require('../Controller/adminController');
const { authenticate, Authorisation } = require('../middleware/userAuthor');
const { adminAuthenticate, adminAuthorisation } = require('../middleware/adminAuthor');
const multer = require('multer');

const upload = multer({ storage: multer.diskStorage({}) });

// User API Routes
Router.post('/createUser', upload.single('profileImg'), createUser);
Router.post('/LoginApi', upload.single(), LoginApi);
Router.put('/updateApi/:UserId', authenticate, Authorisation, upload.single(), updateApi);

// Admin API Routes
Router.post('/createAdmin', upload.single(), createAdmin);
Router.post('/loginAdmin', upload.single(), loginAdmin);
Router.get('/getAllData', adminAuthenticate, getAllData);
// Router.delete('/deleteUserApi/:UserId', adminAuthenticate, adminAuthorisation, deleteUserApi);

// Invalid Route Handler
Router.all('/*', (req, res) => {
    return res.status(404).send({ status: false, msg: "Invalid URL" });
});

module.exports = Router;
