ngModule('yatayat.controllers')

.controller('ReportEditCtrl', ['$scope', '$stateParams', 'Report', 'Raven', 'Router', 'UiHelper', function($scope, $stateParams, Report, Raven, Router, UiHelper) {

  Report.get($stateParams.reportId)
  .then(function(report) {
    $scope.report = report;
    Raven.get('categories')
    .then(function(data) {
      $scope.categories = data;
      // weird code :(
      $scope.report.category = data.filter(function(cat) {
        return cat.id === $scope.report.category_id
      })[0];
    });
  });

  $scope.updateReport = function() {
    Report.update($scope.report)
    .then(function() {
      Router.go('app.reports', {reload: true})
      .then(function() {
        UiHelper.showToast('Report Updated Successfully!');
      });
    }, function(error) {
      UiHelper.showToast('Error Updating Report!');
    });
  };
}])

