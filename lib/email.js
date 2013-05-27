var config = require('yaml-config').readConfig(__dirname + '/../config/config.yml')
  , mail = require('../config/mail')(config)
  , emailTemplates = require('email-templates')
  , nodemailer = require('nodemailer');

// setup e-mail data with unicode symbols
var mailOptions = {
  from: "MyWebClass <mywebclass@webizly.com>", // sender address
  to: "MyWebClass <mywebclass@webizly.com>", // list of receivers
  subject: "Hello ", // Subject line
  text: "Hello world ", // plaintext body
  html: "<b>Hello world </b>" // html body
};

// send mail with templates
exports.sendMail = function (name, to, subject, data, callback) {

  emailTemplates(require('path').resolve(__dirname, '..', 'templates'), function (err, template) {

    if (err) {
      console.log(err);
    } else {

      template(name, data, function (err, html, text) {
        if (err) {
          console.log(err);
        } else {

          if (typeof to !== 'undefined') {
            mailOptions.to = to;
          }
          if (typeof subject !== 'undefined') {
            mailOptions.subject = subject;
          }
          mailOptions.html = html;
          mailOptions.text = text;
          mail.sendMail(mailOptions, function(error, response) {

            if (error) {
              console.log(error);
            } else {
              console.log("Message sent: " + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            mail.close(); // shut down the connection pool, no more messages
            if (callback !== undefined) {
              callback(error, response);
            }
          });
        }

      });
    }
  });
};
