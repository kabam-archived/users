'use strict';

describe('Controller: AuthMeetupCtrl', function () {

  // load the controller's module
  beforeEach(module('usersApp'));

  var AuthMeetupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthMeetupCtrl = $controller('AuthMeetupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
