'use strict';
(function () {
  var MIN_MID_PRICE = 10000;
  var MAX_MID_PRICE = 50000;
  var DEBOUNCE_INTERVAL = 500;
  var filterForm = document.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');
  var features = Array.from(filterForm.querySelectorAll('#housing-features input'));
  var lastTimeout;

  var isFitType = function (ad) {
    return typeFilter.value === 'any' ? true : ad.offer.type === typeFilter.value;
  };

  var isFitPrice = function (ad) {
    var result = false;

    switch (priceFilter.value) {
      case 'any':
        result = true;
        break;
      case 'low':
        result = ad.offer.price < MIN_MID_PRICE;
        break;
      case 'middle':
        result = ad.offer.price >= MIN_MID_PRICE && ad.offer.price <= MAX_MID_PRICE;
        break;
      case 'high':
        result = ad.offer.price > MAX_MID_PRICE;
        break;
    }

    return result;
  };

  var isFitRooms = function (ad) {
    return roomsFilter.value === 'any' ? true : ad.offer.rooms === +roomsFilter.value;
  };

  var isFitGuests = function (ad) {
    return guestsFilter.value === 'any' ? true : ad.offer.guests === +guestsFilter.value;
  };

  var isFitFeatures = function (ad) {
    var checkedFeatures = features
        .filter(function (input) {
          return input.checked;
        })
        .map(function (input) {
          return input.value;
        });

    return window.util.isSubArray(checkedFeatures, ad.offer.features);
  };

  var getAds = function () {
    return window.data.advertisements
        .filter(isFitType)
        .filter(isFitPrice)
        .filter(isFitRooms)
        .filter(isFitGuests)
        .filter(isFitFeatures);
  };

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.filter = {
    getAds: getAds,
    debounce: debounce
  };
})();

