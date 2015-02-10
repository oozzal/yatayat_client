ngModule('yatayat.factories')

.factory('Loading', ['$ionicLoading', function($ionicLoading) {
  return {
    show: function() {
      $ionicLoading.show({template: "<i class='icon ion-loading-a'></i>"});
    },

    hide: function() {
      $ionicLoading.hide();
    },

    showWithOptions: function(options) {
      $ionicLoading.show(options);
    }
  }
}])

.factory('UiHelper', [
          '$cordovaToast', 'Loading', '$ionicPopup', '$q',
  function($cordovaToast,   Loading,   $ionicPopup,   $q) {

  return {
    showToast: function(msg, duration, position) {
      duration = duration || 3000;
      position = position || 'bottom';
      if(window.cordova) {
        duration = duration > 1000 ? 'long' : 'short';
        $cordovaToast.show(message, duration, position);
      } else {
        Loading.showWithOptions({ template: msg, noBackdrop: true, duration: duration });
      }
    },

    confirm: function(title, template) {
      var defer = $q.defer();

      $ionicPopup.confirm({
        title: title || 'Confirm',
        template: template || 'Are you sure?'
      }).then(function(res) {
        if(res) defer.resolve();
        else defer.reject();
      });

      return defer.promise;
    }
  };
}])

.factory('Settings', ['LocalStorage', function(LocalStorage) {
  return {
    all: function() {
      return { userLocation: this.userLocation(), pushNotification: this.pushNotification() };
    },

    set: function(key, value) {
      LocalStorage.set(key, value);
    },

    setMultiple: function(obj) {
      for(key in obj) {
        obj.hasOwnProperty(key) && this.set(key, obj[key]);
      }
    },

    userRegistered: function() {
      return LocalStorage.get('user_registered');
    },

    userLocation: function() {
      return LocalStorage.get('user_location');
    },

    pushNotification: function() {
      return LocalStorage.get('push_notification');
    }
  };
}])

.factory('LocalStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('Router', [
          '$q', '$state', '$ionicHistory',
  function($q,   $state,   $ionicHistory) {

  return {
    go: function(state, clearHistory, reload) {
      var defer = $q.defer();
      $state.go(state, {}, {reload: !!reload}).then(function() {
        clearHistory && $ionicHistory.clearHistory();
        defer.resolve();
      });
      return defer.promise;
    }
  }
}])

.factory('Modal', ['$ionicModal', '$q', function($ionicModal, $q) {
  return {
    /**
     * Setup a modal for any controller
     * @params:
     * $scope [Object] the controller's scope object
     * templateUrl [String] the path to the modal template
     **/
    setup: function($scope, templateUrl) {
      var defer = $q.defer();

      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        defer.resolve();
      });

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.showModal = function() {
        $scope.modal.show();
      };

      return defer.promise;
    }
  }
}])

.factory('Validator', [function() {
  return {
    isValidPhone: function(number) {
      var phoneRegEx = /^\d{10}$/;
      return number.match(phoneRegEx);
    }
  }
}])

.factory('ActionSheet', ['$ionicActionSheet', function($ionicActionSheet) {

  return {
   show: function() {

     // Show the action sheet
     $ionicActionSheet.show({
       buttons: [
         { text: '<b>Share</b> This' },
         { text: 'Move' }
       ],
       // destructiveText: 'Delete',
       titleText: msg,
       cancelText: 'Back',
       cancel: function() {
          // add cancel code..
       },
       buttonClicked: function(index) {
         return true;
       }
     });

   }
 }
}])

