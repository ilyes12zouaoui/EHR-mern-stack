const express = require("express");
const app = express();

const allRoutes = require("./routes/Routes");

//configurating passport

require("./configurations/PassportConfiguration");

//connectiong to mongodb
require("./configurations/ConnectionToMongoDB");

//adding middlewares
app.use(express.json());

//allowing cros origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept, JWT"
  );
  next();
});

//adding routes
app.use("/api", allRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on" + port);
});
