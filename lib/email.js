var
  config = require('yaml-config')
  .readConfig(__dirname + '/../config/config.yml'),
  defaultMailTransport = require('../config/mail')(config.smtp),
  jade = require('jade'),
  path = require('path'),
  fs = require('fs');

var TEMPLATE_DIR = '../templates/emails';

/*
Get the template file path
 @param {String} file the file template name
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
  this.send = function () {};
};

/**
 * Send a welcoming account registration message
 *
 * @param {String} email recipient
 */
 exports.AccountRegistration = function (email) {

  email.send = function (recipient, subject, templateData, cb) {
    fs.readFile(getTemplate('welcome.jade'), {encoding: 'utf8'},
      function (err, templateContent) {
        var fn = jade.compile(templateContent, {
          filename: getTemplate('welcome.jade'),
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
  };
};

exports.CancelAccount = function (email) {

  email.send =
  function sendCancelConfirmation (recipient, subject, templateData, cb) {
    fs.readFile(getTemplate('cancel.jade'), {encoding: 'utf8'},
      function (err, templateContent) {
        var fn = jade.compile(templateContent, {
          filename: getTemplate('cancel.jade'),
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
  };
};

exports.AccountConfirmation = function () {

};

exports.AccountInvite = function () {

};
