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
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var Advertisement = function () {
  Advertisement.counter++;

  this.author = {
    avatar: 'img/avatars/user0' + Advertisement.counter + '.png'
  };

  this.location = {
    x: getRandomNum(300, 900),
    y: getRandomNum(100, 500)
  };

  this.offer = {
    title: adTemplate.title[Advertisement.counter - 1],
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
  advertisements.push(new Advertisement());
}
