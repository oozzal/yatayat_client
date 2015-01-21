ngModule('yatayat.factories')

.factory('Report', ['BaseModel', 'Raven', '$q', function(BaseModel, Raven, $q) {

  return angular.extend(BaseModel, {
    all: function() {
      var defer = $q.defer();
      var data = [];

      Raven.get('reports')
      .then(function(reports) {
        angular.forEach(reports, function(report) {
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
        defer.resolve(BaseModel.build(report));
      }, function() {
        defer.reject();
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
      }, function() {
        defer.reject();
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

    length: function() {
      return this.body.length;
    }
  }); // end angular.extend..
}])

