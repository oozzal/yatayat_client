function module(t){try{return angular.module(t)}catch(e){return angular.module(t,[])}}angular.module("yatayat",["ionic","ngCordova","yatayat.factories","yatayat.controllers"]).run(["$ionicPlatform","$cordovaSplashscreen",function(t,e){t.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault(),window.cordova&&setTimeout(function(){e.hide()},2e3)})}]).config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/start"),t.state("start",{url:"/start",templateUrl:"templates/start.html",controller:"StartCtrl"}).state("app",{url:"/app","abstract":!0,templateUrl:"templates/menu.html",controller:"AppCtrl"}).state("app.posts",{url:"/posts",views:{menuContent:{templateUrl:"templates/posts.html",controller:"PostsCtrl"}}}).state("app.post",{url:"/posts/:postId",views:{menuContent:{templateUrl:"templates/post.html",controller:"PostCtrl"}}}).state("app.report",{url:"/report",views:{menuContent:{templateUrl:"templates/report.html",controller:"ReportCtrl"}}}).state("app.search",{url:"/search",views:{menuContent:{templateUrl:"templates/search.html",controller:"SearchCtrl"}}})}]),module("yatayat.controllers").controller("AppCtrl",["$scope","Modal","$timeout",function(t,e,o){t.loginData={},e.setup(t,"templates/login.html"),t.login=function(){t.showModal()},t.closeLogin=function(){t.closeModal()},t.doLogin=function(){console.log("Doing login",t.loginData),o(function(){t.closeLogin()},1e3)}}]),module("yatayat.controllers").controller("PostCtrl",["$scope","$stateParams","Post",function(t,e,o){t.post={},o.get(e.postId,function(e){t.post=e})}]),module("yatayat.controllers").controller("PostsCtrl",["$scope","Post",function(t,e){t.posts=[],e.all(function(e){t.posts=e}),t.likePost=function(t,e){e.preventDefault()},t.editPost=function(t,e){e.preventDefault()}}]),module("yatayat.controllers").controller("ReportCtrl",["$scope","$stateParams",function(){}]),module("yatayat.controllers").controller("SearchCtrl",["$scope","$stateParams",function(){}]),module("yatayat.controllers").controller("StartCtrl",["$scope","Navigator","Modal","User","$ionicLoading","$ionicPopup","Validator",function(t,e,o,r,n,a,i){o.setup(t,"templates/tos.html"),t.enterMain=function(){e.go("app.posts",!0)},r.checkRegistration().then(function(){}),t.registerWith=function(e){return i.isValidPhone(e)?(n.show({template:"Registering "+t.phoneNumber+"..."}),void r.register(t.phoneNumber).then(function(){n.hide(),a.alert({title:"Success",template:t.phoneNumber+" registered successfully."}).then(function(){t.enterMain()})})):void a.alert({title:"Invalid phone",template:"Please enter a valid phone number"})},t.register=function(){if("undefined"!=typeof cordova){var e=cordova.require("cordova/plugin/telephonenumber");e.get(function(e){e.length>0?(t.phoneNumber=e,t.registerWith(t.phoneNumber)):a.prompt({title:"Register",template:"Pease enter you phone number to register with us",inputType:"number",inputPlaceholder:"Phone Number"}).then(function(e){t.phoneNumber=e,t.registerWith(t.phoneNumber)})},function(t){alert("error = "+t.code)})}else t.phoneNumber="9808640958",t.registerWith(t.phoneNumber)}}]),module("yatayat.factories").factory("BaseModel",[function(){return{build:function(t){var e=Object.create(this);return angular.extend(e,t),e}}}]),module("yatayat.factories").factory("Modal",["$ionicModal",function(t){return{setup:function(e,o){t.fromTemplateUrl(o,{scope:e}).then(function(t){e.modal=t}),e.closeModal=function(){e.modal.hide()},e.showModal=function(){e.modal.show()}}}}]),module("yatayat.factories").factory("Navigator",["$state","$ionicViewService",function(t,e){return{go:function(o,r){t.go(o).then(function(){r&&e.clearHistory()})}}}]),module("yatayat.factories").factory("Post",["BaseModel","Raven",function(t){var e=[{id:1,title:"Accident at Koteshwor",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},{id:2,title:"Road Block at Sallaghari",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}];return angular.extend(t,{all:function(o){var r=[];angular.forEach(e,function(e){r.push(t.build(e))}),o(r)},get:function(o,r){var n=e.filter(function(t){return t.id===parseInt(o)})[0];r(t.build(n))},descLength:function(){return this.description.length}})}]),module("yatayat.factories").factory("Raven",["$timeout","$q",function(t,e){return{get:function(){var o=e.defer();return t(function(){o.resolve()},1e3),o.promise},post:function(){var o=e.defer();return t(function(){o.resolve()},1e3),o.promise}}}]),module("yatayat.factories").factory("User",["Raven","$q",function(t,e){return{checkRegistration:function(){var o=e.defer();return t.get("users/:id").then(function(){o.resolve()}),o.promise},register:function(o){var r=e.defer();return t.post("users/new",{id:o}).then(function(){r.resolve()}),r.promise}}}]),module("yatayat.factories").factory("Validator",[function(){return{isValidPhone:function(t){var e=/^\d{10}$/;return t.match(e)}}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJhcHAuanMiLCJjb250cm9sbGVycy9hcHBfY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3Bvc3RfY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3Bvc3RzX2NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9yZXBvcnRfY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL3NlYXJjaF9jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvc3RhcnRfY29udHJvbGxlci5qcyIsImZhY3Rvcmllcy9iYXNlX21vZGVsLmpzIiwiZmFjdG9yaWVzL21vZGFsLmpzIiwiZmFjdG9yaWVzL25hdmlnYXRvci5qcyIsImZhY3Rvcmllcy9wb3N0LmpzIiwiZmFjdG9yaWVzL3JhdmVuLmpzIiwiZmFjdG9yaWVzL3VzZXIuanMiLCJmYWN0b3JpZXMvdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLFFBQUEsUUFBQSxHQUNBLElBQ0EsTUFBQSxTQUFBLE9BQUEsR0FDQSxNQUFBLEdBQ0EsTUFBQSxTQUFBLE9BQUEsT0NLQSxRQUFBLE9BQUEsV0FBQSxRQUFBLFlBQUEsb0JBQUEsd0JBRUEsS0FBQSxpQkFBQSx1QkFBQSxTQUFBLEVBQUEsR0FDQSxFQUFBLE1BQUEsV0FHQSxPQUFBLFNBQUEsT0FBQSxRQUFBLFFBQUEsVUFDQSxRQUFBLFFBQUEsU0FBQSwwQkFBQSxHQUVBLE9BQUEsV0FFQSxVQUFBLGVBR0EsT0FBQSxTQUFBLFdBQUEsV0FDQSxFQUFBLFFBQ0EsVUFJQSxRQUFBLGlCQUFBLHFCQUFBLFNBQUEsRUFBQSxHQUVBLEVBQUEsVUFBQSxVQUVBLEVBQ0EsTUFBQSxTQUNBLElBQUEsU0FDQSxZQUFBLHVCQUNBLFdBQUEsY0FHQSxNQUFBLE9BQ0EsSUFBQSxPQUNBLFlBQUEsRUFDQSxZQUFBLHNCQUNBLFdBQUEsWUFHQSxNQUFBLGFBQ0EsSUFBQSxTQUNBLE9BQ0EsYUFDQSxZQUFBLHVCQUNBLFdBQUEsZ0JBS0EsTUFBQSxZQUNBLElBQUEsaUJBQ0EsT0FDQSxhQUNBLFlBQUEsc0JBQ0EsV0FBQSxlQUtBLE1BQUEsY0FDQSxJQUFBLFVBQ0EsT0FDQSxhQUNBLFlBQUEsd0JBQ0EsV0FBQSxpQkFLQSxNQUFBLGNBQ0EsSUFBQSxVQUNBLE9BQ0EsYUFDQSxZQUFBLHdCQUNBLFdBQUEsb0JDbkZBLE9BQUEsdUJBRUEsV0FBQSxXQUFBLFNBQUEsUUFBQSxXQUFBLFNBQUEsRUFBQSxFQUFBLEdBRUEsRUFBQSxhQUVBLEVBQUEsTUFBQSxFQUFBLHdCQUVBLEVBQUEsTUFBQSxXQUNBLEVBQUEsYUFJQSxFQUFBLFdBQUEsV0FDQSxFQUFBLGNBSUEsRUFBQSxRQUFBLFdBQ0EsUUFBQSxJQUFBLGNBQUEsRUFBQSxXQUlBLEVBQUEsV0FDQSxFQUFBLGNBQ0EsU0N6QkEsT0FBQSx1QkFFQSxXQUFBLFlBQUEsU0FBQSxlQUFBLE9BQUEsU0FBQSxFQUFBLEVBQUEsR0FDQSxFQUFBLFFBRUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxTQUFBLEdBQ0EsRUFBQSxLQUFBLE9DTkEsT0FBQSx1QkFFQSxXQUFBLGFBQUEsU0FBQSxPQUFBLFNBQUEsRUFBQSxHQUNBLEVBQUEsU0FFQSxFQUFBLElBQUEsU0FBQSxHQUNBLEVBQUEsTUFBQSxJQUdBLEVBQUEsU0FBQSxTQUFBLEVBQUEsR0FDQSxFQUFBLGtCQUdBLEVBQUEsU0FBQSxTQUFBLEVBQUEsR0FDQSxFQUFBLHFCQ2RBLE9BQUEsdUJBRUEsV0FBQSxjQUFBLFNBQUEsZUFBQSxlQ0ZBLE9BQUEsdUJBRUEsV0FBQSxjQUFBLFNBQUEsZUFBQSxlQ0ZBLE9BQUEsdUJBRUEsV0FBQSxhQUNBLFNBQUEsWUFBQSxRQUFBLE9BQUEsZ0JBQUEsY0FBQSxZQUNBLFNBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsR0FFQSxFQUFBLE1BQUEsRUFBQSxzQkFFQSxFQUFBLFVBQUEsV0FDQSxFQUFBLEdBQUEsYUFBQSxJQUlBLEVBQUEsb0JBQ0EsS0FBQSxjQUlBLEVBQUEsYUFBQSxTQUFBLEdBQ0EsTUFBQSxHQUFBLGFBQUEsSUFJQSxFQUFBLE1BQUEsU0FBQSxlQUFBLEVBQUEsWUFBQSxZQUNBLEdBQUEsU0FBQSxFQUFBLGFBQ0EsS0FBQSxXQUNBLEVBQUEsT0FDQSxFQUFBLE9BQ0EsTUFBQSxVQUNBLFNBQUEsRUFBQSxZQUFBLDhCQUNBLEtBQUEsV0FDQSxFQUFBLHFCQVhBLEdBQUEsT0FBQSxNQUFBLGdCQUFBLFNBQUEsdUNBZ0JBLEVBQUEsU0FBQSxXQUNBLEdBQUEsbUJBQUEsU0FBQSxDQUNBLEdBQUEsR0FBQSxRQUFBLFFBQUEsaUNBQ0EsR0FBQSxJQUFBLFNBQUEsR0FDQSxFQUFBLE9BQUEsR0FDQSxFQUFBLFlBQUEsRUFDQSxFQUFBLGFBQUEsRUFBQSxjQUVBLEVBQUEsUUFDQSxNQUFBLFdBQ0EsU0FBQSxtREFDQSxVQUFBLFNBQ0EsaUJBQUEsaUJBQ0EsS0FBQSxTQUFBLEdBQ0EsRUFBQSxZQUFBLEVBQ0EsRUFBQSxhQUFBLEVBQUEsZ0JBR0EsU0FBQSxHQUNBLE1BQUEsV0FBQSxFQUFBLFlBR0EsR0FBQSxZQUFBLGFBQ0EsRUFBQSxhQUFBLEVBQUEsaUJDM0RBLE9BQUEscUJBRUEsUUFBQSxhQUFBLFdBQ0EsT0FFQSxNQUFBLFNBQUEsR0FDQSxHQUFBLEdBQUEsT0FBQSxPQUFBLEtBRUEsT0FEQSxTQUFBLE9BQUEsRUFBQSxHQUNBLE9DUkEsT0FBQSxxQkFFQSxRQUFBLFNBQUEsY0FBQSxTQUFBLEdBQ0EsT0FPQSxNQUFBLFNBQUEsRUFBQSxHQUNBLEVBQUEsZ0JBQUEsR0FDQSxNQUFBLElBQ0EsS0FBQSxTQUFBLEdBQ0EsRUFBQSxNQUFBLElBR0EsRUFBQSxXQUFBLFdBQ0EsRUFBQSxNQUFBLFFBR0EsRUFBQSxVQUFBLFdBQ0EsRUFBQSxNQUFBLGFDdEJBLE9BQUEscUJBRUEsUUFBQSxhQUFBLFNBQUEsb0JBQUEsU0FBQSxFQUFBLEdBQ0EsT0FDQSxHQUFBLFNBQUEsRUFBQSxHQUNBLEVBQUEsR0FBQSxHQUFBLEtBQUEsV0FDQSxHQUFBLEVBQUEsc0JDTkEsT0FBQSxxQkFFQSxRQUFBLFFBQUEsWUFBQSxRQUFBLFNBQUEsR0FDQSxHQUFBLEtBQ0EsR0FBQSxFQUFBLE1BQUEsd0JBQUEsWUFBQSxtY0FDQSxHQUFBLEVBQUEsTUFBQSwyQkFBQSxZQUFBLGtjQUdBLE9BQUEsU0FBQSxPQUFBLEdBQ0EsSUFBQSxTQUFBLEdBQ0EsR0FBQSxLQUNBLFNBQUEsUUFBQSxFQUFBLFNBQUEsR0FDQSxFQUFBLEtBQUEsRUFBQSxNQUFBLE1BRUEsRUFBQSxJQUdBLElBQUEsU0FBQSxFQUFBLEdBQ0EsR0FBQSxHQUFBLEVBQUEsT0FBQSxTQUFBLEdBQUEsTUFBQSxHQUFBLEtBQUEsU0FBQSxLQUFBLEVBQ0EsR0FBQSxFQUFBLE1BQUEsS0FHQSxXQUFBLFdBQ0EsTUFBQSxNQUFBLFlBQUEsYUN2QkEsT0FBQSxxQkFFQSxRQUFBLFNBQUEsV0FBQSxLQUFBLFNBQUEsRUFBQSxHQUVBLE9BQ0EsSUFBQSxXQU1BLEdBQUEsR0FBQSxFQUFBLE9BSUEsT0FIQSxHQUFBLFdBQ0EsRUFBQSxXQUNBLEtBQ0EsRUFBQSxTQUdBLEtBQUEsV0FLQSxHQUFBLEdBQUEsRUFBQSxPQUlBLE9BSEEsR0FBQSxXQUNBLEVBQUEsV0FDQSxLQUNBLEVBQUEsYUMzQkEsT0FBQSxxQkFFQSxRQUFBLFFBQUEsUUFBQSxLQUFBLFNBQUEsRUFBQSxHQUNBLE9BQ0Esa0JBQUEsV0FFQSxHQUFBLEdBQUEsRUFBQSxPQUtBLE9BSkEsR0FBQSxJQUFBLGFBQ0EsS0FBQSxXQUNBLEVBQUEsWUFFQSxFQUFBLFNBR0EsU0FBQSxTQUFBLEdBQ0EsR0FBQSxHQUFBLEVBQUEsT0FLQSxPQUpBLEdBQUEsS0FBQSxhQUFBLEdBQUEsSUFDQSxLQUFBLFdBQ0EsRUFBQSxZQUVBLEVBQUEsYUNwQkEsT0FBQSxxQkFFQSxRQUFBLGFBQUEsV0FDQSxPQUNBLGFBQUEsU0FBQSxHQUNBLEdBQUEsR0FBQSxVQUNBLE9BQUEsR0FBQSxNQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gbW9kdWxlKG5hbWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYW5ndWxhci5tb2R1bGUobmFtZSlcbiAgfSBjYXRjaChlcnIpIHtcbiAgICByZXR1cm4gYW5ndWxhci5tb2R1bGUobmFtZSwgW10pXG4gIH1cbn1cblxuLy8gLyoqXG4vLyAgKiBBbGwgdGhlIHNjcmlwdHMgdG8gYmUgbG9hZGVkXG4vLyAgKiovXG4vLyB2YXIgY29udHJvbGxlcnMgPSBbXG4vLyAgICdqcy9jb250cm9sbGVycy9zdGFydF9jb250cm9sbGVyLmpzJyxcbi8vICAgJ2pzL2NvbnRyb2xsZXJzL2FwcF9jb250cm9sbGVyLmpzJyxcbi8vICAgJ2pzL2NvbnRyb2xsZXJzL3Bvc3RzX2NvbnRyb2xsZXIuanMnLFxuLy8gICAnanMvY29udHJvbGxlcnMvcG9zdF9jb250cm9sbGVyLmpzJyxcbi8vICAgJ2pzL2NvbnRyb2xsZXJzL3JlcG9ydF9jb250cm9sbGVyLmpzJyxcbi8vICAgJ2pzL2NvbnRyb2xsZXJzL3NlYXJjaF9jb250cm9sbGVyLmpzJ1xuLy8gXTtcblxuLy8gdmFyIGZhY3RvcmllcyA9IFtcbi8vICAgJ2pzL2ZhY3Rvcmllcy9iYXNlX21vZGVsLmpzJyxcbi8vICAgJ2pzL2ZhY3Rvcmllcy9yYXZlbi5qcycsXG4vLyAgICdqcy9mYWN0b3JpZXMvdXNlci5qcycsXG4vLyAgICdqcy9mYWN0b3JpZXMvcG9zdC5qcycsXG4vLyAgICdqcy9mYWN0b3JpZXMvbW9kYWwuanMnLFxuLy8gICAnanMvZmFjdG9yaWVzL25hdmlnYXRvci5qcycsXG4vLyAgICdqcy9mYWN0b3JpZXMvdmFsaWRhdG9yLmpzJ1xuLy8gXTtcblxuLy8gdmFyIG90aGVycyA9IFsnanMvYXBwLmpzJ107XG5cbi8vIHZhciByZXF1aXJlcyA9IGNvbnRyb2xsZXJzXG4vLyAgICAgICAgICAgICAgICAgLmNvbmNhdChmYWN0b3JpZXMpXG4vLyAgICAgICAgICAgICAgICAgLmNvbmNhdChvdGhlcnMpO1xuXG4vLyAkc2NyaXB0KHJlcXVpcmVzLCBmdW5jdGlvbigpIHtcbi8vICAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsneWF0YXlhdCddKTtcbi8vIH0pO1xuXG4iLCIvLyBZYXRheWF0XG4vKipcbiAqIEBhdXRob3I6IGtvaXJhbGEuc2FkaXhhQGdtYWlsLmNvbVxuICogQHRlYW06IHlhdGF5YXRcbiAqIENvcHlyaWdodCAyMDE0LCBAc2FkaXhhbmFudVxuICoqL1xuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICd5YXRheWF0JyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuLy8gJ3lhdGF5YXQuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG5hbmd1bGFyLm1vZHVsZSgneWF0YXlhdCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ3lhdGF5YXQuZmFjdG9yaWVzJywgJ3lhdGF5YXQuY29udHJvbGxlcnMnXSlcblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJGNvcmRvdmFTcGxhc2hzY3JlZW4pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAvLyBvcmcuYXBhY2hlLmNvcmRvdmEuc3RhdHVzYmFyIHJlcXVpcmVkXG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgd2luZG93LmNvcmRvdmEgJiYgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICRjb3Jkb3ZhU3BsYXNoc2NyZWVuLmhpZGUoKTtcbiAgICB9LCAyMDAwKTtcbiAgfSk7XG59KVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgLy8gaWYgbm9uZSBvZiB0aGUgYWJvdmUgc3RhdGVzIGFyZSBtYXRjaGVkLCB1c2UgdGhpcyBhcyB0aGUgZmFsbGJhY2tcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3N0YXJ0Jyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgdXJsOiAnL3N0YXJ0JyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3N0YXJ0Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1N0YXJ0Q3RybCdcbiAgICB9KVxuXG4gICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICB1cmw6ICcvYXBwJyxcbiAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5wb3N0cycsIHtcbiAgICAgIHVybDogJy9wb3N0cycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWVudUNvbnRlbnQnIDp7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcG9zdHMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Bvc3RzQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5wb3N0Jywge1xuICAgICAgdXJsOiAnL3Bvc3RzLzpwb3N0SWQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21lbnVDb250ZW50JyA6e1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3Bvc3QuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Bvc3RDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnYXBwLnJlcG9ydCcsIHtcbiAgICAgIHVybDogJy9yZXBvcnQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21lbnVDb250ZW50JyA6e1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3JlcG9ydC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVwb3J0Q3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5zZWFyY2gnLCB7XG4gICAgICB1cmw6ICcvc2VhcmNoJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdtZW51Q29udGVudCcgOntcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9zZWFyY2guaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1NlYXJjaEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG59KTtcblxuIiwibW9kdWxlKCd5YXRheWF0LmNvbnRyb2xsZXJzJylcblxuLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBbJyRzY29wZScsICdNb2RhbCcsICckdGltZW91dCcsIGZ1bmN0aW9uKCRzY29wZSwgTW9kYWwsICR0aW1lb3V0KSB7XG4gIC8vIEZvcm0gZGF0YSBmb3IgdGhlIGxvZ2luIG1vZGFsXG4gICRzY29wZS5sb2dpbkRhdGEgPSB7fTtcblxuICBNb2RhbC5zZXR1cCgkc2NvcGUsICd0ZW1wbGF0ZXMvbG9naW4uaHRtbCcpO1xuXG4gICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICRzY29wZS5zaG93TW9kYWwoKTtcbiAgfVxuXG4gIC8vIFRyaWdnZXJlZCBpbiB0aGUgbG9naW4gbW9kYWwgdG8gY2xvc2UgaXRcbiAgJHNjb3BlLmNsb3NlTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUuY2xvc2VNb2RhbCgpO1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gdGhlIGxvZ2luIGFjdGlvbiB3aGVuIHRoZSB1c2VyIHN1Ym1pdHMgdGhlIGxvZ2luIGZvcm1cbiAgJHNjb3BlLmRvTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnRG9pbmcgbG9naW4nLCAkc2NvcGUubG9naW5EYXRhKTtcblxuICAgIC8vIFNpbXVsYXRlIGEgbG9naW4gZGVsYXkuIFJlbW92ZSB0aGlzIGFuZCByZXBsYWNlIHdpdGggeW91ciBsb2dpblxuICAgIC8vIGNvZGUgaWYgdXNpbmcgYSBsb2dpbiBzeXN0ZW1cbiAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5jbG9zZUxvZ2luKCk7XG4gICAgfSwgMTAwMCk7XG4gIH07XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmNvbnRyb2xsZXJzJylcblxuLmNvbnRyb2xsZXIoJ1Bvc3RDdHJsJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ1Bvc3QnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgUG9zdCkge1xuICAkc2NvcGUucG9zdCA9IHt9O1xuXG4gIFBvc3QuZ2V0KCRzdGF0ZVBhcmFtcy5wb3N0SWQsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAkc2NvcGUucG9zdCA9IGRhdGE7XG4gIH0pO1xufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5jb250cm9sbGVycycpXG5cbi5jb250cm9sbGVyKCdQb3N0c0N0cmwnLCBbJyRzY29wZScsICdQb3N0JywgZnVuY3Rpb24oJHNjb3BlLCBQb3N0KSB7XG4gICRzY29wZS5wb3N0cyA9IFtdO1xuXG4gIFBvc3QuYWxsKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAkc2NvcGUucG9zdHMgPSBkYXRhO1xuICB9KTtcblxuICAkc2NvcGUubGlrZVBvc3QgPSBmdW5jdGlvbigkaW5kZXgsICRldmVudCkge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gICRzY29wZS5lZGl0UG9zdCA9IGZ1bmN0aW9uKCRpbmRleCwgJGV2ZW50KSB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmNvbnRyb2xsZXJzJylcblxuLmNvbnRyb2xsZXIoJ1JlcG9ydEN0cmwnLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcykge1xufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5jb250cm9sbGVycycpXG5cbi5jb250cm9sbGVyKCdTZWFyY2hDdHJsJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpIHtcbn1dKVxuXG4iLCJtb2R1bGUoJ3lhdGF5YXQuY29udHJvbGxlcnMnKVxuXG4uY29udHJvbGxlcignU3RhcnRDdHJsJyxcbiAgWyckc2NvcGUnLCAnTmF2aWdhdG9yJywgJ01vZGFsJywgJ1VzZXInLCAnJGlvbmljTG9hZGluZycsICckaW9uaWNQb3B1cCcsICdWYWxpZGF0b3InLFxuICBmdW5jdGlvbigkc2NvcGUsIE5hdmlnYXRvciwgTW9kYWwsIFVzZXIsICRpb25pY0xvYWRpbmcsICRpb25pY1BvcHVwLCBWYWxpZGF0b3IpIHtcblxuICBNb2RhbC5zZXR1cCgkc2NvcGUsICd0ZW1wbGF0ZXMvdG9zLmh0bWwnKTtcblxuICAkc2NvcGUuZW50ZXJNYWluID0gZnVuY3Rpb24oKSB7XG4gICAgTmF2aWdhdG9yLmdvKCdhcHAucG9zdHMnLCB0cnVlKTtcbiAgfTtcblxuXG4gIFVzZXIuY2hlY2tSZWdpc3RyYXRpb24oKVxuICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAvLyAkc2NvcGUuZW50ZXJNYWluKCk7XG4gIH0pO1xuXG4gICRzY29wZS5yZWdpc3RlcldpdGggPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgICBpZighVmFsaWRhdG9yLmlzVmFsaWRQaG9uZShudW1iZXIpKSB7XG4gICAgICAkaW9uaWNQb3B1cC5hbGVydCh7dGl0bGU6ICdJbnZhbGlkIHBob25lJywgdGVtcGxhdGU6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwaG9uZSBudW1iZXInfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICRpb25pY0xvYWRpbmcuc2hvdyh7dGVtcGxhdGU6ICdSZWdpc3RlcmluZyAnICsgJHNjb3BlLnBob25lTnVtYmVyICsgJy4uLid9KTtcbiAgICBVc2VyLnJlZ2lzdGVyKCRzY29wZS5waG9uZU51bWJlcilcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICRpb25pY0xvYWRpbmcuaGlkZSgpO1xuICAgICAgJGlvbmljUG9wdXAuYWxlcnQoe1xuICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICB0ZW1wbGF0ZTogJHNjb3BlLnBob25lTnVtYmVyICsgJyByZWdpc3RlcmVkIHN1Y2Nlc3NmdWxseS4nXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuZW50ZXJNYWluKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZih0eXBlb2YgY29yZG92YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciB0ZWxlcGhvbmVOdW1iZXIgPSBjb3Jkb3ZhLnJlcXVpcmUoJ2NvcmRvdmEvcGx1Z2luL3RlbGVwaG9uZW51bWJlcicpO1xuICAgICAgdGVsZXBob25lTnVtYmVyLmdldChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkc2NvcGUucGhvbmVOdW1iZXIgPSByZXN1bHQ7XG4gICAgICAgICAgJHNjb3BlLnJlZ2lzdGVyV2l0aCgkc2NvcGUucGhvbmVOdW1iZXIpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzaW0gcHJvdmlkZXIgZG9lc24ndCBzdXBwb3J0IGdldHRpbmcgcGhvbmUgbnVtYmVyIHZpYSB0ZWxlcGhvbmVtYW5hZ2VyIGFwaVxuICAgICAgICAgICRpb25pY1BvcHVwLnByb21wdCh7XG4gICAgICAgICAgICB0aXRsZTogJ1JlZ2lzdGVyJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnUGVhc2UgZW50ZXIgeW91IHBob25lIG51bWJlciB0byByZWdpc3RlciB3aXRoIHVzJyxcbiAgICAgICAgICAgIGlucHV0VHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiAnUGhvbmUgTnVtYmVyJ1xuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgICAgICAgICAkc2NvcGUucGhvbmVOdW1iZXIgPSBudW1iZXI7XG4gICAgICAgICAgICAkc2NvcGUucmVnaXN0ZXJXaXRoKCRzY29wZS5waG9uZU51bWJlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGFsZXJ0KCdlcnJvciA9ICcgKyBlcnJvci5jb2RlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkc2NvcGUucGhvbmVOdW1iZXIgPSAnOTgwODY0MDk1OCc7XG4gICAgICAkc2NvcGUucmVnaXN0ZXJXaXRoKCRzY29wZS5waG9uZU51bWJlcik7XG4gICAgfVxuICB9O1xufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnQmFzZU1vZGVsJywgW2Z1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIC8vIGV4dGVuZCBhbmd1bGFyIGZhY3Rvcnkgb2JqZWN0KG1vZGVsKSB3aXRoIGFueSAnbW9kZWwgbGlrZScgb2JqZWN0KGRhdGEpXG4gICAgYnVpbGQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBtb2RlbCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgICBhbmd1bGFyLmV4dGVuZChtb2RlbCwgZGF0YSk7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuICB9XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmZhY3RvcmllcycpXG5cbi5mYWN0b3J5KCdNb2RhbCcsIFsnJGlvbmljTW9kYWwnLCBmdW5jdGlvbigkaW9uaWNNb2RhbCkge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFNldHVwIGEgbW9kYWwgZm9yIGFueSBjb250cm9sbGVyXG4gICAgICogQHBhcmFtczpcbiAgICAgKiAkc2NvcGUgW09iamVjdF0gdGhlIGNvbnRyb2xsZXIncyBzY29wZSBvYmplY3RcbiAgICAgKiB0ZW1wbGF0ZVVybCBbU3RyaW5nXSB0aGUgcGF0aCB0byB0aGUgbW9kYWwgdGVtcGxhdGVcbiAgICAgKiovXG4gICAgc2V0dXA6IGZ1bmN0aW9uKCRzY29wZSwgdGVtcGxhdGVVcmwpIHtcbiAgICAgICRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuICAgICAgICBzY29wZTogJHNjb3BlXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICAgICAgfSk7XG5cbiAgICAgICRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5oaWRlKCk7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuc2hvd01vZGFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5tb2RhbC5zaG93KCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnTmF2aWdhdG9yJywgWyckc3RhdGUnLCAnJGlvbmljVmlld1NlcnZpY2UnLCBmdW5jdGlvbigkc3RhdGUsICRpb25pY1ZpZXdTZXJ2aWNlKSB7XG4gIHJldHVybiB7XG4gICAgZ286IGZ1bmN0aW9uKHN0YXRlLCBjbGVhckhpc3RvcnkpIHtcbiAgICAgICRzdGF0ZS5nbyhzdGF0ZSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJIaXN0b3J5ICYmICRpb25pY1ZpZXdTZXJ2aWNlLmNsZWFySGlzdG9yeSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XSlcblxuIiwibW9kdWxlKCd5YXRheWF0LmZhY3RvcmllcycpXG5cbi5mYWN0b3J5KCdQb3N0JywgWydCYXNlTW9kZWwnLCAnUmF2ZW4nLCBmdW5jdGlvbihCYXNlTW9kZWwsIFJhdmVuKSB7XG4gIHZhciBwb3N0cyA9IFtcbiAgICB7IGlkOiAxLCB0aXRsZTogJ0FjY2lkZW50IGF0IEtvdGVzaHdvcicsIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4nfSxcbiAgICB7IGlkOiAyLCB0aXRsZTogJ1JvYWQgQmxvY2sgYXQgU2FsbGFnaGFyaScsIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4nfSxcbiAgXTtcblxuICByZXR1cm4gYW5ndWxhci5leHRlbmQoQmFzZU1vZGVsLCB7XG4gICAgYWxsOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIGRhdGEgPSBbXTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChwb3N0cywgZnVuY3Rpb24ocG9zdCkge1xuICAgICAgICBkYXRhLnB1c2goQmFzZU1vZGVsLmJ1aWxkKHBvc3QpKTtcbiAgICAgIH0pO1xuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24oaWQsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgZGF0YSA9IHBvc3RzLmZpbHRlcihmdW5jdGlvbihtKSB7IHJldHVybiBtLmlkID09PSBwYXJzZUludChpZCkgfSlbMF07XG4gICAgICBjYWxsYmFjayhCYXNlTW9kZWwuYnVpbGQoZGF0YSkpO1xuICAgIH0sXG5cbiAgICBkZXNjTGVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uLmxlbmd0aDtcbiAgICB9XG4gIH0pOyAvLyBlbmQgYW5ndWxhci5leHRlbmQuLlxufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnUmF2ZW4nLCBbJyR0aW1lb3V0JywgJyRxJywgZnVuY3Rpb24oJHRpbWVvdXQsICRxKSB7XG4gIHZhciBiYXNlVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nO1xuICByZXR1cm4ge1xuICAgIGdldDogZnVuY3Rpb24ocGF0aCwgY2FsbGJhY2spIHtcbiAgICAgIC8qKlxuICAgICAgICogJGh0dHAuZ2V0KGJhc2VVcmwgKyBwYXRoKVxuICAgICAgICogLnN1Y2Nlc3MoZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgKiovXG4gICAgICAvLyBjYWxsYmFjay5jYWxsKCk7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICAgIH0sIDEwMDApO1xuICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfSxcblxuICAgIHBvc3Q6IGZ1bmN0aW9uKHBhdGgsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAvKipcbiAgICAgICAqICRodHRwLnBvc3QoYmFzZVVybCArIHBhdGgsIGRhdGEpXG4gICAgICAgKiAuc3VjY2VzcyhmdW5jdGlvbigpIHt9KTtcbiAgICAgICAqKi9cbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG4gIH1cbn1dKVxuXG4iLCJtb2R1bGUoJ3lhdGF5YXQuZmFjdG9yaWVzJylcblxuLmZhY3RvcnkoJ1VzZXInLCBbJ1JhdmVuJywgJyRxJywgZnVuY3Rpb24oUmF2ZW4sICRxKSB7XG4gIHJldHVybiB7XG4gICAgY2hlY2tSZWdpc3RyYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gdmFyIHVzZXJJZCA9IFBob25lLm51bWJlcigpO1xuICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcbiAgICAgIFJhdmVuLmdldCgndXNlcnMvOmlkJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH0sXG5cbiAgICByZWdpc3RlcjogZnVuY3Rpb24ocGhvbmVOdW1iZXIpIHtcbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICBSYXZlbi5wb3N0KCd1c2Vycy9uZXcnLCB7aWQ6IHBob25lTnVtYmVyfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH1cbiAgfVxufV0pXG5cbiIsIm1vZHVsZSgneWF0YXlhdC5mYWN0b3JpZXMnKVxuXG4uZmFjdG9yeSgnVmFsaWRhdG9yJywgW2Z1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGlzVmFsaWRQaG9uZTogZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgICB2YXIgcGhvbmVSZWdFeCA9IC9eXFxkezEwfSQvO1xuICAgICAgcmV0dXJuIG51bWJlci5tYXRjaChwaG9uZVJlZ0V4KTtcbiAgICB9XG4gIH1cbn1dKVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=