'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var MAP_EDGES = {
    top: 100,
    bottom: 500,
  }
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinCoords = null;
  var adressInput = document.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');

  MAP_EDGES.left = map.offsetLeft + mainPin.offsetWidth / 2;
  MAP_EDGES.right = map.offsetLeft + map.offsetWidth - mainPin.offsetWidth / 2;

  var pinClickHandler = function (evt) {
    var pin = evt.currentTarget;
    var id = pin.getAttribute('data-id');
    window.pin.activate(pin);

    window.card.open(window.data.advertisements[id], map);
    window.card.closeBtn.addEventListener('click', closeBtnClickHandler);
    document.addEventListener('keydown', closeEscPressHandler);
  };

  var renderPins = function (ads) {
    var MAX_PINS_ON_MAP = 5;
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var amountOfPins = ads.length < MAX_PINS_ON_MAP ? ads.length : MAX_PINS_ON_MAP;

    for (var i = 0; i < amountOfPins; i++) {
      var newPin = window.pin.create(ads[i]);
      newPin.addEventListener('click', pinClickHandler);
      fragment.appendChild(newPin);
    }

    mapPins.appendChild(fragment);
  };

  var clearMapPins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.deactivate();
    window.card.close();

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var refreshMapPins = function () {
    var filteredAds = window.filter.getAds();
    clearMapPins();
    renderPins(filteredAds);
  };

  var filterFormChangeHandler = function () {
    window.filter.debounce(refreshMapPins);
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

  var mainPinMouseUpDragHandler = function () {

    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpDragHandler);
  };

  var mainPinMouseUpHandler = function (evt) {
    evt.preventDefault();

    activateMap();
    window.form.activate();
    adressInput.value = 'x: ' + window.getComputedStyle(mainPin).left + ' y: ' + window.getComputedStyle(mainPin).top;
    renderPins(window.data.advertisements);
    mainPin.style.zIndex = '1000';

    mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  };

  var mainPinMouseMoveHandler = function (evt) {
    evt.preventDefault();

    if (evt.clientY < MAP_EDGES.top || evt.clientY > MAP_EDGES.bottom || evt.clientX > MAP_EDGES.right || evt.clientX < MAP_EDGES.left) {
      return;
    }

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

    adressInput.value = 'x: ' + mainPinCoords.x + ' y: ' + mainPinCoords.y;
  };


  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();

    mainPinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpDragHandler);
  };


  mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
  filterForm.addEventListener('change', filterFormChangeHandler);
})();
