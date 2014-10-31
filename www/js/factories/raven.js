module('yatayat.factories')

.factory('Raven', ['$http', '$q', function($http, $q) {
  var baseUrl = 'http://192.168.2.6:3000/';
  return {
    get: function(path) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'GET'
      }).then(function(result) {
        defer.resolve(result.data);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    post: function(path, data) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'POST',
        data: $.param(data),
      }).then(function() {
        defer.resolve();
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }
  }
}])

