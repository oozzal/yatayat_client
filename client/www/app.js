// Yatayat
/**
 * @author: koirala.sadixa@gmail.com
 * @team: yatayat
 * Copyright 2014, @sadixananu
 **/
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'yatayat' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'yatayat.controllers' is found in controllers.js
angular.module('yatayat', ['ionic', 'ngCordova', 'yatayat.factories', 'yatayat.controllers'])

.run(["$ionicPlatform", "$cordovaSplashscreen", function($ionicPlatform, $cordovaSplashscreen) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    window.cordova && setTimeout(function() {
      $cordovaSplashscreen.hide();
    }, 2000);
  });
}])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');

  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: 'templates/start.html',
      controller: 'StartCtrl'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.posts', {
      url: '/posts',
      views: {
        'menuContent' :{
          templateUrl: 'templates/posts.html',
          controller: 'PostsCtrl'
        }
      }
    })

    .state('app.post', {
      url: '/posts/:postId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/post.html',
          controller: 'PostCtrl'
        }
      }
    })

    .state('app.report', {
      url: '/report',
      views: {
        'menuContent' :{
          templateUrl: 'templates/report.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent' :{
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })

}])
.config(['$httpProvider', function ($httpProvider) {
  // $http.post doesn't send data fix
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  // Reset headers to avoid OPTIONS request (aka preflight)
  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};
}])


function module(name) {
  try {
    return angular.module(name)
  } catch(err) {
    return angular.module(name, [])
  }
}


module('yatayat.controllers')

.controller('AppCtrl', ['$scope', '$rootScope', 'Modal', '$timeout', function($scope, $rootScope, Modal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  Modal.setup($scope, 'templates/login.html');

  $scope.login = function() {
    $scope.showModal();
  }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.closeModal();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}])


module('yatayat.controllers')

.controller('PostCtrl', ['$scope', '$stateParams', 'Post', function($scope, $stateParams, Post) {
  $scope.post = {};

  Post.get($stateParams.postId, function(data) {
    $scope.post = data;
  });
}])


module('yatayat.controllers')

.controller('PostsCtrl', ['$scope', 'Post', function($scope, Post) {
  $scope.posts = [];

  Post.all(function(data) {
    $scope.posts = data;
  });

  $scope.likePost = function($index, $event) {
    $event.preventDefault();
  };

  $scope.editPost = function($index, $event) {
    $event.preventDefault();
  };
}])


module('yatayat.controllers')

.controller('ReportCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
}])


module('yatayat.controllers')

.controller('SearchCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
}])


module('yatayat.controllers')

.controller('StartCtrl',
  ['$scope', '$rootScope', 'User', 'Sim', 'Modal', 'Navigator', 'Loading', '$ionicPopup', 'Validator',
  function($scope, $rootScope, User, Sim, Modal, Navigator, Loading, $ionicPopup, Validator) {

  Modal.setup($scope, 'templates/tos.html');

  $scope.enterMain = function(simSerialNumber) {
    $rootScope.userId = simSerialNumber;
    Navigator.go('app.posts', true);
  };

  User.checkRegistration()
  .then(function(user) {
    $scope.enterMain(user.sim_serial_number);
  });

  $scope.registerWithCredentials = function(simSerialNumber, phoneNumber) {
    User.register(simSerialNumber, phoneNumber)
    .then(function() {
      $ionicPopup.alert({
        title: 'Success',
        template: simSerialNumber + ' registered successfully.'
      }).then(function() {
        $scope.enterMain(simSerialNumber);
      });
    });
  };

  $scope.register = function() {
    Sim.getDetails()
    .then(function(result) {
      $scope.registerWithCredentials(result.simSerialNumber, result.line1Number);
    });
  };
}])


module('yatayat.factories')

.factory('BaseModel', [function() {
  return {
    // extend angular factory object(model) with any 'model like' object(data)
    build: function(data) {
      var model = Object.create(this);
      angular.extend(model, data);
      return model;
    }
  }
}])


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


module('yatayat.factories')

