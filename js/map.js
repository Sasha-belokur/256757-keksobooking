'use strict';
var advertisements = [];
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
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');

function shuffleArray(array) {
  var arr = array.slice();
  var m = arr.length;
  var t = '';
  var i = 0;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

var getFeatures = function (arr) {
  var featuresAmount = getRandomNum(1, adTemplate.features.length);
  var features = arr.slice();

  features = shuffleArray(features);
  features.length = featuresAmount;

  return features;
};

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var Advertisement = function (i) {
  Advertisement.counter++;

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
Advertisement.counter = 0;

for (var i = 0; i < 8; i++) {
  advertisements.push(new Advertisement(i));
}

document.querySelector('.map').classList.remove('map--faded');

var createPin = function (ad) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.style.cssText = 'left: ' + (ad.location.x - 20) + 'px; top:' + (ad.location.y - 72) + 'px;';
  pin.innerHTML = '<img src="' + ad.author.avatar + '" width="40" height="40" draggable="false">';

  return pin;
};

var renderPins = function () {
  var m = advertisements.length;
  var fragment = document.createDocumentFragment();
  for (i = 0; i < m; i++) {
    fragment.appendChild(createPin(advertisements[i]));
  }

  mapPins.appendChild(fragment);
};

var createAdvertisement = function () {
  var template = document.querySelector('template').content;
  var advertisementElement = template.cloneNode(true);
  var featuresAmount = advertisements[i].offer.features.length;
  var adFeatureList = advertisementElement.querySelector('.popup__features');

  advertisementElement.querySelector('h3').textContent = advertisements[i].offer.title;
  advertisementElement.querySelector('p > small').textContent = advertisements[i].offer.address;
  advertisementElement.querySelector('.popup__price').innerHTML = advertisements[i].offer.price + '&#x20bd;/ночь';
  advertisementElement.querySelector('h4').textContent = advertisements[i].offer.type;
  advertisementElement.querySelector('h4 + p').textContent = 'комнаты: ' + advertisements[i].offer.rooms + ' для ' + advertisements[i].offer.guests + ' гостей';
  advertisementElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
  advertisementElement.querySelector('.popup__features + p').textContent = advertisements[i].offer.description;
  advertisementElement.querySelector('.popup__avatar').src = advertisements[i].author.avatar;

  adFeatureList.innerHTML = '';
  for (var j = 0; j < featuresAmount; j++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + advertisements[i].offer.features[j];
    adFeatureList.appendChild(feature);
  }

  return advertisementElement;
};

var renderAdvertisements = function () {
  var m = advertisements.length;
  var fragment = document.createDocumentFragment();

  for (i = 0; i < m; i++) {
    fragment.appendChild(createAdvertisement());
  }

  map.appendChild(fragment);
};

renderPins();
renderAdvertisements();
