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

