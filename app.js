//const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

//RoutersFile
const drugRouter = require('./routes/drug.router');
const prescriptionRouter = require('./routes/prescription.router');
const patientRouter = require('./routes/patient.router');
const doctorRouter = require('./routes/doctor.router');
const allergyRouter = require('./routes/allergy.router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

const options = {keepAlive: 300000, connectTimeoutMS: 30000, useNewUrlParser: true};
const mongodbUri = 'mongodb+srv://admin:admin@ehr-roxao.mongodb.net/ehr?retryWrites=true';
mongoose.connect(mongodbUri, options);
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {
    console.log('connected to database');
    // Wait for the database connection to establish, then start the app.
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//Routers
app.use('/api/drug', drugRouter);
app.use('/api/prescription', prescriptionRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter);
app.use('/api/allergy', allergyRouter);

app.use("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use((err, req, res, next) => {
    console.log(err);
    next();
});


module.exports = app;
