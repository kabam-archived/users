var config = require('yaml-config')
  .readConfig(__dirname + '/../config/config.yml')
  , mail = require('../config/mail')(config)
  , nodemailer = require('nodemailer')
  , jade = require('jade')
  , path = require('path');

var TEMPLATE_DIR = '../templates/emails/account_activation';

/**
 * Get the template file path
 * @param {String} file the file template name
 */
function getTemplate (file) {

  return path.join(__dirname, TEMPLATE_DIR, file);
}

/**
 * @param {String} name name of template (what the email is for)
 * @param {String} to email recipient
 * @param {String} subject email subject
 * @param {String} data object with variable contents
 * @param {Function} cb email subject
 */
exports.sendMail = function (name, to, subject, data, cb) {

  if (cb !== undefined) {
    cb(new Error('Please, provide a callback'));
  }

  var welcomeTemplate = 'welcome.jade';
  var templateOptions = {
    user: {
      email: 'keith@webizly.com'
    }
  };

  for (var prop in data) {
    templateOptions['prop'] = data['prop'];
  }
  console.log(templateOptions);

  jade.renderFile(getTemplate(welcomeTemplate), templateOptions,
    function (err, text) {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: 'mywebclass@webizly.com', // sender address
          to: 'keith@webizly.com', // list of receivers
          subject: 'Hello', // Subject line
          text: 'Hello world', // plaintext body
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
            console.log('Message sent: ' + response.message);
          }
        });

        mail.close();
      }
    });
};
