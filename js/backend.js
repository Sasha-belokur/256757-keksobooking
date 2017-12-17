'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var REQUEST_TIMEOUT = 15000;

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
