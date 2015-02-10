ngModule('yatayat.factories')

.factory('Raven', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
  var baseUrl;
  if(typeof cordova == 'undefined') {
    baseUrl = 'http://localhost:3000/';
  } else {
    baseUrl = 'http://yatayat.herokuapp.com/';
  }

  return {
    urlFor: function(path) {
      return baseUrl + path;// + '.json'
    },

    get: function(path) {
      var defer = $q.defer();

      $http({
        url: this.urlFor(path),
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

      if($rootScope.user.role !== 'blocked') {
        $http({
          url: this.urlFor(path),
          method: 'POST',
          // data: data,
          data: $.param(data),
          withCredentials: true
        }).then(function(result) {
          defer.resolve(result.data);
        }, function(error) {
          defer.reject(error.data);
        });
      } else {
        defer.reject();
        $rootScope.$broadcast('broadcast:message', 'Sorry you are blocked from the system');
      }

      return defer.promise;
    }

  }
}])

