module('yatayat.factories')

.factory('Validator', [function() {
  return {
    isValidPhone: function(number) {
      var phoneRegEx = /^\d{10}$/;
      return number.match(phoneRegEx);
    }
  }
}])

