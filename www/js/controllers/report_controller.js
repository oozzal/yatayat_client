module('yatayat.controllers')

.controller('ReportCtrl', ['$scope', '$rootScope', 'Post', 'Navigator', function($scope, $rootScope, Post, Navigator) {
  $scope.post = {
    sim_serial_number: $rootScope.simSerialNumber
  };

  $scope.report = function() {
    Post.create($scope.post)
    .then(function() {
      Navigator.go('app.posts');
    });
  };
}])

