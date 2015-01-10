module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', '$rootScope', 'User', 'Sim', 'Modal', 'Navigator', '$ionicPopup', 'Validator',
  function($scope, $rootScope, User, Sim, Modal, Navigator, $ionicPopup, Validator) {

  Modal.setup($scope, 'templates/tos.html');

  // The very beginning of application logic
  User.checkRegistration()
  .then(function(user) {
    $scope.enterMain(user.sim_serial_number);
  }, function() {
    // new user
  });

  $scope.enterMain = function(simSerialNumber) {
    $rootScope.simSerialNumber = simSerialNumber;
    Navigator.go('app.posts', true);
  };

  $scope.registerWithCredentials = function(simSerialNumber, phoneNumber) {
    User.register(simSerialNumber, phoneNumber)
    .then(function() {
      $ionicPopup.alert({
        title: 'Success',
        template: simSerialNumber + ' registered successfully.'
      }).then(function() {
        $scope.enterMain(simSerialNumber);
      });
    });
  };

  $scope.register = function() {
    Sim.getDetails()
    .then(function(result) {
      $scope.registerWithCredentials(result.simSerialNumber, result.line1Number);
    });
  };
}])

