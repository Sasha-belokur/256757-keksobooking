'use strict';

(function () {
  var shuffleArray = function (array) {
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
  };

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

  window.util = {
    getFeatures: getFeatures,
    getRandomNum: getRandomNum
  };
})();
