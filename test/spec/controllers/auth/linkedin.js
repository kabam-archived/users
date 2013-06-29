'use strict';

describe('Controller: AuthLinkedinCtrl', function () {

  // load the controller's module
  beforeEach(module('usersApp'));

  var AuthLinkedinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthLinkedinCtrl = $controller('AuthLinkedinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});