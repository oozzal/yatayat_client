ngModule('yatayat.factories')

.factory('User', ['BaseModel', 'Raven', '$q', 'Sim', 'LocalStorage', function(BaseModel, Raven, $q, Sim, LocalStorage) {
  return {
    checkRegistration: function() {
      var defer = $q.defer();
      var user = LocalStorage.getObject('user');
      if(user.sim_serial_number) {
        defer.resolve(user);
      } else {
        Sim.getDetails()
        .then(function(result) {
          Raven.get('users/' + result.simSerialNumber)
          .then(function(user) {
            if(user && user.id) {
              defer.resolve(user);
              //this.storeLocally(user);
            } else {
              defer.reject();
            }
          }, function() {
            defer.reject();
          });
        });
      }
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
          if(user && user.id) {
            defer.resolve(user);
            //this.storeLocally(user);
          } else {
            defer.reject();
          }
      }, function() {
        defer.reject();
      });

      return defer.promise;
    }, // end register

    getDetails: function(userId) {
      var defer = $q.defer();

      Raven.get('users/' + userId + '/details')
      .then(function(user) {
        defer.resolve(user);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    update: function(user) {
      var defer = $q.defer();

      // Don't send existing id for update request
      delete user.id;

      Raven.post('users/' + user.sim_serial_number, { user: user })
      .then(function(user) {
        defer.resolve(user);
        //this.storeLocally(user);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    storeLocally: function(user) {
      // LocalStorage.setObject('user', user);
    },

    isAdmin: function() {
      return this.role == 'admin' || this.role == 'super_admin';
    },

    isSuperAdmin: function() {
      return this.role == 'super_admin';
    },

    niceUsername: function() {
      return this.username || 'Anonymous';
    },

    niceRole: function() {
      if(this.role == 'admin') {
        return 'Admin';
      } else if(this.role == 'super_admin') {
        return 'Super Admin';
      } else {
        return 'User';
      }
    }
  } // end return
}])

