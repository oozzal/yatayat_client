module('yatayat.factories')

.factory('Post', ['BaseModel', 'Raven', '$q', function(BaseModel, Raven, $q) {

  return angular.extend(BaseModel, {
    all: function() {
      var defer = $q.defer();
      var data = [];

      Raven.get('posts')
      .then(function(posts) {
        angular.forEach(posts, function(post) {
          data.push(BaseModel.build(post));
        });
        defer.resolve(data);
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    get: function(id) {
      var defer = $q.defer();

      Raven.get('posts/' + id)
      .then(function(post) {
        defer.resolve(BaseModel.build(post));
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    create: function(options) {
      var defer = $q.defer();

      Raven.post('posts', { post: options })
      .then(function(post) {
        if(post.id) {
          defer.resolve(post);
        } else {
          defer.reject();
        }
      }, function() {
        defer.reject();
      });

      return defer.promise;
    },

    like: function(post, user) {
      var defer = $q.defer();

      Raven.post('posts/like/', {id: post.id, sim_serial_number: user.sim_serial_number})
      .then(function(data) {
        defer.resolve(data);
      });

      return defer.promise;
    },

    length: function() {
      return this.body.length;
    }
  }); // end angular.extend..
}])

