var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
module.exports = function (config) {
  console.log(config);
  new nodemailer.createTransport("SMTP",{
    service: config.smtp.service,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });
};
