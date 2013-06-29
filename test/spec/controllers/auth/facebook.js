'use strict';

describe('Controller: AuthFacebookCtrl', function () {

  // load the controller's module
  beforeEach(module('usersApp'));

  var AuthFacebookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthFacebookCtrl = $controller('AuthFacebookCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
