ngModule('yatayat.controllers')

.controller('AppCtrl', ['$scope', '$rootScope', 'Modal', '$timeout', function($scope, $rootScope, Modal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  Modal.setup($scope, 'templates/login.html');

  $scope.login = function() {
    $scope.showModal();
  }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.closeModal();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}])

