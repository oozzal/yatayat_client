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
    .then(function() {
      report.cached_votes_up = report.cached_votes_up + 1;
    });
  };

  $scope.dislikeReport = function($index, $event) {
    $event.preventDefault();
    var report = $scope.reports[$index];
    Report.dislike(report, $rootScope.user)
    .then(function() {
      report.cached_votes_down = report.cached_votes_down + 1;
    });
  };

  $scope.editReport = function($index, $event) {
    $event.preventDefault();
  };

  $scope.getReports();
}])

