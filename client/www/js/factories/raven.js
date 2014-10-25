module('yatayat.factories')

.factory('Raven', ['$timeout', '$q', function($timeout, $q) {
  var baseUrl = 'http://localhost:3000/';
  return {
    get: function(path, callback) {
      /**
       * $http.get(baseUrl + path)
       * .success(function() {});
       **/
      // callback.call();
      var defer = $q.defer();
      $timeout(function() {
        defer.resolve();
      }, 1000);
      return defer.promise;
    },

    post: function(path, data, callback) {
      /**
       * $http.post(baseUrl + path, data)
       * .success(function() {});
       **/
      var defer = $q.defer();
      $timeout(function() {
        defer.resolve();
      }, 1000);
      return defer.promise;
    }
  }
}])

