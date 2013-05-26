var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
module.exports = new nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
      user: "mywebclass@webizly.com",
      pass: "web$1234"
  }
});
