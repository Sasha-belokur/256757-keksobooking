'use strict';
(function () {
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICEF = 5000;
  var PALACE_MIN_PRICE = 1000;
  var MAP_ROOMS_TO_GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
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
        minPrice = FLAT_MIN_PRICE;
        break;
      case 'house':
        minPrice = HOUSE_MIN_PRICEF;
        break;
      case 'palace':
        minPrice = PALACE_MIN_PRICE;
        break;
      default:
        minPrice = 0;
        break;
    }

    setMinPrice(minPrice);
  };

  var changeCapacityOptions = function (rooms) {
    var capacityOptions = Array.from(document.querySelector('#capacity'));

    capacityOptions.forEach(function (option) {
      if (MAP_ROOMS_TO_GUESTS[rooms].includes(option.value)) {
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });

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

  var activate = function () {
    var form = document.querySelector('.notice__form');
    var formfieldsets = document.querySelectorAll('fieldset');

    form.classList.remove('notice__form--disabled');
    formfieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  };

  var addEventListeners = function () {
    var typeInput = document.querySelector('#type');
    var roomsInput = document.querySelector('#room_number');
    var titleInput = document.querySelector('#title');
    var priceInput = document.querySelector('#price');

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

  window.form = {
    activate: activate
  };
})();
