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

