'use strict';

describe('Controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('usersApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a page title to the scope', function() {
    expect(scope.heading).toMatch('Login to My Web Class');
  });

  it('should have a function to handle login request', function() {
    expect(scope.login).toBeDefined();
  });
});