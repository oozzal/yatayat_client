module('yatayat.factories')

.factory('Loading', ['$ionicLoading', function($ionicLoading) {
  return {
    show: function() {
      $ionicLoading.show({template: "<img src='img/spinner.gif'>"});
    },

    hide: function() {
      $ionicLoading.hide();
    }
  }
}])

