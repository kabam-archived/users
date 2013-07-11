'use strict';

angular.module('usersApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signout', {
        templateUrl: 'views/signout.html',
        controller: 'SignoutCtrl'
      })
      .when('/auth/twitter', {
        templateUrl: 'views/auth/twitter.html',
        controller: 'AuthTwitterCtrl'
      })
      .when('/auth/facebook', {
        templateUrl: 'views/auth/facebook.html',
        controller: 'AuthFacebookCtrl'
      })
      .when('/auth/github', {
        templateUrl: 'views/auth/github.html',
        controller: 'AuthGithubCtrl'
      })
      .when('/auth/linkedin', {
        templateUrl: 'views/auth/linkedin.html',
        controller: 'AuthLinkedinCtrl'
      })
      .when('/auth/meetup', {
        templateUrl: 'views/auth/meetup.html',
        controller: 'AuthMeetupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
