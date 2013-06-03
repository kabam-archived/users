var nodemailer = require('nodemailer');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport('Stub');

// setup e-mail data with unicode symbols
// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'My Web Class <muhammad.ghazali@widyatama.ac.id>',
  to: 'muhammadghazali2480@gmail.com',
  subject: 'Account Registration',
  text: 'Account Registration text body', // plaintext body
  html: '<b>Account Registration html body</b>' // html body
};

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function (error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + response.message);
  }

  // if you don't want to use this transport object anymore, uncomment following line
  smtpTransport.close(); // shut down the connection pool, no more messages
});
