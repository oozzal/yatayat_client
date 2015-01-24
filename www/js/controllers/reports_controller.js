ngModule('yatayat.controllers')

.controller('ReportsCtrl', ['$scope', '$rootScope', 'Report', function($scope, $rootScope, Report) {
  $scope.getReports = function(refresh) {
    Report.all()
    .then(function(data) {
      $scope.reports = data;
      refresh && $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.refresh = function() {
    $scope.getReports(true);
  };

  $scope.likeReport = function($index, $event) {
    $event.preventDefault();
    var report = $scope.reports[$index];
    Report.like(report, $rootScope.user)
    .then(function(resp) {
      report.cached_votes_up = resp.cached_votes_up;
      report.cached_votes_down = resp.cached_votes_down;
      $scope.refresh();
    });
  };

  $scope.dislikeReport = function($index, $event) {
    $event.preventDefault();
    var report = $scope.reports[$index];
    Report.dislike(report, $rootScope.user)
    .then(function(resp) {
      report.cached_votes_down = resp.cached_votes_down;
      report.cached_votes_up = resp.cached_votes_up;
      $scope.refresh();
    });
  };

  $scope.editReport = function($index, $event) {
    $event.preventDefault();
  };

  $scope.getReports();
}])

