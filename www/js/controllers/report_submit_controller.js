ngModule('yatayat.controllers')
.controller('ReportSubmitCtrl', ['$scope', '$rootScope', 'Report', 'Router', '$cordovaGeolocation', 'Raven', 'UiHelper', function($scope, $rootScope, Report, Router, $cordovaGeolocation, Raven, UiHelper) {

  $scope.report = {
    location: {}
  };

  $scope.useCurrentLocation = true;

  $scope.toggleLocation = function() {
    $scope.useCurrentLocation = !$scope.useCurrentLocation;
  };

  $scope.categories = [];

  Raven.get('categories')
  .then(function(data) {
    $scope.categories = data;
    $scope.report.category = $scope.categories[0];
  });

  $scope.createReport = function() {
    Report.create($scope.report)
    .then(function() {
      Router.go('app.reports', {reload: true})
      .then(function() {
        UiHelper.showToast('Report Created Successfully!');
      });
    });
  };

  $scope.createReportWithLocation = function() {
    $rootScope.$broadcast('loading:show');
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
    .then(function(position) {
      $scope.report.location.latitude = position.coords.latitude;
      $scope.report.location.longitude = position.coords.longitude;
      // Loading will be hidden after report is created
      $scope.createReport();
    }, function() {
      $rootScope.$broadcast('loading:hide');
      UiHelper.showToast('Could not get location.');
    });
  };

  $scope.submitReport = function() {
    $scope.report.user_id = $rootScope.user.id;
    $scope.report.category_id = $scope.report.category.id;

    if($scope.useCurrentLocation) {
      $scope.createReportWithLocation();
    } else {
      $scope.createReport();
    }
  };

}])

