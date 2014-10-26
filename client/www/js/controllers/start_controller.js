module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', '$rootScope', 'User', 'Sim', 'Modal', 'Navigator', 'Loading', '$ionicPopup', 'Validator',
  function($scope, $rootScope, User, Sim, Modal, Navigator, Loading, $ionicPopup, Validator) {

  Loading.show();
  Modal.setup($scope, 'templates/tos.html');

  $scope.enterMain = function(simSerialNumber) {
    $rootScope.userId = simSerialNumber;
    Navigator.go('app.posts', true);
  };

  User.checkRegistration()
  .then(function(user) {
    Loading.hide();
    $scope.enterMain(user.sim_serial_number);
  }, function() {
    Loading.hide();
  });

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
    Loading.show();
    Sim.getDetails()
    .then(function(result) {
      Loading.hide();
      $scope.registerWithCredentials(result.simSerialNumber, result.line1Number);
    });
  };
}])

