const UserModel = require("../models/UserModel");
const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

const SECRETS = require("./Secrets");

const passportJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: SECRETS.JWT_SECRET
};

passport.use(
  "jwt",
  new JwtStrategy(passportJwtOptions, async function(jwt_payload, done) {
    console.log(jwt_payload);
    const user = await UserModel.findOne({
      _id: jwt_payload.id
    }).exec();

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
