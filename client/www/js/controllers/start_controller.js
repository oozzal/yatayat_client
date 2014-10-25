module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', 'Navigator', 'Modal', 'User', '$ionicLoading', '$ionicPopup', 'Validator',
  function($scope, Navigator, Modal, User, $ionicLoading, $ionicPopup, Validator) {

  Modal.setup($scope, 'templates/tos.html');

  $scope.enterMain = function() {
    Navigator.go('app.posts', true);
  };


  User.checkRegistration()
  .then(function() {
    // $scope.enterMain();
  });

  $scope.registerWith = function(number) {
    if(!Validator.isValidPhone(number)) {
      $ionicPopup.alert({title: 'Invalid phone', template: 'Please enter a valid phone number'});
      return;
    }
    $ionicLoading.show({template: 'Registering ' + $scope.phoneNumber + '...'});
    User.register($scope.phoneNumber)
    .then(function() {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Success',
        template: $scope.phoneNumber + ' registered successfully.'
      }).then(function() {
        $scope.enterMain();
      });
    });
  };

  $scope.register = function() {
    if(typeof cordova !== 'undefined') {
      var telephoneNumber = cordova.require('cordova/plugin/telephonenumber');
      telephoneNumber.get(function(result) {
        if(result.length > 0) {
          $scope.phoneNumber = result;
          $scope.registerWith($scope.phoneNumber);
        } else { // sim provider doesn't support getting phone number via telephonemanager api
          $ionicPopup.prompt({
            title: 'Register',
            template: 'Pease enter you phone number to register with us',
            inputType: 'number',
            inputPlaceholder: 'Phone Number'
          }).then(function(number) {
            $scope.phoneNumber = number;
            $scope.registerWith($scope.phoneNumber);
          });
        }
      }, function(error) {
        alert('error = ' + error.code);
      });
    } else {
      $scope.phoneNumber = '9808640958';
      $scope.registerWith($scope.phoneNumber);
    }
  };
}])

