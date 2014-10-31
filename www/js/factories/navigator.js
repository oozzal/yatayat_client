module('yatayat.factories')

.factory('Navigator', ['$state', '$ionicViewService', function($state, $ionicViewService) {
  return {
    go: function(state, clearHistory) {
      $state.go(state).then(function() {
        clearHistory && $ionicViewService.clearHistory();
      });
    }
  }
}])

