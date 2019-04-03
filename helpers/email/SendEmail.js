const nodemailer = require("nodemailer");
const inscriptionConfirmationTemplate = require("./templetes/inscriptionConfirmationTemplate");
const {
  GMAIL_CONFIGURATIONS,
  EMAIL_TEMPLETES
} = require("../../configurations/Secrets");

const produceEmailData = (user, token, TEMPLETE) => {
  let emailData = {
    from: "Gladiators " + GMAIL_CONFIGURATIONS.EMAIL_ADRESSE,
    to: user.email
  };
  if (TEMPLETE == EMAIL_TEMPLETES.INSCRIPTION_VERIFICATION) {
    emailData["subject"] = "Inscription Confirmation GLADIATORS";
    emailData["html"] = inscriptionConfirmationTemplate(user.firstName, token);
  } else if (TEMPLETE == EMAIL_TEMPLETES.RESET_PASSWORD) {
    emailData["subject"] = "Inscription Confirmation GLADIATORS";
    emailData["html"] = inscriptionConfirmationTemplate(user.firstName, token);
  }
  return emailData;
};

function sendEmail(user, token, TEMPLETE) {
  let transporter = nodemailer.createTransport({
    service: GMAIL_CONFIGURATIONS.EMAIL_SERVICE,
    auth: {
      user: GMAIL_CONFIGURATIONS.EMAIL_ADRESSE,
      pass: GMAIL_CONFIGURATIONS.EMAIL_PASSWORD
    }
  });

  const emailData = produceEmailData(user, token, TEMPLETE);

  transporter.sendMail(emailData, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = sendEmail;
