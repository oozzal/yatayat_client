module('yatayat.factories')

.factory('Loading', ['$ionicLoading', function($ionicLoading) {
  return {
    show: function() {
      $ionicLoading.show({template: "<i class='icon ion-loading-a'></i>"});
    },

    hide: function() {
      $ionicLoading.hide();
    }
  }
}])

