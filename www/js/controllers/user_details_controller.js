ngModule('yatayat.controllers')

.controller('UserDetailsCtrl', ['$scope', '$stateParams', 'User', 'Router', 'UiHelper', function($scope, $stateParams, User, Router, UiHelper) {
  $scope.detailedUser = null;

  User.getDetails($stateParams.userId)
  .then(function(detailedUser) {
    $scope.detailedUser = detailedUser;
  });

  $scope.makeAdmin = function() {
    $scope.detailedUser.role = 'admin';
    User.update($scope.detailedUser)
    .then(function(user) {
      Router.go('app.reports', false, true);
    }, function(error) {
      UiHelper.showToast("Can't Make Admin");
    });
  };
}])

