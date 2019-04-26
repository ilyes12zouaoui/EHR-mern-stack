const passport = require("passport");
const ROLES = require("../configurations/Roles");

const authentication = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function(err, user, info) {
    if (!user)
      return res.status(401).send({ errors: { message: "unauthorized" } });

    req.user = user;
    return next();
  })(req, res);
};

const simpleUserAuthorisation = (req, res, next) => {
  if (req.user.role != ROLES.SIMPLE_USER)
    return res.status(403).send({ errors: { message: "forbidden" } });

  return next();
};

const adminAuthorisation = (req, res, next) => {
  if (req.user.role != ROLES.ADMIN)
    return res.status(403).send({ errors: { message: "forbidden" } });

  return next();
};

const blogerAuthorisation = (req, res, next) => {
  if (req.user.role != ROLES.BLOGER)
    return res.status(403).send({ errors: { message: "forbidden" } });

  return next();
};

module.exports = {
  authentication: authentication,
  simpleUserAuthorisation: simpleUserAuthorisation,
  adminAuthorisation: adminAuthorisation,
  blogerAuthorisation: blogerAuthorisation
};
