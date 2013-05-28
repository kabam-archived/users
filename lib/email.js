var config = require('yaml-config')
  .readConfig(__dirname + '/../config/config.yml')
  , mail = require('../config/mail')(config)
  , emailTemplates = require('email-templates')
  , nodemailer = require('nodemailer');

// send mail with templates
exports.sendMail = function (name, to, subject, data, callback) {
  var template = 'welcome.jade';
  templateOptions = {
    user: {
      email: 'keith@webizly.com'
    }
  };

  jade.renderFile(path.join(__dirname, '../email_templates/account_activation',
    template), templateOptions, function (err, text) {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: "mywebclass@webizly.com", // sender address
        to: "keith@webizly.com", // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world", // plaintext body
        html: text
      };

      if (typeof to !== 'undefined') {
        mailOptions.to = to;
      }

      if (typeof subject !== 'undefined') {
        mailOptions.subject = subject;
      }

      mail.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: " + response.message);
        }
      });

      mail.close();

      if (callback !== undefined) {
        callback(error, response);
      }
    }
  });
};