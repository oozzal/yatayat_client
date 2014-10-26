function module(name) {
  try {
    return angular.module(name)
  } catch(err) {
    return angular.module(name, [])
  }
}

