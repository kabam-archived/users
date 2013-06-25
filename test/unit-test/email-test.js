/**
 * Email test suite
 */

var should = require('should'),
  nodemailer = require('nodemailer');

var email = require('./../../lib/email');

describe('Email', function () {
  describe('load module', function () {
    it('should loaded successfully', function () {
      should.exist(email);
      email.should.be.a('object');
    });
  });

  describe('Email base class', function () {
    it('should exists', function () {
      should.exist(email.Email);
      email.Email.should.be.a('function');
    });

    it('should have a send interface', function () {
      var baseEmail = new email.Email();
      should.exist(baseEmail.mailTransport);
      should.exist(baseEmail.send);
      baseEmail.send.should.be.a('function');
    });
  });

  describe('Email decorators', function () {
    it('Account Registration decorator should exists', function () {
      should.exist(email.AccountRegistration);
      email.AccountRegistration.should.be.a('function');
    });

    it('Cancel Account decorator should exists', function () {
      should.exist(email.AccountCancel);
      email.AccountCancel.should.be.a('function');
    });

    it('Account Confirmation decorator should exists', function () {
      should.exist(email.AccountConfirmation);
      email.AccountConfirmation.should.be.a('function');
    });

    it('Account Invite decorator should exists', function () {
      should.exist(email.AccountInvite);
      email.AccountInvite.should.be.a('function');
    });
  });

  describe('Account Registration', function () {
    describe('#AccountRegistration()', function () {
      it('should sent an account registration message', function (done) {
        var stubTransport = nodemailer.createTransport('Stub');
        var baseEmail = new email.Email(stubTransport);
        email.AccountRegistration(baseEmail);

        baseEmail.send('keith@webizly.com', 'Test subject',
        {
          displayName: 'Test Display Name',
          link: 'http://example.com/1234567890'
        },
        function (err, result) {
          if (err) {
            throw err;
          }
          
          result.should.be.a('object');
          result.should.have.property('message');
          result.should.have.property('messageId');

          done();
        });
      });
    });
  });

  describe('Account Cancel', function () {
    describe('#AccountCancel()', function () {
      it('should sent an account cancel message', function (done) {
        var stubTransport = nodemailer.createTransport('Stub');
        var baseEmail = new email.Email(stubTransport);
        email.AccountCancel(baseEmail);

        baseEmail.send('keith@webizly.com', 'Cancel Account',
        {
          displayName: 'Keith W.'
        },
        function (err, result) {
          if (err) {
            throw err;
          }

          result.should.be.a('object');
          result.should.have.property('message');
          result.should.have.property('messageId');

          done();
        });
      });
    });
  });
});
