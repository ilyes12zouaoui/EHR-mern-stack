const Joi = require("joi");
const { isEmpty, isToken, isObjectId } = require("../helpers/CustomValidators");
const joiErrorMessageChange = require("../helpers/JoiErrorMessageChange");

//
const signInValidator = (req, res, next) => {
  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required()
  };

  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};

//
const signUpValidator = (req, res, next) => {
  schema = {
    firstName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    lastName: Joi.string()
      .max(50)
      .min(3)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    sexe: Joi.boolean().required(),
    password: Joi.string()
      .max(50)
      .min(5)
      .required(),
    confirmationPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .options({
        language: {
          any: {
            allowOnly: "do not match"
          }
        }
      })
  };

  const result = Joi.validate(req.body, schema, { abortEarly: false });

  const errors = joiErrorMessageChange(result);

  if (errors) return res.status(400).send({ errors: errors });

  return next();
};

const accountActivationValidator = (req, res, next) => {
  if (!isToken(req.params.id))
    return res
      .status(400)
      .send({ errors: { global: "wrong activation token" } });

  next();
};

const sendAccountActivationEmailValidator = (req, res, next) => {
  if (!isObjectId(req.params.id))
    return res.status(400).send({
      errors: { global: "wrong credentials" }
    });

  next();
};

module.exports = {
  signInValidator: signInValidator,
  signUpValidator: signUpValidator,
  accountActivationValidator,
  sendAccountActivationEmailValidator
};
