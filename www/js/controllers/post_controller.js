module('yatayat.controllers')

.controller('PostCtrl', ['$scope', '$stateParams', 'Post', function($scope, $stateParams, Post) {
  $scope.post = {};

  Post.get($stateParams.postId)
  .then(function(data) {
    $scope.post = data;
  });
}])

