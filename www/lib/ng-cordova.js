
angular.module('ngCordova', [
  'ngCordova.plugins'
]);
angular.module('ngCordova.plugins', [	 'device',	 'appAvailability',	 'deviceOrientation',	 'ga',	 'network',	 'file',	 'capture',	 'keyboard',	 'dialog',	 'm',	 'qlite',	 'toast',	 'push',	 'plashscreen',	 'camera',	 'deviceMotion',	 'pinnerDialog',	 'barcodeScanner',	 'globalization',	 'ocialSharing',	 'vibration',	 'geolocation',	 'pinDialog',	 'contact',	 'flashlight',	 'module',	 'localNotification',	 'tatusbar',	 'bluetoothSerial']);//#### Begin Individual Plugin Code####// install   :     cordova plugin add org.apache.cordova.device
// link      :     https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

angular.module('ngCordova.plugins.device', [])

  .factory('$cordovaDevice', [function () {

    return {
      getDevice: function () {
        return device;
      },

      getCordova: function () {
        return device.cordova;
      },

      getModel: function () {
        return device.model;
      },

      // Warning: device.name is deprecated as of version 2.3.0. Use device.model instead.
      getName: function () {
        return device.name;
      },

      getPlatform: function () {
        return device.platform;
      },

      getUUID: function () {
        return device.uuid;
      },

      getVersion: function () {
        return device.version;
      }
    }
  }]);
// install  :     cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
// link     :     https://github.com/ohh2ahh/AppAvailability

angular.module('ngCordova.plugins.appAvailability', [])

