'use strict';

(function () {
  var activePin = null;

  var deactivate = function () {
    activePin.classList.remove('map__pin--active');
    activePin = null;
  };

  var activate = function (pin) {
    if (activePin === pin) {
      return;
    }

    if (activePin) {
      deactivate();
    }

    activePin = pin;
    pin.classList.add('map__pin--active');
  };

  var create = function (ad) {
    var pin = document.createElement('button');
    pin.classList.add('map__pin');
    pin.setAttribute('data-id', ad.id);

    pin.style.cssText = 'left: ' + (ad.location.x - 20) + 'px; top:' + (ad.location.y - 72) + 'px;';
    pin.innerHTML = '<img src="' + ad.author.avatar + '" width="40" height="40" draggable="false">';

    return pin;
  };

  window.pin = {
    activate: activate,
    create: create,
    deactivate: deactivate
  };
})();
