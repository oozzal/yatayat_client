module('yatayat.controllers')
.controller('SubmitCtrl', ['$scope', '$rootScope', 'Report', 'Router', '$cordovaGeolocation', 'Raven', function($scope, $rootScope, Report, Router, $cordovaGeolocation, Raven) {

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
      Router.go('app.reports', false, true);
    });
  };

  $scope.createReportWithLocation = function() {
    $rootScope.$broadcast('loading:show');
    $cordovaGeolocation
    .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
    .then(function(position) {
      $scope.report.location.latitude = position.coords.latitude;
      $scope.report.location.longitude = position.coords.longitude;
      $scope.createReport();
    }, function() {
      // error
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

