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

var createPin = function (ad) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.style.cssText = 'left: ' + (ad.location.x - 20) + 'px; top:' + (ad.location.y - 72) + 'px;';
  pin.innerHTML = '<img src="' + ad.author.avatar + '" width="40" height="40" draggable="false">';

  return pin;
};

var renderPins = function (advertisements) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(createPin(advertisements[i]));
  }

  mapPins.appendChild(fragment);
};

var createAdvertisement = function (advertisement) {
  var template = document.querySelector('template').content;
  var advertisementElement = template.cloneNode(true);
  var featuresAmount = advertisement.offer.features.length;
  var adFeatureList = advertisementElement.querySelector('.popup__features');

  advertisementElement.querySelector('h3').textContent = advertisement.offer.title;
  advertisementElement.querySelector('p > small').textContent = advertisement.offer.address;
  advertisementElement.querySelector('.popup__price').innerHTML = advertisement.offer.price + '&#x20bd;/ночь';
  advertisementElement.querySelector('h4').textContent = advertisement.offer.type;
  advertisementElement.querySelector('h4 + p').textContent = 'комнаты: ' + advertisement.offer.rooms + ' для ' + advertisement.offer.guests + ' гостей';
  advertisementElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  advertisementElement.querySelector('.popup__features + p').textContent = advertisement.offer.description;
  advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

  adFeatureList.innerHTML = '';
  for (var j = 0; j < featuresAmount; j++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + advertisement.offer.features[j];
    adFeatureList.appendChild(feature);
  }

  return advertisementElement;
};

var fillMap = function (advertisements, map) {
  map.classList.remove('map--faded');

  renderPins(advertisements);
};

var renderAdvertisements = function () {
  var map = document.querySelector('.map');
  var advertisements = generateAdvertisements(8);
  var m = advertisements.length;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < m; i++) {
    fragment.appendChild(createAdvertisement(advertisements[i]));
  }

  map.appendChild(fragment);

  fillMap(advertisements, map);
};

renderAdvertisements();
