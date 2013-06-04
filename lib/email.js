var config = require('yaml-config')
  .readConfig(__dirname + '/../config/config.yml')
  , defaultMailTransport = require('../config/mail')(config.smtp)
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
 * Email base class
 *
 * @param {Object} transport mail transport
 */
exports.Email = function (transport) {

  this.mailTransport = transport || defaultMailTransport;
  this.send = function () {
  };
};

/**
 * Send a welcoming account registration message
 *
 * @param {String} email recipient
 */
exports.AccountRegistration = function (email) {

  email.send = function (recipient, cb) {
    var mailOptions = {
      from: 'My Web Class <mywebclass@webizly.com>',
      to: recipient,
      subject: 'Account Registration',
      text: 'Account Registration text body', // plaintext body
      html: '<b>Account Registration html body</b>' // html body
    };

    email.mailTransport.sendMail(mailOptions, function (err, response) {
      if (err)
        cb(err);
      else
        cb(null, response);

      email.mailTransport.close();
    });
  };
};

exports.CancelAccount = function () {

};

exports.AccountConfirmation = function () {

};

exports.AccountInvite = function () {

};