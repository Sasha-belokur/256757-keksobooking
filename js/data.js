'use strict';

(function () {
  var NUMBER_OF_ADVERTISEMENTS = 8;

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

  window.data = {
    advertisements: generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)
  };
})();
