ngModule('yatayat.controllers')

.controller('UserCtrl', ['$scope', '$rootScope', 'User', 'Router', 'UiHelper', function($scope, $rootScope, User, Router, UiHelper) {
  $scope.updateProfile = function() {
    User.update($rootScope.user)
    .then(function(user) {
      $rootScope.user = user;
      Router.go('app.reports', false, true)
      .then(function() {
        UiHelper.showToast('Profile Updated Successfully!');
      });
    }, function(error) {
      UiHelper.showToast('Error Updating Profile!');
    });
  };
}])

