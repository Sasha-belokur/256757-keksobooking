'use strict';

(function () {
  window.data = {
    advertisements: null
  };

  window.backend.load(function (data) {
    var advertisements = data.slice();

    advertisements.forEach(function (obj, i) {
      obj.id = i;
    });

    window.data.advertisements = advertisements;
  }, window.backend.errorHandler);

})();
