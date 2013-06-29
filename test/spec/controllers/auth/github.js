'use strict';

describe('Controller: AuthGithubCtrl', function () {

  // load the controller's module
  beforeEach(module('usersApp'));

  var AuthGithubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthGithubCtrl = $controller('AuthGithubCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
