module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', '$rootScope', 'User', 'Sim', 'Modal', 'Navigator', '$ionicPopup', 'Validator', 'UiHelper',
  function($scope, $rootScope, User, Sim, Modal, Navigator, $ionicPopup, Validator, UiHelper) {

  Modal.setup($scope, 'templates/tos.html');

  // The very beginning of application logic
  User.checkRegistration()
  .then(function(user) {
    $scope.enterMain(user);
  }, function() {
    // new user
  });

  $scope.enterMain = function(user) {
    $rootScope.user = user;
    Navigator.go('app.posts', true)
    .then(function() {
      UiHelper.showToast('Welcome back!', 2000, 'bottom');
    });
  };

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

