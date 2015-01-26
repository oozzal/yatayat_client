ngModule('yatayat.controllers')

.controller('ReportsCtrl', ['$scope', '$rootScope', 'Report', 'UiHelper', function($scope, $rootScope, Report, UiHelper) {

  $scope.data = {};

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

  $scope.search = function(query) {
    var regex = new RegExp(query, 'i');
    return function(report) {
      return report.category.name.match(regex)
             || (report.message && report.message.match(regex))
             || report.location.name.match(regex)
             || (report.user.username && report.user.username.match(regex))
             || report.created_at.match(regex);
    };
  };

  $scope.clearSearch = function() {
    $scope.data.searchQuery = '';
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

  $scope.deleteReport = function($index, $event) {
    $event.preventDefault();
    var report = $scope.reports[$index];
    Report.destroy(report.id)
    .then(function(resp) {
      $scope.refresh();
      UiHelper.showToast('Report Deleted Successfully!');
    });
  };

  $scope.editReport = function($index, $event) {
    $event.preventDefault();
  };

  $scope.getReports();
}])

