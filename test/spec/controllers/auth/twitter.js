'use strict';

describe('Controller: AuthTwitterCtrl', function () {

  // load the controller's module
  beforeEach(module('usersApp'));

  var AuthTwitterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthTwitterCtrl = $controller('AuthTwitterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
