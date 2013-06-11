/**
 * User REST API Test Suite
 */
var should = require('should'),
    request = require('supertest');

process.env.NODE_ENV = 'test';
var app = require('./../../app');

var testUserA = {
  active: true,
  activeDate: '2013-01-01',
  username: 'testuser',
  accounts: [
    {
      provider: 'local',
      displayName: 'Test User',
      name: {
        familyName: 'User',
        givenName: 'Test'
      },
      emails: [
        {
          value: 'test@webizly.com',
          type: 'default'
        }
      ]
    }
  ]
}, testUserB = {
  active: true,
  activeDate: '2013-01-01',
  username: 'testuser2',
  accounts: [
    {
      provider: 'local',
      displayName: 'Test User 2',
      name: {
        familyName: 'User',
        givenName: 'Test 2'
      },
      emails: [
        {
          value: 'test2@webizly.com',
          type: 'default'
        }
      ]
    }
  ]
};

describe('User REST API', function () {
  var User = require('mongoose').model('User'),
      userId = null,
      totalUser = 0;

  /**
   * Setup user database by entering a default user
   */
  before(function (done) {
    User.remove(function (err) {
      if (err) {
        return done(err);
      }
      var user = new User(testUserA);
      user.save(function (err, user) {
        if (err) {
          return done(err);
        }
        userId = user._id;
        totalUser = 1;
        return done();
      });
      return null;
    });
  });

  it('Get Users list', function (done) {
    request(app)
      .get('/rest/user')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        var body = res.body,
            payload = body.payload;
        should.exist(body);
        body.total.should.be.above(0);
        body.status.should.equal(0);
        payload.should.be.an.instanceOf(Array);
        var userA = payload[0];
        should.exist(userA);
        return done();
      });
  });

  it('Get a user by id', function (done) {
    request(app)
      .get('/rest/user/' + userId)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        var body = res.body,
            user = body.payload[0];
        should.exist(body);
        body.status.should.equal(0);
        user._id.should.equal(userId.toString());
        user.username.should.equal(testUserA.username);
        user.active.should.equal(testUserA.active);
        user.accounts.should.be.an.instanceOf(Array);
        user.accounts[0].provider.should.equal(testUserA.accounts[0].provider);
        return done(err);
      });
  });

  it('Create a new User', function (done) {
    request(app)
      .post('/rest/user')
      .send(testUserB)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        var body = res.body,
            user = body.payload;
        should.exist(body);
        body.status.should.equal(0);
        var user2Id = user._id;
        should.exist(user2Id);

        User.findOne({'_id': user2Id}, function (err, user2) {
          if (err) {
            return done(err);
          }
          should.exist(user2);
          user2.username.should.be.equal(testUserB.username);
          user2.active.should.equal(testUserB.active);
          user2.accounts.should.be.an.instanceOf(Array);
          user2.accounts[0].provider.should.equal(testUserB.accounts[0].provider);

          return done();
        });
        return null;
      });
  });

  it('Update a new User', function (done) {
    request(app)
      .put('/rest/user/' + userId)
      .send({ username: 'updatedname' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        var body = res.body,
            user = body.payload;
        should.exist(body);
        body.status.should.equal(0);
        var userId = user._id;
        should.exist(userId);

        User.findOne({'_id': userId}, function (err, updUser) {
          if (err) {
            return done(err);
          }
          should.exist(updUser);
          updUser.username.should.be.equal('updatedname');
          updUser.active.should.equal(testUserA.active);
          updUser.accounts.should.be.an.instanceOf(Array);
          updUser.accounts[0].provider.should.equal(testUserA.accounts[0].provider);
          return done();
        });
        return null;
      });
  });

  it('Delete a new User', function (done) {
    request(app)
      .del('/rest/user/' + userId)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        var body = res.body;

        should.exist(body);
        body.status.should.equal(0);

        User.findOne({'_id': userId}, function (err, deletedUser) {
          if (err) {
            return done(err);
          }
          should.not.exist(deletedUser);
          return done();
        });
        return null;
      });
  });

});
