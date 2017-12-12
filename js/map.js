'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var ESC_KEYCODE = 27;

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
  window.card.closeBtn.removeEventListener('click', closeBtnClickHandler);
  document.removeEventListener('keypress', closeEscPressHandler);
};

var closeEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.card.close();
    document.removeEventListener('keypress', closeEscPressHandler);
    window.card.closeBtn.removeEventListener('click', closeBtnClickHandler);
  }
};

var fillMap = function () {
  renderPins(window.data.advertisements);
  map.classList.remove('map--faded');
};

var mainPinMouseupHandler = function () {
  fillMap();
  window.form.activate();
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
};

var addEventListeners = function () {
  mainPin.addEventListener('mouseup', mainPinMouseupHandler);
};

addEventListeners();
