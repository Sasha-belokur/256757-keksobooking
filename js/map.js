'use strict';

//


var map = document.querySelector('.map');
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var mainPin = document.querySelector('.map__pin--main');
var activePin = null;

var deactivatePin = function () {
  activePin.classList.remove('map__pin--active');
  activePin = null;
};

var activatePin = function (pin) {
  if (activePin === pin) {
    return;
  }

  if (activePin) {
    deactivatePin();
  }

  activePin = pin;
  pin.classList.add('map__pin--active');
};

var pinClickHandler = function (evt) {
  var pin = evt.currentTarget;
  var id = pin.getAttribute('data-id');
  activatePin(pin);
  window.card.open(window.data.advertisements[id], map);
};

var createPin = function (ad) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.setAttribute('data-id', ad.id);

  pin.style.cssText = 'left: ' + (ad.location.x - 20) + 'px; top:' + (ad.location.y - 72) + 'px;';
  pin.innerHTML = '<img src="' + ad.author.avatar + '" width="40" height="40" draggable="false">';

  pin.addEventListener('click', pinClickHandler);

  return pin;
};

var renderPins = function (ads) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

var closeBtnClickHandler = function () {
  window.card.closePopup();
  window.card.closeBtn.removeEventListener('click', closeBtnClickHandler);
  document.removeEventListener('keypress', closeEscPressHandler);
};

var closeEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
    window.card.closePopup();
    document.removeEventListener('keypress', closeEscPressHandler);
    window.card.closeBtn.removeEventListener('click', closeBtnClickHandler);
  }
};

var fillMap = function () {
  renderPins(window.data.advertisements);
  map.classList.remove('map--faded');
};

var activateForm = function () {
  var form = document.querySelector('.notice__form');
  var formfieldsets = document.querySelectorAll('fieldset');

  form.classList.remove('notice__form--disabled');
  formfieldsets.forEach(function (fieldset) {
    fieldset.disabled = false;
  });
};

var alignTimeIn = function () {
  timeInInput.value = timeOutInput.value;
};

var alignTimeOut = function () {
  timeOutInput.value = timeInInput.value;
};

var timeInputHandler = function (evt) {
  var input = evt.currentTarget;

  if (input.name === 'timein') {
    alignTimeOut();
  } else if (input.name === 'timeout') {
    alignTimeIn();
  }
};

var setMinPrice = function (price) {
  var priceInput = document.querySelector('#price');

  priceInput.setAttribute('min', price);
};

var typeInputHandler = function (evt) {
  var type = evt.currentTarget.value;
  var minPrice;

  switch (type) {
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
    default:
      minPrice = 0;
      break;
  }

  setMinPrice(minPrice);
};

var changeCapacityOptions = function (amount) {
  var capacityOptions = Array.from(document.querySelector('#capacity'));
  if (amount === '100') {
    capacityOptions.forEach(function (option) {
      if (option.value > 0) {
        option.hidden = true;
      } else {
        option.hidden = false;
      }
    });
  } else {
    capacityOptions.forEach(function (option) {
      if (amount < option.value || option.value === '0') {
        option.hidden = true;
      } else {
        option.hidden = false;
      }
    });
  }

  for (var i = 0; i < capacityOptions.length; i++) {
    if (capacityOptions[i].hidden) {
      continue;
    } else {
      capacityOptions[i].selected = true;
      break;
    }
  }
};

var roomsInputHandler = function (evt) {
  var guestsAmount = evt.currentTarget.value;


  changeCapacityOptions(guestsAmount);
};

var titleInputInvalidHandler = function (evt) {
  var input = evt.currentTarget;

  input.style.border = '1px solid red';
  input.setCustomValidity('Длина заголовка должна быть от 30 до 100 симоволов');

};

var titleInputHandler = function (evt) {
  var input = evt.currentTarget;
  var minLenght = input.minLength;

  if (minLenght && input.value.length < minLenght) {
    input.style.border = '1px solid red';
    input.setCustomValidity('Длина заголовка должна быть от 30 до 100 симоволов');
  } else {
    input.style.border = '';
    input.setCustomValidity('');
  }
};

var priceInputInvalidHandler = function (evt) {
  var input = evt.currentTarget;
  var minPrice = input.min;

  input.style.border = '1px solid red';
  input.setCustomValidity('Цена должна быть не менее ' + minPrice);

};

var priceInputHandler = function (evt) {
  var input = evt.currentTarget;
  var minPrice = input.min;

  if (minPrice && input.value < minPrice) {
    input.style.border = '1px solid red';
    input.setCustomValidity('Цена должна быть не менее ' + minPrice);
  } else {
    input.style.border = '';
    input.setCustomValidity('');
  }
};

var mainPinMouseupHandler = function () {
  fillMap();
  activateForm();
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
};

var addEventListeners = function () {
  var typeInput = document.querySelector('#type');
  var roomsInput = document.querySelector('#room_number');
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');

  mainPin.addEventListener('mouseup', mainPinMouseupHandler);
  timeInInput.addEventListener('input', timeInputHandler);
  timeOutInput.addEventListener('input', timeInputHandler);

  typeInput.addEventListener('input', typeInputHandler);
  roomsInput.addEventListener('input', roomsInputHandler);

  titleInput.addEventListener('invalid', titleInputInvalidHandler);
  titleInput.addEventListener('input', titleInputHandler);

  priceInput.addEventListener('invalid', priceInputInvalidHandler);
  priceInput.addEventListener('input', priceInputHandler);
};

addEventListeners();
