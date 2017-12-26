'use strict';
(function () {
  var DEFAULT_ROOMS_AMOUNT = 1;
  var TIME_INPUT_VALUES = ['12:00', '13:00', '14:00'];
  var HOUSING_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var HOUSING_MIN_PRICES = ['1000', '0', '5000', '10000'];
  var MAP_ROOMS_TO_GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var form = document.querySelector('.notice__form');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var apartmentType = form.querySelector('#type');
  var pricePerNight = form.querySelector('#price');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var changeCapacityOptions = function (rooms) {
    var capacityOptions = Array.from(form.querySelector('#capacity'));

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
    var formfieldsets = form.querySelectorAll('fieldset');

    form.classList.remove('notice__form--disabled');
    formfieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  };

  var formSubmitHandler = function (evt) {
    var data = new FormData(form);
    var adressInput = form.querySelector('#address');
    var adressLastValue = adressInput.value;
    window.backend.save(data, window.message.showSuccess, window.message.showError);

    form.reset();
    window.uploadImage.clear();
    changeCapacityOptions(DEFAULT_ROOMS_AMOUNT);
    adressInput.value = adressLastValue;
    evt.preventDefault();
  };

  var addEventListeners = function () {
    var roomsInput = form.querySelector('#room_number');
    var titleInput = form.querySelector('#title');
    var priceInput = form.querySelector('#price');

    form.addEventListener('submit', formSubmitHandler);

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

  window.synchronizeFields(timeInInput, timeOutInput, TIME_INPUT_VALUES, TIME_INPUT_VALUES, syncValues);
  window.synchronizeFields(timeOutInput, timeInInput, TIME_INPUT_VALUES, TIME_INPUT_VALUES, syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, HOUSING_TYPES, HOUSING_MIN_PRICES, syncValueWithMin);
})();
