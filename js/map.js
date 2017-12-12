'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var ESC_KEYCODE = 27;
  var mainPinCoords = null;

  var pinClickHandler = function (evt) {
    var pin = evt.currentTarget;
    var id = pin.getAttribute('data-id');
    window.pin.activate(pin);

    window.card.open(window.data.advertisements[id], map);
    window.card.closeBtn.addEventListener('click', closeBtnClickHandler);
    document.addEventListener('keydown', closeEscPressHandler);
  };

  var renderPins = function (ads) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var newPin = window.pin.create(ads[i]);
      newPin.addEventListener('click', pinClickHandler);
      fragment.appendChild(newPin);
    }

    mapPins.appendChild(fragment);
  };

  var closeBtnClickHandler = function () {
    window.card.close();
    window.pin.deactivate();

    window.card.closeBtn.removeEventListener('click', closeBtnClickHandler);
    document.removeEventListener('keypress', closeEscPressHandler);
  };

  var closeEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.close();
      window.pin.deactivate();

      document.removeEventListener('keypress', closeEscPressHandler);
      window.card.closeBtn.removeEventListener('click', closeBtnClickHandler);
    }
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var mainPinMouseupHandler = function () {
    renderPins(window.data.advertisements);
    window.form.activate();

    mainPin.removeEventListener('mousemove', mainPinMousemoveHandler);
    mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
  };

  var mainPinMousemoveHandler = function (evt) {
    evt.preventDefault();
    activateMap();

    var shift = {
      x: mainPinCoords.x - evt.clientX,
      y: mainPinCoords.y - evt.clientY
    };

    mainPinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();

    mainPinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    mainPin.addEventListener('mousemove', mainPinMousemoveHandler);
    mainPin.addEventListener('mouseup', mainPinMouseupHandler);
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
})();
