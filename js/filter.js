'use strict';
(function () {
  var isFitType = function (ad) {
    var typeFilterValue = document.querySelector('#housing-type').value;
    return typeFilterValue === 'any' ? true : ad.offer.type === typeFilterValue;
  };

  var isFitPrice = function (ad) {
    var MIN_MID_PRICE = 10000;
    var MAX_MID_PRICE = 50000;
    var priceFilterValue = document.querySelector('#housing-price').value;
    var result = false;

    switch (priceFilterValue) {
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

  function isFitRooms(ad) {
    var roomsFilterValue = document.querySelector('#housing-rooms').value;
    return roomsFilterValue === 'any' ? true : ad.offer.rooms === +roomsFilterValue;
  }

  function isFitGuests(ad) {
    var guestsFilterValue = document.querySelector('#housing-guests').value;
    return guestsFilterValue === 'any' ? true : ad.offer.guests === +guestsFilterValue;
  }

  function isFitFeatures(ad) {
    var checkedFeatures = Array.from(document.querySelectorAll('#housing-features input'));
    checkedFeatures = checkedFeatures.filter(function (input) {
      return input.checked;
    })
        .map(function (input) {
          return input.value;
        });

    return window.util.isSubArray(checkedFeatures, ad.offer.features);
  }

  function getPins() {
    return window.data.advertisements.slice().filter(function (ad) {
      return isFitType(ad) && isFitPrice(ad) && isFitRooms(ad) && isFitGuests(ad) && isFitFeatures(ad);
    });
  }

  window.filter = {
    getPins: getPins
  };
})();

