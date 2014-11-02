module('yatayat.factories')

.factory('Sim', ['$q', function($q) {
  return {
    getDetails: function() {
      var defer = $q.defer();
      if(typeof cordova !== 'undefined') {
        var telephoneNumber = cordova.require('cordova/plugin/telephonenumber');
        telephoneNumber.get(function(result) {
          defer.resolve(result);
        });
      } else {
        defer.resolve({simSerialNumber: 'nanu', line1Number: '9808640957'});
      }
      return defer.promise;
    }
  }
}])

