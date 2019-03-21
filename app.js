const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const routers = require('./routes/api');
require("dotenv").config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

const url = "mongodb://localhost:27017/EHR";
mongoose
    .connect(
        url,
        {useNewUrlParser: true}
    )
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.use('/api', routers);
app.use("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use((err, req, res, next) => {
    console.log(err);
    next();
});


module.exports = app;
