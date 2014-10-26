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

.run(function($ionicPlatform, $cordovaSplashscreen) {
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
})
.config(function($stateProvider, $urlRouterProvider) {
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

})
.config(['$httpProvider', function ($httpProvider) {
  // $http.post doesn't send data fix
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  // Reset headers to avoid OPTIONS request (aka preflight)
  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};
}])

