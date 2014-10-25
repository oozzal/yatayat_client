module('yatayat.factories')

.factory('User', ['Raven', '$q', function(Raven, $q) {
  return {
    checkRegistration: function() {
      // var userId = Phone.number();
      var defer = $q.defer();
      Raven.get('users/:id')
      .then(function() {
        defer.resolve();
      });
      return defer.promise;
    },

    register: function(phoneNumber) {
      var defer = $q.defer();
      Raven.post('users/new', {id: phoneNumber})
      .then(function() {
        defer.resolve();
      });
      return defer.promise;
    }
  }
}])

