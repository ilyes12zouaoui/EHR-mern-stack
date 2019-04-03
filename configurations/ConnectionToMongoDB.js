const mongoose = require("mongoose");
const SECRETS = require("./Secrets");

mongoose
  .connect(SECRETS.CONNEXTION_STRING)
  .then(() => {
    console.log("connected mongodb ...");
  })
  .catch(err => {
    console.log("not connected on mongodb");
  });
