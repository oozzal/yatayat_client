module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', '$rootScope', 'User', 'Sim', 'Modal', 'Router', '$ionicPopup', 'UiHelper',
  function($scope, $rootScope, User, Sim, Modal, Router, $ionicPopup, UiHelper) {

  Modal.setup($scope, 'templates/tos.html');

  $scope.registerWithCredentials = function(simSerialNumber, phoneNumber) {
    User.register(simSerialNumber, phoneNumber)
    .then(function() {
      $ionicPopup.alert({
        title: 'Success',
        template: simSerialNumber + ' registered successfully.'
      }).then(function() {
        Router.go('app.reports', true)
        .then(function() {
          UiHelper.showToast('Welcome!', 3000, 'bottom');
        });
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

