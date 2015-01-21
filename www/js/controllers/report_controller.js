ngModule('yatayat.controllers')

.controller('ReportCtrl', ['$scope', '$stateParams', 'Report', function($scope, $stateParams, Report) {
  $scope.report = {};

  Report.get($stateParams.reportId)
  .then(function(data) {
    $scope.report = data;
  });
}])

