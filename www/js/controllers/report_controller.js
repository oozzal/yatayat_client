module('yatayat.controllers')

.controller('ReportCtrl', ['$scope', 'Post', 'Navigator', function($scope, Post, Navigator) {
  $scope.post = {};

  $scope.report = function() {
    Post.create($scope.post)
    .then(function() {
      Navigator.go('app.posts');
    });
  };
}])

