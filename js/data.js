'use strict';

(function () {
  window.data = {
    advertisements: null
  };

  var addIDProperty = function (array) {
    array.forEach(function (obj, i) {
      obj.id = i;
    });
  };

  var dataLoadHandler = function (data) {
    var advertisements = data.slice();

    addIDProperty(advertisements);
    window.data.advertisements = advertisements;
  };

  window.backend.load(dataLoadHandler, window.backend.errorHandler);

})();
