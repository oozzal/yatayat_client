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
angular.module('yatayat', ['ionic', 'ngCordova', 'uiGmapgoogle-maps', 'yatayat.factories', 'yatayat.controllers'])

.run(['$ionicPlatform', '$rootScope', 'Loading', 'User', 'UiHelper', 'Router', 'LocalStorage', function($ionicPlatform,  $rootScope, Loading, User, UiHelper, Router, LocalStorage) {
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

    $rootScope.$on('loading:show', function() {
      Loading.show();
    });

    $rootScope.$on('loading:hide', function() {
      Loading.hide();
    });

    $rootScope.$on('broadcast:message', function(event, message) {
      UiHelper.showToast(message);
    });

    // Always get the user and save in rootScope
    User.checkRegistration()
    .then(function(user) {
      $rootScope.user = user;
      User.registerAtGcm();
      Router.go('app.reports', {clearHistory: true})
      .then(function() {
        UiHelper.showToast('Welcome back!');
      });
    });

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            // $rootScope.user must be available here
            $rootScope.user.device_registration_id = notification.regid;
            User.update($rootScope.user);
            LocalStorage.set('yatayat:device_registration_id', notification.regid)
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          // alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          switch(notification.type) {
            case 'RoleChanged':
              Router.go('app.profile')
              .then(function() {
                UiHelper.showToast(notification.message, 5000);
              })
            break;
            case 'NewReport':
              Router.go('app.report', {params: {reportId: notification.id}})
              .then(function() {
                UiHelper.showToast(notification.message, 5000);
              })
            break;
          }
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });


  });
}])

.config(['$httpProvider', function ($httpProvider) {
  // Reset headers to avoid OPTIONS request (aka preflight)
  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};
  // $httpProvider.defaults.headers.delete = {};

  // fix for $http.post not sending data
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
  // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  // Unified loading when http request made
  $httpProvider.interceptors.push(function($rootScope) {
   return {
     request: function(config) {
       $rootScope.$broadcast('loading:show');
       return config;
     },
     response: function(response) {
       $rootScope.$broadcast('loading:hide');
       return response;
     }
   }
  });
}])

.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB09h4QtoxL3alFV4JDzArJYDjoltix4r0',
    v: '3.17',
    // libraries: 'weather,geometry,visualization',
    // china: true
  });

}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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

    .state('app.reports', {
      url: '/reports',
      views: {
        'menuContent': {
          templateUrl: 'templates/reports/index.html',
          controller: 'ReportsCtrl'
        }
      },
      cache: false
    })

    .state('app.report', {
      url: '/reports/:reportId',
      views: {
        'menuContent': {
          templateUrl: 'templates/reports/show.html',
          controller: 'ReportCtrl'
        }
      }
    })

    .state('app.submit_report', {
      url: '/submit_report',
      views: {
        'menuContent': {
          templateUrl: 'templates/reports/submit.html',
          controller: 'ReportSubmitCtrl'
        }
      },
      cache: false
    })

    .state('app.edit_report', {
      url: '/edit_report/:reportId',
      views: {
        'menuContent': {
          templateUrl: 'templates/reports/edit.html',
          controller: 'ReportEditCtrl'
        }
      },
      cache: false
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'UserCtrl'
        }
      },
      cache: false
    })

    .state('app.user_details', {
      url: '/user_details/:userId',
      views: {
        'menuContent': {
          templateUrl: 'templates/user_details.html',
          controller: 'UserDetailsCtrl'
        }
      },
      cache: false
    })

}])

