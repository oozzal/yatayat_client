ngModule('yatayat.controllers')

.controller('ReportCtrl', ['$scope', '$rootScope', '$stateParams', 'Report', 'uiGmapGoogleMapApi', function($scope, $rootScope, $stateParams, Report, uiGmapGoogleMapApi) {
  $scope.report = {};

  Report.get($stateParams.reportId)
  .then(function(data) {
    $scope.report = data;

    uiGmapGoogleMapApi.then(function(maps) {
      var coords = { latitude: data.location.latitude, longitude: data.location.longitude };
      $scope.map = { center: coords, zoom: 17 , options: { scrollwheel: false } };
      $scope.marker = {
        id: data.location_id,
        coords: coords,
        options: { draggable: false }
      };
    });

  });
}])

