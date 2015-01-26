ngModule('yatayat.factories')

.factory('Raven', ['$http', '$q', function($http, $q) {
  var baseUrl;
  if(typeof cordova == 'undefined') {
    baseUrl = 'http://localhost:3000/';
  } else {
    baseUrl = 'http://yatayat.herokuapp.com/';
  }
  return {
    get: function(path) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'GET'
      }).then(function(result) {
        defer.resolve(result.data);
      }, function(error) {
        defer.reject(error.data);
      });

      return defer.promise;
    },

    post: function(path, data) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'POST',
        data: $.param(data),
      }).then(function(result) {
        defer.resolve(result.data);
      }, function(error) {
        defer.reject(error.data);
      });

      return defer.promise;
    }
  }
}])

