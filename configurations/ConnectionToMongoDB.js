const mongoose = require("mongoose");
const SECRETS = require("./Secrets");

const options = {keepAlive: 300000, connectTimeoutMS: 30000, useNewUrlParser: true};
mongoose
    .connect(SECRETS.CONNEXTION_STRING, options)
    .then(() => {
        console.log("connected mongodb ...");
    })
    .catch(err => {
        console.log("not connected on mongodb");
    });
