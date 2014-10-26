module('yatayat.factories')

.factory('User', ['Raven', '$q', 'Sim', function(Raven, $q, Sim) {
  return {
    checkRegistration: function() {
      var defer = $q.defer();
      Sim.getDetails()
      .then(function(result) {
        Raven.get('users/' + result.simSerialNumber)
        .then(function(user) {
          user.id && defer.resolve(user);
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

      Raven.post('users', {
        user: reg_info
      })
      .then(function() {
        defer.resolve();
      });
      return defer.promise;
    }
  }
}])

