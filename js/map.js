'use strict';

var Advertisement = function (i) {
  var adTemplate = {
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    price: {
      min: 1000,
      max: 1000000
    },
    type: ['flat', 'house', 'bungalo'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    maxRooms: 5,
    maxGuests: 20,
    time: {
      min: 12,
      max: 14
    }
  };

  this.id = i;

  this.author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  this.location = {
    x: window.util.getRandomNum(300, 900),
    y: window.util.getRandomNum(100, 500)
  };

  this.offer = {
    title: adTemplate.title[i],
    adress: this.location.x + ', ' + this.location.y,
    price: window.util.getRandomNum(adTemplate.price.min, adTemplate.price.max),
    type: adTemplate.type[window.util.getRandomNum(0, adTemplate.type.length - 1)],
    rooms: window.util.getRandomNum(1, adTemplate.maxRooms),
    guests: window.util.getRandomNum(1, adTemplate.maxGuests),
    checkin: window.util.getRandomNum(adTemplate.time.min, adTemplate.time.max) + ':00',
    checkout: window.util.getRandomNum(adTemplate.time.min, adTemplate.time.max) + ':00',
    features: window.util.getFeatures(adTemplate.features),
    description: '',
    photos: ''
  };
};

var generateAdvertisements = function (amount) {
  var advertisements = [];

  for (var i = 0; i < amount; i++) {
    advertisements.push(new Advertisement(i));
  }

  return advertisements;
};

//
var MAP_TYPE = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Лачуга'
};
var advertisements = generateAdvertisements(8);
var map = document.querySelector('.map');
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var mainPin = document.querySelector('.map__pin--main');
var activePin = null;
var activePopup = null;
var closeBtn = null;

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
  renderAdvertisement(advertisements[id]);
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

var closePopup = function () {
  deactivatePin();
  map.removeChild(activePopup);
  activePopup = null;
};

var closeBtnClickHandler = function () {
  closePopup();
  closeBtn.removeEventListener('click', closeBtnClickHandler);
  document.removeEventListener('keypress', closeEscPressHandler);
};

var closeEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
    document.removeEventListener('keypress', closeEscPressHandler);
    closeBtn.removeEventListener('click', closeBtnClickHandler);
  }
};

var createAdvertisement = function (ad) {
  var template = document.querySelector('template').content;
  var adElement = template.cloneNode(true);
  var featuresAmount = ad.offer.features.length;
  var adFeatureList = adElement.querySelector('.popup__features');
  closeBtn = adElement.querySelector('.popup__close');

  adElement.querySelector('h3').textContent = ad.offer.title;
  adElement.querySelector('p > small').textContent = ad.offer.address;
  adElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
  adElement.querySelector('h4').textContent = MAP_TYPE[ad.offer.type];
  adElement.querySelector('h4 + p').textContent = 'комнаты: ' + ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adElement.querySelector('.popup__features + p').textContent = ad.offer.description;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;

  closeBtn.addEventListener('click', closeBtnClickHandler);
  document.addEventListener('keydown', closeEscPressHandler);
  adFeatureList.innerHTML = '';
  for (var j = 0; j < featuresAmount; j++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + ad.offer.features[j];
    adFeatureList.appendChild(feature);
  }

  return adElement.querySelector('.popup');
};

var fillMap = function () {
  renderPins(advertisements);
  map.classList.remove('map--faded');
};

var renderAdvertisement = function (advertisement) {
  var popup = createAdvertisement(advertisement);
  if (activePopup) {
    map.removeChild(activePopup);
  }
  activePopup = popup;
  map.appendChild(popup);
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