.factory('Modal', ['$ionicModal', function($ionicModal) {
  return {
    /**
     * Setup a modal for any controller
     * @params:
     * $scope [Object] the controller's scope object
     * templateUrl [String] the path to the modal template
     **/
    setup: function($scope, templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.showModal = function() {
        $scope.modal.show();
      };
    }
  }
}])


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


module('yatayat.factories')

.factory('Post', ['BaseModel', 'Raven', function(BaseModel, Raven) {
  var posts = [
    { id: 1, title: 'Accident at Koteshwor', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 2, title: 'Road Block at Sallaghari', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  ];

  return angular.extend(BaseModel, {
    all: function(callback) {
      var data = [];
      angular.forEach(posts, function(post) {
        data.push(BaseModel.build(post));
      });
      callback(data);
    },

    get: function(id, callback) {
      var data = posts.filter(function(m) { return m.id === parseInt(id) })[0];
      callback(BaseModel.build(data));
    },

    descLength: function() {
      return this.description.length;
    }
  }); // end angular.extend..
}])


module('yatayat.factories')

.factory('Raven', ['$http', '$q', function($http, $q) {
  var baseUrl = 'http://192.168.1.2:3000/';
  return {
    get: function(path) {
      var defer = $q.defer();

      $http.get(baseUrl + path)
      .success(function(result) {
        defer.resolve(result);
      });

      return defer.promise;
    },

    post: function(path, data) {
      var defer = $q.defer();

      $http({
        url: baseUrl + path,
        method: 'POST',
        data: $.param(data),
      }).then(function() {
        defer.resolve();
      });

      return defer.promise;
    }
  }
}])


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
        defer.resolve({simSerialNumber: 'abcd'});
      }
      return defer.promise;
    }
  }
}])


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


module('yatayat.factories')

