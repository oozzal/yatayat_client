ngModule('yatayat.factories')

.factory('Report', ['BaseModel', 'User', 'Raven', '$q', function(BaseModel, User, Raven, $q) {

  return angular.extend(BaseModel, {
    all: function() {
      var defer = $q.defer();
      var data = [];

      Raven.get('reports')
      .then(function(reports) {
        angular.forEach(reports, function(report) {
          // report.user = User.build(report.user);
          data.push(BaseModel.build(report));
        });
        defer.resolve(data);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    get: function(id) {
      var defer = $q.defer();

      Raven.get('reports/' + id)
      .then(function(report) {
        // report.user = User.build(report.user);
        defer.resolve(BaseModel.build(report));
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    create: function(options) {
      var defer = $q.defer();

      Raven.post('reports', { report: options })
      .then(function(report) {
        if(report.id) {
          defer.resolve(report);
        } else {
          defer.reject();
        }
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    like: function(report, user) {
      var defer = $q.defer();

      Raven.post('reports/like/', {id: report.id, sim_serial_number: user.sim_serial_number})
      .then(function(data) {
        defer.resolve(data);
      });

      return defer.promise;
    },

    dislike: function(report, user) {
      var defer = $q.defer();

      Raven.post('reports/dislike/', {id: report.id, sim_serial_number: user.sim_serial_number})
      .then(function(data) {
        defer.resolve(data);
      });

      return defer.promise;
    },

    destroy: function(id) {
      var defer = $q.defer();

      Raven.post('reports/destroy', {id: id})
      .then(function(data) {
        defer.resolve(data);
      }, function(error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    length: function() {
      return this.body.length;
    }
  }); // end angular.extend..
}])