.factory('$cordovaAppAvailability', ['$q', function ($q) {

  return {
    check: function(urlScheme) {
      var q = $q.defer();

      appAvailability.check(urlScheme, function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);
// install   :     cordova plugin add org.apache.cordova.device-orientation
// link      :     https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceOrientation', [])

  .factory('$cordovaDeviceOrientation', ['$q', function ($q) {

    return {
      getCurrentHeading: function () {
        var q = $q.defer();

        navigator.compass.getCurrentHeading(function (heading) {
          q.resolve(heading);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchHeading: function (options) {
        var q = $q.defer();

        var watchId = navigator.compass.watchHeading(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return {
          watchId: watchId,
          promise: q.promise
        }
      },

      clearWatch: function (watchID) {
        navigator.compass.clearWatch(watchID);
      }
    }
  }]);
// install   :     cordova plugin add https://github.com/phonegap-build/GAPlugin.git
// link      :     https://github.com/phonegap-build/GAPlugin

angular.module('ngCordova.plugins.ga', [])

  .factory('$cordovaGA', ['$q', '$window', function ($q, $window) {

    return {
      init: function (id, mingap) {
        var q = $q.defer();
        mingap = (mingap >= 0) ? mingap : 10;
        $window.plugins.gaPlugin.init(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          id, mingap);
        return q.promise;
      },

      trackEvent: function (success, fail, category, eventAction, eventLabel, eventValue) {
        var q = $q.defer();
        $window.plugins.gaPlugin.trackEvent(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          category, eventAction, eventLabel, eventValue);
        return q.promise;
      },

      trackPage: function (success, fail, pageURL) {
        var q = $q.defer();
        $window.plugins.gaPlugin.trackPage(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          pageURL);
        return q.promise;
      },

      setVariable: function (success, fail, index, value) {
        var q = $q.defer();
        $window.plugins.gaPlugin.setVariable(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          index, value);
        return q.promise;
      },

      exit: function (success, fail) {
        var q = $q.defer();
        $window.plugins.gaPlugin.exit(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          });
        return q.promise;
      }
    };
  }]);
// install   :      cordova plugin add org.apache.cordova.network-information
// link      :      https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md

angular.module('ngCordova.plugins.network', [])

  .factory('$cordovaNetwork', [function () {

    return {

      getNetwork: function () {
        return navigator.connection.type;
      },

      isOnline: function () {
        var networkState = navigator.connection.type;
        return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
      },

      isOffline: function () {
        var networkState = navigator.connection.type;
        return networkState === Connection.UNKNOWN || networkState === Connection.NONE;
      },

      watchNetwork: function () {
        // function for watching online / offline
      }
    }
  }]);
// install   :     cordova plugin add org.apache.cordova.file
// link      :     https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md

// TODO: add functionality to define storage size in the getFilesystem() -> requestFileSystem() method
// TODO: add documentation for FileError types
// TODO: add abort() option to downloadFile and uploadFile methods.
// TODO: add support for downloadFile and uploadFile options. (or detailed documentation) -> for fileKey, fileName, mimeType, headers
// TODO: add support for onprogress property

angular.module('ngCordova.plugins.file', [])

//Filesystem (checkDir, createDir, checkFile, creatFile, removeFile, writeFile, readFile)
  .factory('$cordovaFile', ['$q', '$window', '$log', function ($q, $window, $log) {

    return {
      checkDir: function (dir) {
        return getDirectory(dir, {create: false});
      },

      createDir: function (dir, replaceBOOL) {
        return getDirectory(dir, {create: true, exclusive: replaceBOOL});
      },

      listDir: function (filePath) {
        var q = $q.defer();

        getDirectory(filePath, {create: false})
        .then(function (parent) {
          var reader = parent.createReader();
          reader.readEntries(
            function (entries) {
              q.resolve(entries);
            },
            function () {
              q.reject('DIR_READ_ERROR : ' + filePath);
            });
        }, function () {
          q.reject('DIR_NOT_FOUND : ' + filePath);
        });

        return q.promise;
      },

      checkFile: function (filePath) {
        // Backward compatibility for previous function checkFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        return getFileEntry(filePath, {create: false});
      },

      createFile: function (filePath, replaceBOOL) {
        // Backward compatibility for previous function createFile(filepath replaceBOOL)
        if (arguments.length == 3) {
          filePath = '/' + filePath + '/' + arguments[1];
          replaceBOOL = arguments[2];
        }

        return getFileEntry(filePath, {create: true, exclusive: replaceBOOL});
      },

      removeFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function removeFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFileEntry(filePath, {create: false})
        .then(function (fileEntry) {
          fileEntry.remove(q.resolve, q.reject);
        }, q.reject);

        return q.promise;
      },

      // options is a dict with possible keys :
      // - append : true/false (if true, append data on EOF)
      writeFile: function (filePath, data, options) {
        var q = $q.defer();

        getFileWriter(filePath, {create: true})
        .then(function (fileWriter) {
          if (options['append'] === true) {
            // Start write position at EOF.
            fileWriter.seek(fileWriter.length);
          }
          fileWriter.onwriteend = function (evt) {
            if (this.error) 
              q.reject(this.error);
            else
              q.resolve(evt);
          };
          fileWriter.write(data);
        }, q.reject);

        return q.promise;
      },

      readFile: function (filePath) {  /// now deprecated in new ng-cordova version
        $log.log('readFile is now deprecated as of v0.1.4-alpha, use readAsText instead');
        return this.readAsText(filePath);
      },

      readAsText: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false})
        .then(function(file) {
          getPromisedFileReader(q).readAsText(file);
        }, q.reject);

        return q.promise;
      },


      readAsDataURL: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false})
        .then(function(file) {
          getPromisedFileReader(q).readAsDataURL(file);
        }, q.reject);

        return q.promise;
      },

      readAsBinaryString: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false})
        .then(function(file) {
          getPromisedFileReader(q).readAsBinaryString(file);
        }, q.reject);

        return q.promise;
      },

      readAsArrayBuffer: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false})
        .then(function(file) {
          getPromisedFileReader(q).readAsArrayBuffer(file);
        }, q.reject);

        return q.promise;
      },

      readFileMetadata: function (filePath) {
        return getFile(filePath, {create: false});
      },

      readFileAbsolute: function (filePath) {
        var q = $q.defer();
        getAbsoluteFile(filePath)
        .then(function(file) {
          getPromisedFileReader(q).readAsText(file);
        }, q.reject);
        return q.promise;
      },

      readFileMetadataAbsolute: function (filePath) {
        return getAbsoluteFile(filePath);
      },

      downloadFile: function (source, filePath, trustAllHosts, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(source);

        fileTransfer.onprogress = q.notify;
        fileTransfer.download(uri, filePath, q.resolve, q.reject, trustAllHosts, options);
        return q.promise;
      },

      uploadFile: function (server, filePath, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(server);

        fileTransfer.onprogress = q.notify;
        fileTransfer.upload(filePath, uri, q.resolve, q.reject, options);
        return q.promise;
      }

    };

    /*
     * Returns a new FileReader that will resolve the provided Deferred with
     * the result of the next method called on the FileReader, or reject it
     * if an error occurs while attempting to complete that operation.
     */
    function getPromisedFileReader(deferred) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (this.error)
          deferred.reject(this.error);
        else
          deferred.resolve(this.result);
      };
      return reader;
    }

    /*
     * Returns a promise that will be resolved with the requested File object
     * or rejected if an error occurs attempting to retreive it.
     */
    function getFile(path, options) {
      var q = $q.defer();
      getFileEntry(path, options)
      .then(function(fileEntry) {
        fileEntry.file(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /* 
     * Returns a promise that will either be resolved with a FileWriter bound to the file identified
     * in the provided path or rejected if an error occurs while attempting to initialize
     * the writer.
     */
    function getFileWriter(path, options) {
      var q = $q.defer();
      getFileEntry(path, options)
      .then(function(fileEntry) {
        fileEntry.createWriter(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the FileEntry instance that corresponds
     * to the provided path or rejected if an error occurs while attempting to retrieve the
     * FileEntry.
     */
    function getFileEntry(path, options) {
      var q = $q.defer();
      getFilesystem().then(
        function (filesystem) {
          filesystem.root.getFile(path, options, q.resolve, q.reject);
        }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the File object associated with the requested 
     * absolute path, or rejected if an error occurs while trying to initialize that File object.
     */
    function getAbsoluteFile(path) {
      var q = $q.defer();
      $window.resolveLocalFileSystemURL(path,
        function (fileEntry) {
          fileEntry.file(q.resolve, q.reject);
        }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the Directory object associated with 
     * the requested directory or rejected if an error occurs while atempting to access that directory.
     */
    function getDirectory(dir, options) {
      var q = $q.defer();
      getFilesystem().then(
        function(filesystem) {
          filesystem.root.getDirectory(dir, options, q.resolve, q.resolve);
        }, q.reject);
      return q.promise;
    }

    /*
     * Returns a Promise that will be either resolved with the FileSystem object associated
     * with the device's persistent file system and with 1MB of storage reserved for it,
     * or rejected if an error occurs while trying to accessing the FileSystem
     */
    function getFilesystem() {
      var q = $q.defer();
      $window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, q.resolve, q.reject); 
      return q.promise;
    }
  }]);
// install   :    cordova plugin add org.apache.cordova.media-capture
// link      :    https://github.com/apache/cordova-plugin-media-capture/blob/master/doc/index.md

angular.module('ngCordova.plugins.capture', [])

  .factory('$cordovaCapture', ['$q', function ($q) {

    return {
      captureAudio: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureAudio(function (audioData) {
          q.resolve(audioData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      captureImage: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureImage(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      captureVideo: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureVideo(function (videoData) {
          q.resolve(videoData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }]);
// install   :      cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
// link      :      https://github.com/driftyco/ionic-plugins-keyboard

//TODO: add support for native.keyboardshow + native.keyboardhide

angular.module('ngCordova.plugins.keyboard', [])

  .factory('$cordovaKeyboard', [function () {

    return {
      hideAccessoryBar: function (bool) {
        return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(bool);
      },

      close: function () {
        return cordova.plugins.Keyboard.close();
      },

      disableScroll: function (bool) {
        return cordova.plugins.Keyboard.disableScroll(bool);
      },

      isVisible: function () {
        return cordova.plugins.Keyboard.isVisible
      }
    }
  }]);
// install   :     cordova plugin add org.apache.cordova.dialogs
// link      :     https://github.com/apache/cordova-plugin-dialogs/blob/master/doc/index.md

angular.module('ngCordova.plugins.dialogs', [])

  .factory('$cordovaDialogs', ['$q', '$window', function ($q, $window) {

    return {
      alert: function (message, title, buttonName) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          $window.alert(message);
          q.resolve();
        }
        else {
          navigator.notification.alert(message, function () {
            q.resolve();
          }, title, buttonName);
        }

        return q.promise;
      },

      confirm: function (message, title, buttonLabels) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          if ($window.confirm(message)) {
            q.resolve(1);
          }
          else {
            q.resolve(2);
          }
        }
        else {
          navigator.notification.confirm(message, function (buttonIndex) {
            q.resolve(buttonIndex);
          }, title, buttonLabels);
        }

        return q.promise;
      },

      prompt: function (message, title, buttonLabels, defaultText) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          var res = $window.prompt(message, defaultText);
          if (res != null) {
            q.resolve({input1 : res, buttonIndex : 1});
          }
          else {
            q.resolve({input1 : res, buttonIndex : 2});
          }
        }
        else {
          navigator.notification.prompt(message, function (result) {
            q.resolve(result);
          }, title, buttonLabels, defaultText);
        }
        return q.promise;
      },

      beep: function (times) {
        return navigator.notification.beep(times);
      }
    };
  }]);
// install   :      cordova plugin add https://github.com/aharris88/phonegap-sms-plugin.git
// link      :      https://github.com/aharris88/phonegap-sms-plugin

angular.module('ngCordova.plugins.sms', [])

  .factory('$cordovaSms', ['$q', function ($q) {

    return {
      send: function (number, message, intent) {
        var q = $q.defer();
        sms.send(number, message, intent, function (res) {
          q.resolve(res);
        }, function (err) {
          q.reject(err)
        });
        return q.promise;
      }
    }

  }]);// install   :      cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
// link      :      https://github.com/brodysoft/Cordova-SQLitePlugin/blob/master/README.md

angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', '$window', function ($q, $window) {

    return  {
      openDB: function (dbName, background) {

        if (typeof background === 'undefined') {
          background = 0;
        }

        return $window.sqlitePlugin.openDatabase({
          name: dbName,
          bgType: background
        });
      },

      execute: function (db, query, binding) {
        var q = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {
              q.resolve(result);
            },
            function (transaction, error) {
              q.reject(error);
            });
        });
        return q.promise;
      },

      insertCollection: function (db, query, bindings) {
        var q = $q.defer();
        var coll = bindings.slice(0); // clone collection
        
        db.transaction(function (tx) {
          (function insertOne() {
            var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
            try {
              tx.executeSql(query, record, function(tx, result) {
                if (coll.length === 0) {
                  q.resolve(result);
                } else {
                  insertOne();
                }
              },function (transaction, error) {
                q.reject(error);
                return;
              });
            } catch (exception) {
              q.reject(exception);
            }
          })();
        });
        return q.promise;
      },
      
      nestedExecute: function (db, query1, query2, binding1, binding2) {
        var q = $q.defer();

        db.transaction(function (tx) {
            tx.executeSql(query1, binding1, function (tx, result) {
              q.resolve(result);
              tx.executeSql(query2, binding2, function (tx, res) {
                q.resolve(res);
              })
            })
          },
          function (transaction, error) {
            q.reject(error);
          });

        return q.promise;
      },

      deleteDB: function (dbName) {
        var q = $q.defer();

        $window.sqlitePlugin.deleteDatabase(dbName, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error)
        });

        return q.promise;
      }
    }
  }]);
// install   :      cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin

angular.module('ngCordova.plugins.toast', [])

  .factory('$cordovaToast', ['$q', '$window', function ($q, $window) {

    return {
      showShortTop: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showShortCenter: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showShortBottom: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showLongTop: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showLongCenter: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      showLongBottom: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },


      show: function (message, duration, position) {
        var q = $q.defer();
        $window.plugins.toast.show(message, duration, position, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      }
    }

  }]);

// install   :      cordova plugin add https://github.com/phonegap-build/PushPlugin.git
// link      :      https://github.com/phonegap-build/PushPlugin

angular.module('ngCordova.plugins.push', [])
.factory('$cordovaPush', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
  return {
    onNotification: function (notification) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaPush:notificationReceived', notification);
      });
    },

    register: function (config) {
      var q = $q.defer();
      var injector;
      if (config !== undefined && config.ecb === undefined) {
        if (document.querySelector('[ng-app]') == null) {
          injector = "document.body";
        }
        else {
          injector = "document.querySelector('[ng-app]')";
        }
        config.ecb = "angular.element(" + injector + ").injector().get('$cordovaPush').onNotification";
      }

      $window.plugins.pushNotification.register(function (token) {
        q.resolve(token);
      }, function (error) {
        q.reject(error);
      }, config);

      return q.promise;
    },

    unregister: function (options) {
      var q = $q.defer();
      $window.plugins.pushNotification.unregister(function (result) {
        q.resolve(result);
      }, function (error) {
        q.reject(error);
      }, options);

      return q.promise;
    },

    // iOS only
    setBadgeNumber: function (number) {
      var q = $q.defer();
      $window.plugins.pushNotification.setApplicationIconBadgeNumber(function (result) {
        q.resolve(result);
      }, function (error) {
        q.reject(error);
      }, number);
      return q.promise;
    }
  };
}]);

