'use strict';
(function () {
  var createMessagePopup = function () {
    var messagePopup = document.createElement('div');
    var h2 = document.createElement('h2');
    var paragraph = document.createElement('p');
    var button = document.createElement('button');
    button.textContent = 'Хорошо.';

    messagePopup.classList.add('message-popup');

    messagePopup.appendChild(h2);
    messagePopup.appendChild(paragraph);
    messagePopup.appendChild(button);

    return messagePopup;
  };

  var closeMessagePopup = function (popup) {
    popup.remove();
  };

  var buttonClickHandler = function (evt) {
    closeMessagePopup(evt.target.parentNode);
  };

  var showSuccess = function () {
    var messagePopup = createMessagePopup();
    messagePopup.classList.add('success');
    messagePopup.querySelector('h2').textContent = 'Поздравляем!';
    messagePopup.querySelector('p').textContent = 'Ваша форма была успешно отправлена и обработана!';

    var button = messagePopup.querySelector('button');
    button.addEventListener('click', buttonClickHandler);

    document.body.appendChild(messagePopup);
  };

  var showError = function (text) {
    var messagePopup = createMessagePopup();
    messagePopup.classList.add('error');
    messagePopup.querySelector('h2').textContent = 'Упс ошибочка...';
    messagePopup.querySelector('p').textContent = text;

    var button = messagePopup.querySelector('button');
    button.addEventListener('click', buttonClickHandler);

    document.body.appendChild(messagePopup);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
