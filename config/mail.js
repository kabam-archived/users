var nodemailer = require('nodemailer');

/**
 * Create reusable transport method (opens pool of SMTP connections)
 *
 * @param {object} smtpConfig email transport configs
 */
module.exports = function (smtpConfig) {

  return new nodemailer.createTransport('SMTP', {
    service: smtpConfig.service,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass
    }
  });
};
