ngModule('yatayat.controllers')

.controller('UserDetailsCtrl', ['$scope', '$stateParams', 'User', 'Router', 'UiHelper', function($scope, $stateParams, User, Router, UiHelper) {
  $scope.detailedUser = null;

  User.getDetails($stateParams.userId)
  .then(function(detailedUser) {
    $scope.detailedUser = detailedUser;
  });

  $scope.updateUserRole = function(role) {
    UiHelper.confirm('Change User Role?')
    .then(function() {
      $scope.detailedUser.role = role;
      User.update($scope.detailedUser)
      .then(function(user) {
        Router.go('app.reports', {reload: true});
      }, function(error) {
        UiHelper.showToast("Something Went Wrong!");
      });
    });
  };
}])

