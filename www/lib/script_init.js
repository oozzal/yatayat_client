// /**
//  * All the scripts to be loaded
//  **/
var controllers = [
  'js/controllers/app_controller.js',
  'js/controllers/report_controller.js',
  'js/controllers/reports_controller.js',
  'js/controllers/start_controller.js',
  'js/controllers/submit_controller.js',
  'js/controllers/user_controller.js',
  'js/controllers/user_details_controller.js'
];

var factories = [
  'js/factories/base_model.js',
  'js/factories/factories.js',
  'js/factories/raven.js',
  'js/factories/report.js',
  'js/factories/sim.js',
  'js/factories/user.js'
];

var starters = ['js/init.js', 'js/app.js'];

var requires = starters
                .concat(controllers)
                .concat(factories);

$script(requires, function() {
  angular.bootstrap(document, ['yatayat']);
});

