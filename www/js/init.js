function module(name, options) {
  try {
    return angular.module(name)
  } catch(err) {
    return angular.module(name, options || [])
  }
}

