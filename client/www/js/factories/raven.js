module('yatayat.factories')

.factory('Raven', ['$http', '$q', function($http, $q) {
  var baseUrl = 'http://192.168.1.2:3000/';
  return {
    get: function(path) {
      var defer = $q.defer();

      $http.get(baseUrl + path)
      .success(function(result) {
        defer.resolve(result);
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
      });

      return defer.promise;
    }
  }
}])