.factory('Validator', [function() {
  return {
    isValidPhone: function(number) {
      var phoneRegEx = /^\d{10}$/;
      return number.match(phoneRegEx);
    }
  }
}])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImluaXQuanMiLCJjb250cm9sbGVycy9hcHBfY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3Bvc3RfY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3Bvc3RzX2NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9yZXBvcnRfY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3NlYXJjaF9jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvc3RhcnRfY29udHJvbGxlci5qcyIsImZhY3Rvcmllcy9iYXNlX21vZGVsLmpzIiwiZmFjdG9yaWVzL2xvYWRpbmcuanMiLCJmYWN0b3JpZXMvbW9kYWwuanMiLCJmYWN0b3JpZXMvbmF2aWdhdG9yLmpzIiwiZmFjdG9yaWVzL3Bvc3QuanMiLCJmYWN0b3JpZXMvcmF2ZW4uanMiLCJmYWN0b3JpZXMvc2ltLmpzIiwiZmFjdG9yaWVzL3VzZXIuanMiLCJmYWN0b3JpZXMvdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBQSwyQ0FBQTtFQUNBO0lBQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtJQUNBO01BQ0E7TUFDQTtJQUNBOztJQUVBO01BQ0E7SUFDQTtFQUNBO0FBQ0EsQ0FBQSxDQUFBO0FBQ0EsUUFBQSx5Q0FBQTtFQUNBO0VBQ0E7O0VBRUE7SUFDQTtNQUNBO01BQ0E7TUFDQSxhQUFBLFNBQUE7SUFDQTs7SUFFQTtNQUNBO01BQ0E7TUFDQTtNQUNBLGFBQUEsT0FBQTtJQUNBOztJQUVBO01BQ0E7TUFDQTtRQUNBO1VBQ0E7VUFDQSxhQUFBLFNBQUE7UUFDQTtNQUNBO0lBQ0E7O0lBRUE7TUFDQTtNQUNBO1FBQ0E7VUFDQTtVQUNBLGFBQUEsUUFBQTtRQUNBO01BQ0E7SUFDQTs7SUFFQTtNQUNBO01BQ0E7UUFDQTtVQUNBO1VBQ0EsYUFBQSxVQUFBO1FBQ0E7TUFDQTtJQUNBOztJQUVBO01BQ0E7TUFDQTtRQUNBO1VBQ0E7VUFDQSxhQUFBLFVBQUE7UUFDQTtNQUNBO0lBQ0E7O0FBRUEsQ0FBQSxDQUFBO0FBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTs7O0FDakdBO0VBQ0E7SUFDQTtFQUNBO0lBQ0E7RUFDQTtBQUNBOzs7QUNOQTs7QUFFQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7SUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTtFQUNBOztFQUVBO0VBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7TUFDQTtJQUNBO0VBQ0E7QUFDQTs7O0FDM0JBOztBQUVBO0VBQ0E7O0VBRUE7SUFDQTtFQUNBO0FBQ0E7OztBQ1JBOztBQUVBO0VBQ0E7O0VBRUE7SUFDQTtFQUNBOztFQUVBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO0VBQ0E7QUFDQTs7O0FDaEJBOztBQUVBO0FBQ0E7OztBQ0hBOztBQUVBO0FBQ0E7OztBQ0hBOztBQUVBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtJQUNBO0lBQ0E7RUFDQTs7RUFFQTtFQUNBO0lBQ0E7RUFDQTs7RUFFQTtJQUNBO0lBQ0E7TUFDQTtRQUNBO1FBQ0E7TUFDQTtRQUNBO01BQ0E7SUFDQTtFQUNBOztFQUVBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBOzs7QUNwQ0E7O0FBRUE7RUFDQTtJQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7SUFDQTtFQUNBO0FBQ0E7OztBQ1hBOztBQUVBO0VBQ0E7SUFDQTtNQUNBO0lBQ0E7O0lBRUE7TUFDQTtJQUNBO0VBQ0E7QUFDQTs7O0FDWkE7O0FBRUE7RUFDQTtJQUNBO0tBQ0E7S0FDQTtLQUNBO0tBQ0E7S0FDQTtJQUNBO01BQ0E7UUFDQTtNQUNBO1FBQ0E7TUFDQTs7TUFFQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBOzs7QUMxQkE7O0FBRUE7RUFDQTtJQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBOzs7QUNWQTs7QUFFQTtFQUNBO0lBQ0E7SUFDQTtFQUNBOztFQUVBO0lBQ0E7TUFDQTtNQUNBO1FBQ0E7TUFDQTtNQUNBO0lBQ0E7O0lBRUE7TUFDQTtNQUNBO0lBQ0E7O0lBRUE7TUFDQTtJQUNBO0VBQ0E7QUFDQTs7O0FDMUJBOztBQUVBO0VBQ0E7RUFDQTtJQUNBO01BQ0E7O01BRUE7TUFDQTtRQUNBO01BQ0E7O01BRUE7SUFDQTs7SUFFQTtNQUNBOztNQUVBO1FBQ0E7UUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBOztNQUVBO0lBQ0E7RUFDQTtBQUNBOzs7QUM5QkE7O0FBRUE7RUFDQTtJQUNBO01BQ0E7TUFDQTtRQUNBO1FBQ0E7VUFDQTtRQUNBO01BQ0E7UUFDQTtNQUNBO01BQ0E7SUFDQTtFQUNBO0FBQ0E7OztBQ2pCQTs7QUFFQTtFQUNBO0lBQ0E7TUFDQTtNQUNBO01BQ0E7UUFDQTtRQUNBO1VBQ0E7UUFDQTtNQUNBO01BQ0E7SUFDQTs7SUFFQTtNQUNBOztNQUVBO01BQ0E7TUFDQTtRQUNBO01BQ0E7O01BRUE7UUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO01BQ0E7SUFDQTtFQUNBO0FBQ0E7OztBQ2xDQTs7QUFFQTtFQUNBO0lBQ0E7TUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFlhdGF5YXRcbi8qKlxuICogQGF1dGhvcjoga29pcmFsYS5zYWRpeGFAZ21haWwuY29tXG4gKiBAdGVhbTogeWF0YXlhdFxuICogQ29weXJpZ2h0IDIwMTQsIEBzYWRpeGFuYW51XG4gKiovXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3lhdGF5YXQnIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG4vLyAneWF0YXlhdC5jb250cm9sbGVycycgaXMgZm91bmQgaW4gY29udHJvbGxlcnMuanNcbmFuZ3VsYXIubW9kdWxlKCd5YXRheWF0JywgWydpb25pYycsICduZ0NvcmRvdmEnLCAneWF0YXlhdC5mYWN0b3JpZXMnLCAneWF0YXlhdC5jb250cm9sbGVycyddKVxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkY29yZG92YVNwbGFzaHNjcmVlbikge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuY29yZG92YSAmJiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJGNvcmRvdmFTcGxhc2hzY3JlZW4uaGlkZSgpO1xuICAgIH0sIDIwMDApO1xuICB9KTtcbn0pXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgLy8gaWYgbm9uZSBvZiB0aGUgYWJvdmUgc3RhdGVzIGFyZSBtYXRjaGVkLCB1c2UgdGhpcyBhcyB0aGUgZmFsbGJhY2tcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3N0YXJ0Jyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgdXJsOiAnL3N0YXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3N0YXJ0Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1N0YXJ0Q3RybCdcbiAgICB9KVxuXG4gICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICB1cmw6ICcvYXBwJyxcbiAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5wb3N0cycsIHtcbiAgICAgIHVybDogJy9wb3N0cycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWVudUNvbnRlbnQnIDp7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcG9zdHMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Bvc3RzQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5wb3N0Jywge1xuICAgICAgdXJsOiAnL3Bvc3RzLzpwb3N0SWQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21lbnVDb250ZW50JyA6e1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3Bvc3QuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Bvc3RDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnYXBwLnJlcG9ydCcsIHtcbiAgICAgIHVybDogJy9yZXBvcnQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21lbnVDb250ZW50JyA6e1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3JlcG9ydC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVwb3J0Q3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5zZWFyY2gnLCB7XG4gICAgICB1cmw6ICcvc2VhcmNoJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCcgOntcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9zZWFyY2guaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1NlYXJjaEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG59KVxuLmNvbmZpZyhbJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAvLyAkaHR0cC5wb3N0IGRvZXNuJ3Qgc2VuZCBkYXRhIGZpeFxuICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucG9zdFsnQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcblxuICAvLyBSZXNldCBoZWFkZXJzIHRvIGF2b2lkIE9QVElPTlMgcmVxdWVzdCAoYWthIHByZWZsaWdodClcbiAgLy8gJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbiA9IHt9O1xuICAvLyAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucG9zdCA9IHt9O1xuICAvLyAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMucHV0ID0ge307XG4gIC8vICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5wYXRjaCA9IHt9O1xufV0pXG5cbiIsImZ1bmN0aW9uIG1vZHVsZShuYW1lKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGFuZ3VsYXIubW9kdWxlKG5hbWUpXG4gIH0gY2F0Y2goZXJyKSB7XG4gICAgcmV0dXJuIGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtdKVxuICB9XG59XG5cbiIsIm1vZHVsZSgneWF0YXlhdC5jb250cm9sbGVycycpXG5cbi5jb250cm9sbGVyKCdBcHBDdHJsJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICdNb2RhbCcsICckdGltZW91dCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgTW9kYWwsICR0aW1lb3V0KSB7XG4gIC8vIEZvcm0gZGF0YSBmb3IgdGhlIGxvZ2luIG1vZGFsXG4gICRzY29wZS5sb2dpbkRhdGEgPSB7fTtcblxuICBNb2RhbC5zZXR1cCgkc2NvcGUsICd0ZW1wbGF0ZXMvbG9naW4uaHRtbCcpO1xuXG4gICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5zaG93TW9kYWwoKTtcbiAgfVxuXG4gIC8vIFRyaWdnZXJlZCBpbiB0aGUgbG9naW4gbW9kYWwgdG8gY2xvc2UgaXRcbiAgJHNjb3BlLmNsb3NlTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUuY2xvc2VNb2RhbCgpO1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gdGhlIGxvZ2luIGFjdGlvbiB3aGVuIHRoZSB1c2VyIHN1Ym1pdHMgdGhlIGxvZ2luIGZvcm1cbiAgJHNjb3BlLmRvTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnRG9pbmcgbG9naW4nLCAkc2NvcGUubG9naW5EYXRhKTtcblxuICAgIC8vIFNpbXVsYXRlIGEgbG9naW4gZGVsYXkuIFJlbW92ZSB0aGlzIGFuZCByZXBsYWNlIHdpdGggeW91ciBsb2dpblxuICAgIC8vIGNvZGUgaWYgdXNpbmcgYSBsb2dpbiBzeXN0ZW1cbiAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5jbG9zZUxvZ2luKCk7XG4gICAgfSwgMTAwMCk7XG4gIH07XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmNvbnRyb2xsZXJzJylcblxuLmNvbnRyb2xsZXIoJ1Bvc3RDdHJsJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ1Bvc3QnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgUG9zdCkge1xuICAkc2NvcGUucG9zdCA9IHt9O1xuXG4gIFBvc3QuZ2V0KCRzdGF0ZVBhcmFtcy5wb3N0SWQsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAkc2NvcGUucG9zdCA9IGRhdGE7XG4gIH0pO1xufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5jb250cm9sbGVycycpXG5cbi5jb250cm9sbGVyKCdQb3N0c0N0cmwnLCBbJyRzY29wZScsICdQb3N0JywgZnVuY3Rpb24oJHNjb3BlLCBQb3N0KSB7XG4gICRzY29wZS5wb3N0cyA9IFtdO1xuXG4gIFBvc3QuYWxsKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAkc2NvcGUucG9zdHMgPSBkYXRhO1xuICB9KTtcblxuICAkc2NvcGUubGlrZVBvc3QgPSBmdW5jdGlvbigkaW5kZXgsICRldmVudCkge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gICRzY29wZS5lZGl0UG9zdCA9IGZ1bmN0aW9uKCRpbmRleCwgJGV2ZW50KSB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmNvbnRyb2xsZXJzJylcblxuLmNvbnRyb2xsZXIoJ1JlcG9ydEN0cmwnLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcykge1xufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5jb250cm9sbGVycycpXG5cbi5jb250cm9sbGVyKCdTZWFyY2hDdHJsJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpIHtcbn1dKVxuXG4iLCJtb2R1bGUoJ3lhdGF5YXQuY29udHJvbGxlcnMnKVxuXG4uY29udHJvbGxlcignU3RhcnRDdHJsJyxcbiAgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICdVc2VyJywgJ1NpbScsICdNb2RhbCcsICdOYXZpZ2F0b3InLCAnTG9hZGluZycsICckaW9uaWNQb3B1cCcsICdWYWxpZGF0b3InLFxuICBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsIFVzZXIsIFNpbSwgTW9kYWwsIE5hdmlnYXRvciwgTG9hZGluZywgJGlvbmljUG9wdXAsIFZhbGlkYXRvcikge1xuXG4gIE1vZGFsLnNldHVwKCRzY29wZSwgJ3RlbXBsYXRlcy90b3MuaHRtbCcpO1xuXG4gICRzY29wZS5lbnRlck1haW4gPSBmdW5jdGlvbihzaW1TZXJpYWxOdW1iZXIpIHtcbiAgICAkcm9vdFNjb3BlLnVzZXJJZCA9IHNpbVNlcmlhbE51bWJlcjtcbiAgICBOYXZpZ2F0b3IuZ28oJ2FwcC5wb3N0cycsIHRydWUpO1xuICB9O1xuXG4gIFVzZXIuY2hlY2tSZWdpc3RyYXRpb24oKVxuICAudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgJHNjb3BlLmVudGVyTWFpbih1c2VyLnNpbV9zZXJpYWxfbnVtYmVyKTtcbiAgfSk7XG5cbiAgJHNjb3BlLnJlZ2lzdGVyV2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24oc2ltU2VyaWFsTnVtYmVyLCBwaG9uZU51bWJlcikge1xuICAgIFVzZXIucmVnaXN0ZXIoc2ltU2VyaWFsTnVtYmVyLCBwaG9uZU51bWJlcilcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICRpb25pY1BvcHVwLmFsZXJ0KHtcbiAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgdGVtcGxhdGU6IHNpbVNlcmlhbE51bWJlciArICcgcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkuJ1xuICAgICAgfSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmVudGVyTWFpbihzaW1TZXJpYWxOdW1iZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgU2ltLmdldERldGFpbHMoKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgJHNjb3BlLnJlZ2lzdGVyV2l0aENyZWRlbnRpYWxzKHJlc3VsdC5zaW1TZXJpYWxOdW1iZXIsIHJlc3VsdC5saW5lMU51bWJlcik7XG4gICAgfSk7XG4gIH07XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmZhY3RvcmllcycpXG5cbi5mYWN0b3J5KCdCYXNlTW9kZWwnLCBbZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgLy8gZXh0ZW5kIGFuZ3VsYXIgZmFjdG9yeSBvYmplY3QobW9kZWwpIHdpdGggYW55ICdtb2RlbCBsaWtlJyBvYmplY3QoZGF0YSlcbiAgICBidWlsZDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIG1vZGVsID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICAgIGFuZ3VsYXIuZXh0ZW5kKG1vZGVsLCBkYXRhKTtcbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9XG4gIH1cbn1dKVxuXG4iLCJtb2R1bGUoJ3lhdGF5YXQuZmFjdG9yaWVzJylcblxuLmZhY3RvcnkoJ0xvYWRpbmcnLCBbJyRpb25pY0xvYWRpbmcnLCBmdW5jdGlvbigkaW9uaWNMb2FkaW5nKSB7XG4gIHJldHVybiB7XG4gICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAkaW9uaWNMb2FkaW5nLnNob3coe3RlbXBsYXRlOiBcIjxpbWcgc3JjPSdpbWcvc3Bpbm5lci5naWYnPlwifSk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgJGlvbmljTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmZhY3RvcmllcycpXG5cbi5mYWN0b3J5KCdNb2RhbCcsIFsnJGlvbmljTW9kYWwnLCBmdW5jdGlvbigkaW9uaWNNb2RhbCkge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFNldHVwIGEgbW9kYWwgZm9yIGFueSBjb250cm9sbGVyXG4gICAgICogQHBhcmFtczpcbiAgICAgKiAkc2NvcGUgW09iamVjdF0gdGhlIGNvbnRyb2xsZXIncyBzY29wZSBvYmplY3RcbiAgICAgKiB0ZW1wbGF0ZVVybCBbU3RyaW5nXSB0aGUgcGF0aCB0byB0aGUgbW9kYWwgdGVtcGxhdGVcbiAgICAgKiovXG4gICAgc2V0dXA6IGZ1bmN0aW9uKCRzY29wZSwgdGVtcGxhdGVVcmwpIHtcbiAgICAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuICAgICAgICBzY29wZTogJHNjb3BlXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgICAgfSk7XG5cbiAgICAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuc2hvd01vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnTmF2aWdhdG9yJywgWyckc3RhdGUnLCAnJGlvbmljVmlld1NlcnZpY2UnLCBmdW5jdGlvbigkc3RhdGUsICRpb25pY1ZpZXdTZXJ2aWNlKSB7XG4gIHJldHVybiB7XG4gICAgZ286IGZ1bmN0aW9uKHN0YXRlLCBjbGVhckhpc3RvcnkpIHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJIaXN0b3J5ICYmICRpb25pY1ZpZXdTZXJ2aWNlLmNsZWFySGlzdG9yeSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmZhY3RvcmllcycpXG5cbi5mYWN0b3J5KCdQb3N0JywgWydCYXNlTW9kZWwnLCAnUmF2ZW4nLCBmdW5jdGlvbihCYXNlTW9kZWwsIFJhdmVuKSB7XG4gIHZhciBwb3N0cyA9IFtcbiAgICB7IGlkOiAxLCB0aXRsZTogJ0FjY2lkZW50IGF0IEtvdGVzaHdvcicsIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4nfSxcbiAgICB7IGlkOiAyLCB0aXRsZTogJ1JvYWQgQmxvY2sgYXQgU2FsbGFnaGFyaScsIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4nfSxcbiAgXTtcblxuICByZXR1cm4gYW5ndWxhci5leHRlbmQoQmFzZU1vZGVsLCB7XG4gICAgYWxsOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIGRhdGEgPSBbXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChwb3N0cywgZnVuY3Rpb24ocG9zdCkge1xuICAgICAgICBkYXRhLnB1c2goQmFzZU1vZGVsLmJ1aWxkKHBvc3QpKTtcbiAgICAgIH0pO1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24oaWQsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgZGF0YSA9IHBvc3RzLmZpbHRlcihmdW5jdGlvbihtKSB7IHJldHVybiBtLmlkID09PSBwYXJzZUludChpZCkgfSlbMF07XG4gICAgICBjYWxsYmFjayhCYXNlTW9kZWwuYnVpbGQoZGF0YSkpO1xuICAgIH0sXG5cbiAgICBkZXNjTGVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uLmxlbmd0aDtcbiAgICB9XG4gIH0pOyAvLyBlbmQgYW5ndWxhci5leHRlbmQuLlxufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnUmF2ZW4nLCBbJyRodHRwJywgJyRxJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XG4gIHZhciBiYXNlVXJsID0gJ2h0dHA6Ly8xOTIuMTY4LjEuMjozMDAwLyc7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAkaHR0cC5nZXQoYmFzZVVybCArIHBhdGgpXG4gICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH0sXG5cbiAgICBwb3N0OiBmdW5jdGlvbihwYXRoLCBkYXRhKSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAkaHR0cCh7XG4gICAgICAgIHVybDogYmFzZVVybCArIHBhdGgsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkLnBhcmFtKGRhdGEpLFxuICAgICAgfSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH1cbiAgfVxufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnU2ltJywgWyckcScsIGZ1bmN0aW9uKCRxKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0RGV0YWlsczogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgaWYodHlwZW9mIGNvcmRvdmEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciB0ZWxlcGhvbmVOdW1iZXIgPSBjb3Jkb3ZhLnJlcXVpcmUoJ2NvcmRvdmEvcGx1Z2luL3RlbGVwaG9uZW51bWJlcicpO1xuICAgICAgICB0ZWxlcGhvbmVOdW1iZXIuZ2V0KGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZlci5yZXNvbHZlKHtzaW1TZXJpYWxOdW1iZXI6ICdhYmNkJ30pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfVxuICB9XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmZhY3RvcmllcycpXG5cbi5mYWN0b3J5KCdVc2VyJywgWydSYXZlbicsICckcScsICdTaW0nLCBmdW5jdGlvbihSYXZlbiwgJHEsIFNpbSkge1xuICByZXR1cm4ge1xuICAgIGNoZWNrUmVnaXN0cmF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICBTaW0uZ2V0RGV0YWlscygpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgUmF2ZW4uZ2V0KCd1c2Vycy8nICsgcmVzdWx0LnNpbVNlcmlhbE51bWJlcilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgIHVzZXIuaWQgJiYgZGVmZXIucmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH0sXG5cbiAgICByZWdpc3RlcjogZnVuY3Rpb24oc2ltU2VyaWFsTnVtYmVyLCBwaG9uZU51bWJlcikge1xuICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgdmFyIHJlZ19pbmZvID0ge307XG4gICAgICByZWdfaW5mby5zaW1fc2VyaWFsX251bWJlciA9IHNpbVNlcmlhbE51bWJlcjtcbiAgICAgIGlmKHBob25lTnVtYmVyKSB7XG4gICAgICAgIHJlZ19pbmZvLnBob25lX251bWJlciA9IHBob25lTnVtYmVyO1xuICAgICAgfVxuXG4gICAgICBSYXZlbi5wb3N0KCd1c2VycycsIHtcbiAgICAgICAgdXNlcjogcmVnX2luZm9cbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG4gIH1cbn1dKVxuXG4iLCJtb2R1bGUoJ3lhdGF5YXQuZmFjdG9yaWVzJylcblxuLmZhY3RvcnkoJ1ZhbGlkYXRvcicsIFtmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBpc1ZhbGlkUGhvbmU6IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgdmFyIHBob25lUmVnRXggPSAvXlxcZHsxMH0kLztcbiAgICAgIHJldHVybiBudW1iZXIubWF0Y2gocGhvbmVSZWdFeCk7XG4gICAgfVxuICB9XG59XSlcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9