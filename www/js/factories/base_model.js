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

