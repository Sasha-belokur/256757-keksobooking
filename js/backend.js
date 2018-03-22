'use strict';

(function () {
  var JSON_URL = 'https://api.myjson.com/bins/1bxl7n';
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var REQUEST_TIMEOUT = 5000;
  var SUCCESS_STATUS = 200;

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    var xhrLoadHandler = function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var xhrErrorHandler = function () {
      onError('Произошла ошибка соединения');
    };

    var xhrTimeoutHandler = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', xhrLoadHandler);

    xhr.addEventListener('error', xhrErrorHandler);

    xhr.addEventListener('timeout', xhrTimeoutHandler);

    xhr.timeout = REQUEST_TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', JSON_URL);
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
