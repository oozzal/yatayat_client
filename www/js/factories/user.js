ngModule('yatayat.factories')

.factory('User', ['Raven', '$q', 'Sim', function(Raven, $q, Sim) {
  return {
    checkRegistration: function() {
      var defer = $q.defer();
      Sim.getDetails()
      .then(function(result) {
        Raven.get('users/' + result.simSerialNumber)
        .then(function(user) {
          if(user && user.id) {
            defer.resolve(user);
          } else {
            defer.reject();
          }
        }, function() {
          defer.reject();
        });
      });
      return defer.promise;
    },

    register: function(simSerialNumber, phoneNumber) {
      var defer = $q.defer();

      var reg_info = {};
      reg_info.sim_serial_number = simSerialNumber;

      if(phoneNumber) {
        reg_info.phone_number = phoneNumber;
      }

      Raven.post('users', { user: reg_info })
      .then(function(user) {
          if(user.id) {
            defer.resolve(user);
          } else {
            defer.reject();
          }
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }, // end register

    update: function(user) {
      var defer = $q.defer();

      // Don't send existing id for update request
      delete user.id

      Raven.post('users/' + user.sim_serial_number, { user: user })
      .then(function(user) {
        defer.resolve(user);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }
  }
}])

