const inscriptionConfirmationTemplate = (userName, token) => {
  return `
  <!DOCTYPE html>
  <html style="margin:0;padding:0">
    <head> </head>
    <body>
    <h1 style="color: lightskyblue">Welcome to GLADIATORS</h1>
    <p>
        the GLADIATORS family is welcoming you ${userName} , in ording to activate your
        account please click the link below
      </p>
      <a href="http://localhost:3000/accountActivation/${token}">click</a>
    </body>
  </html>  
    `;
};

module.exports = inscriptionConfirmationTemplate;
