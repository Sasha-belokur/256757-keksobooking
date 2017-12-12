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

  var getRandomNum = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.util = {
    shuffleArray: shuffleArray,
    getRandomNum: getRandomNum
  };
})();
