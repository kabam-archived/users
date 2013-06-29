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
      .otherwise({
        redirectTo: '/'
      });
  });
