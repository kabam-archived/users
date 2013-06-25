var
  config = require('yaml-config')
  .readConfig(__dirname + '/../config/config.yml'),
  defaultMailTransport = require('../config/mail')(config.smtp),
  jade = require('jade'),
  path = require('path'),
  fs = require('fs');

var TEMPLATE_DIR = '../templates/emails';

/**
* Get the template file path

* @param {String} file the file template name
*/
function getTemplate (file) {

  return path.join(__dirname, TEMPLATE_DIR, file);
}

/**
* Send the actual email message to recipient
* 
* @param {Object} email a base email address
* @param {String} recipient a valid email address
* @param {String} subject an email subject teks
* @param {String} templateName template name
* @param {Object} templateData template data
*/
function emailSender (email, recipient, subject, templateName, templateData,
  cb) {

  templateName += '.jade';

  fs.readFile(getTemplate(templateName), {encoding: 'utf8'},
    function (err, templateContent) {
      var fn = jade.compile(templateContent, {
        filename: getTemplate(templateName),
        pretty: true
      });

      var mailOptions = {
        from: 'My Web Class <mywebclass@webizly.com>',
        to: recipient,
        subject: subject,
        html: fn(templateData)
      };

      email.mailTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
          cb(err);
        } else {
          cb(null, response);
        }
        email.mailTransport.close();
      });
    });
}

/**
 * Email base class
 *
 * @param {Object} transport mail transport
 */
 exports.Email = function (transport) {

  this.mailTransport = transport || defaultMailTransport;
  this.send = function () {};
};

/**
 * Send a welcoming account registration message
 *
 * @param {Object} email a base email address
 */
 exports.AccountRegistration = function (email) {

  email.send =
  function sendRegistrationConfirmation (recipient, subject, templateData, cb) {
    emailSender(email, recipient, subject, 'welcome', templateData, cb);
  };
};

/**
 * Send a succesful canceling account message
 *
 * @param {Object} email a base email address
 */
exports.AccountCancel = function (email) {

  email.send =
  function sendCancelConfirmation (recipient, subject, templateData, cb) {
    emailSender(email, recipient, subject, 'cancel', templateData, cb);
  };
};

exports.AccountConfirmation = function () {

};

exports.AccountInvite = function () {

};
