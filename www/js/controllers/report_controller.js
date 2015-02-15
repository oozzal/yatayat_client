ngModule('yatayat.controllers')

.controller('ReportCtrl', ['$scope', '$rootScope', '$stateParams', 'Report', 'uiGmapGoogleMapApi', 'Router', 'UiHelper', function($scope, $rootScope, $stateParams, Report, uiGmapGoogleMapApi, Router, UiHelper) {
  $scope.report = {};

  Report.get($stateParams.reportId)
  .then(function(data) {
    $scope.report = data;

    uiGmapGoogleMapApi.then(function(maps) {
      var coords = { latitude: data.location.latitude, longitude: data.location.longitude };
      $scope.map = { center: coords, zoom: 17 , options: { scrollwheel: false, draggable: false } };
      $scope.marker = {
        id: data.location_id,
        coords: coords
      };
    });

  }); // end then

  $scope.syncVotes = function(resp) {
    $scope.report.cached_votes_up = resp.cached_votes_up;
    $scope.report.cached_votes_down = resp.cached_votes_down;
    $scope.report.user.cached_votes_up = resp.user.cached_votes_up;
    $scope.report.user.cached_votes_down = resp.user.cached_votes_down;
  };

  $scope.likeReport = function() {
    Report.like($scope.report, $rootScope.user)
    .then(function(resp) {
      $scope.syncVotes(resp);
    });
  };

  $scope.dislikeReport = function() {
    Report.dislike($scope.report, $rootScope.user)
    .then(function(resp) {
      $scope.syncVotes(resp);
    });
  };

  $scope.deleteReport = function() {
    UiHelper.confirm()
    .then(function(res) {
      Report.destroy($scope.report.id)
      .then(function(resp) {
        Router.go('app.reports');
      });
    });
  };
}])

