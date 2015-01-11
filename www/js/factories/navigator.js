module('yatayat.factories')

.factory('Navigator', ['$state', '$ionicHistory', function($state, $ionicHistory) {
  return {
    go: function(state, clearHistory) {
      $state.go(state).then(function() {
        clearHistory && $ionicHistory.clearHistory();
      });
    }
  }
}])