// install   :      cordova plugin add org.apache.cordova.splashscreen
// link      :      https://github.com/apache/cordova-plugin-splashscreen/blob/master/doc/index.md
angular.module('ngCordova.plugins.splashscreen', [])

  .factory('$cordovaSplashscreen', [ function () {

    return {
      hide: function () {
        return navigator.splashscreen.hide();
      },

      show: function () {
        return navigator.splashscreen.show();
      }
    };

  }]);
// install   :   cordova plugin add org.apache.cordova.camera
// link      :   https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#orgapachecordovacamera

angular.module('ngCordova.plugins.camera', [])

  .factory('$cordovaCamera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        if (!navigator.camera) {
          q.resolve(null);
          return q.promise;
        }

        navigator.camera.getPicture(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      cleanup: function () {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    }
  }]);
// install   :     cordova plugin add org.apache.cordova.device-motion
// link      :     https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceMotion', [])

  .factory('$cordovaDeviceMotion', ['$q', function ($q) {

    return {
      getCurrentAcceleration: function () {
        var q = $q.defer();

        navigator.accelerometer.getCurrentAcceleration(function (result) {
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchAcceleration: function (options) {
        var q = $q.defer();

        var watchId = navigator.accelerometer.watchAcceleration(function (result) {
          // Do any magic you need
          //q.resolve(watchID);
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return {
          watchId: watchId,
          promise: q.promise
        }
      },

      clearWatch: function (watchID) {
        return navigator.accelerometer.clearWatch(watchID);
      }
    }
  }]);
// install   :       cordova plugin add https://github.com/Paldom/SpinnerDialog.git
// link      :       https://github.com/Paldom/SpinnerDialog

angular.module('ngCordova.plugins.spinnerDialog', [])

  .factory('$cordovaSpinnerDialog', ['$window', function ($window) {

    return {
      show: function (title, message) {
        return $window.plugins.spinnerDialog.show(title, message);
      },
      hide: function () {
        return $window.plugins.spinnerDialog.hide();
      }
    }

  }]);
// install  :    cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
// link     :    https://github.com/wildabeast/BarcodeScanner/#using-the-plugin

angular.module('ngCordova.plugins.barcodeScanner', [])

  .factory('$cordovaBarcodeScanner', ['$q', function ($q) {

    return {
      scan: function (options) {
        var q = $q.defer();

        cordova.plugins.barcodeScanner.scan(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      encode: function (type, data) {
        var q = $q.defer();

        /* TODO needs work for type:
         make the default:  BarcodeScanner.Encode.TEXT_TYPE
         other options: .EMAIL_TYPE, .PHONE_TYPE, .SMS_TYPE

         docs: https://github.com/wildabeast/BarcodeScanner#encoding-a-barcode
         */

        cordova.plugins.barcodeScanner.encode(type, data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    }
  }]);
// install   :      cordova plugin add org.apache.cordova.globalization
// link      :      https://github.com/apache/cordova-plugin-globalization/blob/master/doc/index.md

angular.module('ngCordova.plugins.globalization', [])

  .factory('$cordovaGlobalization', ['$q', function ($q) {

    return {
      getPreferredLanguage: function () {
        var q = $q.defer();

        navigator.globalization.getPreferredLanguage(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      getLocaleName: function () {
        var q = $q.defer();

        navigator.globalization.getLocaleName(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      getFirstDayOfWeek: function () {
        var q = $q.defer();

        navigator.globalization.getFirstDayOfWeek(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      // "date" parameter must be a JavaScript Date Object.
      dateToString: function (date, options) {
        var q = $q.defer();

        navigator.globalization.dateToString(
          date,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      stringToDate: function (dateString, options) {
        var q = $q.defer();

        navigator.globalization.stringToDate(
          dateString,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getDatePattern: function (options) {
        var q = $q.defer();

        navigator.globalization.getDatePattern(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getDateNames: function (options) {
        var q = $q.defer();

        navigator.globalization.getDateNames(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      // "date" parameter must be a JavaScript Date Object.
      isDayLightSavingsTime: function (date) {
        var q = $q.defer();

        navigator.globalization.isDayLightSavingsTime(
          date,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      numberToString: function (number, options) {
        var q = $q.defer();

        navigator.globalization.numberToString(
          number,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      stringToNumber: function (numberString, options) {
        var q = $q.defer();

        navigator.globalization.stringToNumber(
          numberString,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getNumberPattern: function (options) {
        var q = $q.defer();

        navigator.globalization.getNumberPattern(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getCurrencyPattern: function (currencyCode) {
        var q = $q.defer();

        navigator.globalization.getCurrencyPattern(
          currencyCode,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      }

    }

  }]);
// install   :      cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin

// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// NOTE: shareViaEmail -> TO, CC, BCC must be an array, Files can be either null, string or array
// TODO: add support for iPad
// TODO: detailed docs for each social sharing types (each social platform has different requirements)

angular.module('ngCordova.plugins.socialSharing', [])

  .factory('$cordovaSocialSharing', ['$q', '$window', function ($q, $window) {

    return {
      share: function (message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.share(message, subject, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaTwitter(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaWhatsApp(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaFacebook(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareViaEmail(
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareVia(via, message, subject, file, link,
          function (success) {
            q.resolve(success); // success
          },
          function (error) {
            q.reject(error); // error
          });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareVia(via, message, subject, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      }

    }
  }]);
// install   :      cordova plugin add org.apache.cordova.vibration
// link      :      https://github.com/apache/cordova-plugin-vibration/blob/master/doc/index.md

angular.module('ngCordova.plugins.vibration', [])

  .factory('$cordovaVibration', [function () {

    return {
      vibrate: function (times) {
        return navigator.notification.vibrate(times);
      },
      vibrateWithPattern: function (pattern, repeat) {
        return navigator.notification.vibrateWithPattern(pattern, repeat);
      },
      cancelVibration: function () {
        return navigator.notification.cancelVibration();
      }
    }
  }]);
// install   :     cordova plugin add org.apache.cordova.geolocation
// link      :     https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md

angular.module('ngCordova.plugins.geolocation', [])

  .factory('$cordovaGeolocation', ['$q', function ($q) {

    return {
      getCurrentPosition: function (options) {
        var q = $q.defer();

        navigator.geolocation.getCurrentPosition(function (result) {
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      watchPosition: function (options) {
        var q = $q.defer();

        var watchId = navigator.geolocation.watchPosition(function (result) {
          // Do any magic you need
          q.notify(result);

        }, function (err) {
          q.reject(err);
        }, options);

        return {
          watchId: watchId,
          promise: q.promise
        }
      },

      clearWatch: function (watchID) {
        return navigator.geolocation.clearWatch(watchID);
      }
    }
  }]);
// install   :      cordova plugin add https://github.com/Paldom/PinDialog.git
// link      :      https://github.com/Paldom/PinDialog

angular.module('ngCordova.plugins.pinDialog', [])

  .factory('$cordovaPinDialog', ['$q', '$window', function ($q, $window) {

    return {
      prompt: function (message, title, buttons) {
        var q = $q.defer();

        $window.plugins.pinDialog.prompt(message, function (res) {
          q.resolve(res);
        }, title, buttons);

        return q.promise;
      }
    }
  }]);
// install   :     cordova plugin add org.apache.cordova.contacts
// link      :     https://github.com/apache/cordova-plugin-contacts/blob/master/doc/index.md

angular.module('ngCordova.plugins.contacts', [])

  .factory('$cordovaContacts', ['$q', function ($q) {

    return {
      save: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.save(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      remove: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.remove(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      clone: function (contact) {
        var deviceContact = navigator.contacts.create(contact);
        return deviceContact.clone(contact)
      },

      find: function (options) {
        var q = $q.defer();
        var fields = options.fields || ['id', 'displayName'];
        delete options.fields;

        navigator.contacts.find(fields, function (results) {
            q.resolve(results);
          },
          function (err) {
            q.reject(err);
          },
          options);

        return q.promise;
      }

      /*
       getContact: function (contact) {
       var q = $q.defer();

       navigator.contacts.pickContact(function (contact) {

       })

       }
       */

      // TODO: method to set / get ContactAddress
      // TODO: method to set / get ContactError
      // TODO: method to set / get ContactField
      // TODO: method to set / get ContactName
      // TODO: method to set / get ContactOrganization

    }

  }]);
// install   :     cordova plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
// link      :     https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin

angular.module('ngCordova.plugins.flashlight', [])

  .factory('$cordovaFlashlight', ['$q', '$window', function ($q, $window) {

    return {
      available: function () {
        var q = $q.defer();
        $window.plugins.flashlight.available(function (isAvailable) {
          q.resolve(isAvailable);
        });
        return q.promise;
      },

      switchOn: function () {
        var q = $q.defer();
        $window.plugins.flashlight.switchOn(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      switchOff: function () {
        var q = $q.defer();
        $window.plugins.flashlight.switchOff(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      }
    }
  }]);
angular.module('ngCordova.plugins', [
  'ngCordova.plugins.deviceMotion',
  'ngCordova.plugins.camera',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.deviceOrientation',
  'ngCordova.plugins.dialogs',
  'ngCordova.plugins.vibration',
  'ngCordova.plugins.network',
  'ngCordova.plugins.device',
  'ngCordova.plugins.barcodeScanner',
  'ngCordova.plugins.splashscreen',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.contacts',
  'ngCordova.plugins.statusbar',
  'ngCordova.plugins.file',
  'ngCordova.plugins.socialSharing',
  'ngCordova.plugins.globalization',
  'ngCordova.plugins.sqlite',
  'ngCordova.plugins.ga',
  'ngCordova.plugins.push',
  'ngCordova.plugins.spinnerDialog',
  'ngCordova.plugins.sms',
  'ngCordova.plugins.pinDialog',
  'ngCordova.plugins.localNotification',
  'ngCordova.plugins.toast',
  'ngCordova.plugins.flashlight',
  'ngCordova.plugins.capture',
  'ngCordova.plugins.appAvailability',
  // 'ngCordova.plugins.prefs',
  // 'ngCordova.plugins.printer',
  'ngCordova.plugins.bluetoothSerial',
  // 'ngCordova.plugins.backgroundGeolocation',
  // 'ngCordova.plugins.facebook',
  // 'ngCordova.plugins.adMob',
  // 'ngCordova.plugins.googleAnalytics',
  // 'ngCordova.plugins.googleMap',
  // 'ngCordova.plugins.clipboard',
  // 'ngCordova.plugins.nativeAudio',
  // 'ngCordova.plugins.media',
  // 'ngCordova.plugins.battery-status',
  // 'ngCordova.plugins.keychain',
  // 'ngCordova.plugins.progressIndicator',
  // 'ngCordova.plugins.datePicker',
  // 'ngCordova.plugins.calendar',
  // 'ngCordova.plugins.touchid'
]);
// install   :
// link      :

angular.module('ngCordova.plugins.localNotification', [])

  .factory('$cordovaLocalNotification', ['$q', '$window', function ($q, $window) {

    return {
      add: function (options, scope) {
        var q = $q.defer();
        $window.plugin.notification.local.add(
          options,
          function (result) {
            q.resolve(result);
          },
          scope);
        return q.promise;
      },

      cancel: function (id, scope) {
        var q = $q.defer();
        $window.plugin.notification.local.cancel(
          id, function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      cancelAll: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.cancelAll(
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      isScheduled: function (id, scope) {
        var q = $q.defer();

        $window.plugin.notification.local.isScheduled(
          id,
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      getScheduledIds: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.getScheduledIds(
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      isTriggered: function (id, scope) {
        var q = $q.defer();

        $window.plugin.notification.local.isTriggered(
          id, function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      getTriggeredIds: function (scope) {
        var q = $q.defer();

        $window.plugin.notification.local.getTriggeredIds(
          function (result) {
            q.resolve(result);
          }, scope);

        return q.promise;
      },

      getDefaults: function () {
        return $window.plugin.notification.local.getDefaults();
      },

      setDefaults: function (Object) {
        $window.plugin.notification.local.setDefaults(Object);
      },

      onadd: function () {
        return $window.plugin.notification.local.onadd;
      },

      ontrigger: function () {
        return $window.plugin.notification.local.ontrigger;
      },

      onclick: function () {
        return $window.plugin.notification.local.onclick;
      },

      oncancel: function () {
        return $window.plugin.notification.local.oncancel;
      }
    }
  }
  ]);
// install   :      cordova plugin add org.apache.cordova.statusbar
// link      :      https://github.com/apache/cordova-plugin-statusbar/blob/master/doc/index.md

angular.module('ngCordova.plugins.statusbar', [])

  .factory('$cordovaStatusbar', [function () {

    return {
      overlaysWebView: function (bool) {
        return StatusBar.overlaysWebView(!!bool);
      },

      style: function (style) {
        switch (style) {
          // Default
          case 0:
            return StatusBar.styleDefault();

          // LightContent
          case 1:
            return StatusBar.styleLightContent();

          // BlackTranslucent
          case 2:
            return StatusBar.styleBlackTranslucent();

          // BlackOpaque
          case 3:
            return StatusBar.styleBlackOpaque();

          default:
            return StatusBar.styleDefault();
        }
      },

      // supported names:
      // black, darkGray, lightGray, white, gray, red, green,
      // blue, cyan, yellow, magenta, orange, purple, brown
      styleColor: function (color) {
        return StatusBar.backgroundColorByName(color);
      },

      styleHex: function (colorHex) {
        return StatusBar.backgroundColorByHexString(colorHex);
      },

      hide: function () {
        return StatusBar.hide();
      },

      show: function () {
        return StatusBar.show()
      },

      isVisible: function () {
        return StatusBar.isVisible();
      }
    }
  }]);
// install   :
// link      :

angular.module('ngCordova.plugins.bluetoothSerial', [])

  .factory('$cordovaBluetoothSerial', ['$q', '$window', function ($q, $window) {

    var promise_f = function () {
      var q = $q.defer();

      // callbacks
      var success = function (success) {
        q.resolve(success);
      };
      var failure = function (failure) {
        q.reject(failure);
      };

      // get func and set args
      var f_name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1, arguments.length);
      args.push(success);
      args.push(failure);

      $window.bluetoothSerial[f_name].apply(this, args);

      return q.promise;
    };

    return {
      connect: function (macAddress) {
        return promise_f('connect', macAddress);
      },
      connectInsecure: function (macAddress) {
        return promise_f('connectInsecure', macAddress);
      },
      disconnect: function () {
        return promise_f('disconnect');
      },
      list: function () {
        return promise_f('list');
      },
      isEnabled: function () {
        return promise_f('isEnabled');
      },
      isConnected: function () {
        return promise_f('isConnected');
      },
      available: function () {
        return promise_f('available');
      },
      read: function () {
        return promise_f('read');
      },
      readUntil: function (delimiter) {
        return promise_f('readUntil', delimiter);
      },
      write: function (data) {
        return promise_f('write', data);
      },
      subscribe: function (delimiter) {
        return promise_f('subscribe', delimiter);
      },
      unsubscribe: function () {
        return promise_f('unsubscribe');
      },
      clear: function () {
        return promise_f('clear');
      },
      readRSSI: function () {
        return promise_f('readRSSI');
      }
    };
  }]);
