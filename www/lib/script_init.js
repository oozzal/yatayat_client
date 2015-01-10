// /**
//  * All the scripts to be loaded
//  **/
var controllers = [
  'js/controllers/app_controller.js',
  'js/controllers/post_controller.js',
  'js/controllers/posts_controller.js',
  'js/controllers/report_controller.js',
  'js/controllers/search_controller.js',
  'js/controllers/start_controller.js'
];

var factories = [
  'js/factories/base_model.js',
  'js/factories/loading.js',
  'js/factories/modal.js',
  'js/factories/navigator.js',
  'js/factories/post.js',
  'js/factories/raven.js',
  'js/factories/sim.js',
  'js/factories/user.js',
  'js/factories/validator.js'
];

var others = ['js/app.js'];

var requires = controllers
                .concat(factories)
                .concat(others);

$script(requires, function() {
  angular.bootstrap(document, ['yatayat']);
});

