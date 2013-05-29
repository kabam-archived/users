var config = require('yaml-config')
  .readConfig(__dirname + '/../config/config.yml')
  , mail = require('../config/mail')(config)
  , emailTemplates = require('email-templates')
  , nodemailer = require('nodemailer');

/**
 * Get the template file path
 * @param {String} file the file template name
 */
function getTemplate (file) {

  return path.join(__dirname, '../email_templates/account_activation', file);
}

/**
 * @param {String} name what name?
 * @param {String} to email recipient
 * @param {String} subject email subject
 * @param {String} data what data?
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
