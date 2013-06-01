var frisby = require('frisby');

require('./start-app');

var BASE_PATH = 'http://localhost:3080';

frisby.create('Base path')
  .get(BASE_PATH + '/')
  .expectStatus(200)
  .toss();

frisby.create('About')
  .get(BASE_PATH + '/about')
  .expectStatus(200)
  .toss();

frisby.create('Signup')
  .get(BASE_PATH + '/signup')
  .expectStatus(200)
  .toss();

frisby.create('Signin')
  .get(BASE_PATH + '/signin')
  .expectStatus(200)
  .toss();

frisby.create('Activate')
  .get(BASE_PATH + '/logout')
  .expectStatus(200)
  .toss();

frisby.create('Ping /users with not login session')
  .get(BASE_PATH + '/users')
  .expectStatus(200)
  .toss();

frisby.create('Sign in with with Twitter account')
  .get(BASE_PATH + '/auth/twitter')
  .expectStatus(200)
  .toss();

frisby.create('Sign in with with Facebook account')
  .get(BASE_PATH + '/auth/facebook')
  .expectStatus(200)
  .toss();

frisby.create('Sign in with with Facebook account')
  .get(BASE_PATH + '/auth/github')
  .expectStatus(200)
  .toss();

frisby.create('Sign in with with Facebook account')
  .get(BASE_PATH + '/auth/linked-in')
  .expectStatus(200)
  .toss();

frisby.create('Sign in with with Meetup account')
  .get(BASE_PATH + '/auth/meetup')
  .expectStatus(200)
  .toss();