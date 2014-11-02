module('yatayat.controllers')

.controller('PostsCtrl', ['$scope', 'Post', function($scope, Post) {

  Post.all()
  .then(function(data) {
    $scope.posts = data;
  });

  $scope.likePost = function($index, $event) {
    $event.preventDefault();
  };

  $scope.editPost = function($index, $event) {
    $event.preventDefault();
  };
}])

