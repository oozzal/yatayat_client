module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', '$rootScope', 'User', 'Sim', 'Modal', 'Navigator', '$ionicPopup', 'Validator',
  function($scope, $rootScope, User, Sim, Modal, Navigator, $ionicPopup, Validator) {

  Modal.setup($scope, 'templates/tos.html');

  $scope.registerWithCredentials = function(simSerialNumber, phoneNumber) {
    User.register(simSerialNumber, phoneNumber)
    .then(function() {
      $ionicPopup.alert({
        title: 'Success',
        template: simSerialNumber + ' registered successfully.'
      }).then(function() {
        $scope.enterMain({sim_serial_number: simSerialNumber});
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

