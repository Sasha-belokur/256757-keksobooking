'use strict';
function shuffleArray(array) {
  var arr = array.slice();
  var amount = arr.length;
  var temp = '';
  var i = 0;

  while (amount) {
    i = Math.floor(Math.random() * amount--);

    temp = arr[amount];
    arr[amount] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

var getFeatures = function (features) {
  var featuresAmount = getRandomNum(1, features.length);
  var randomFeatures = features.slice();

  randomFeatures = shuffleArray(randomFeatures);
  randomFeatures.length = featuresAmount;

  return randomFeatures;
};

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

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
    x: getRandomNum(300, 900),
    y: getRandomNum(100, 500)
  };

  this.offer = {
    title: adTemplate.title[i],
    adress: this.location.x + ', ' + this.location.y,
    price: getRandomNum(adTemplate.price.min, adTemplate.price.max),
    type: adTemplate.type[getRandomNum(0, adTemplate.type.length - 1)],
    rooms: getRandomNum(1, adTemplate.maxRooms),
    guests: getRandomNum(1, adTemplate.maxGuests),
    checkin: getRandomNum(adTemplate.time.min, adTemplate.time.max) + ':00',
    checkout: getRandomNum(adTemplate.time.min, adTemplate.time.max) + ':00',
    features: getFeatures(adTemplate.features),
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

var mainPinMouseupHandler = function () {
  var mainPin = document.querySelector('.map__pin--main');
  fillMap();
  activateForm();
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
};

var addEventListeners = function () {
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mouseup', mainPinMouseupHandler);
};

addEventListeners();
