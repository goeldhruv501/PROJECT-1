const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Router = require('./Routes/routes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000 || process.env.PORT;


mongoose.connect(process.env.DB)
    .then(() => {
        console.log("BACKEND IS WORKING");
    })
    .catch((err) => {
        console.log(err);
    });


app.use('/', Router);

app.listen(port, () => {
    console.log(`SERVER IS CONNECTED ${port}`);
});
