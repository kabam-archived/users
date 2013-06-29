'use strict';

describe('Controller: SignoutCtrl', function () {

  // load the controller's module
  beforeEach(module('usersApp'));

  var SignoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignoutCtrl = $controller('SignoutCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
