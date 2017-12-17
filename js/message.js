'use strict';
(function () {
	var createMessagePopup = function () {
		var messagePopup = document.createElement('div');
		var h2Element = document.createElement('h2');
		var paragraphElemnt = document.createElement('p');
		var buttonElement = document.createElement('button');
		buttonElement.textContent = 'Хорошо.';

		messagePopup.classList.add('message-popup');

		messagePopup.appendChild(h2Element);
		messagePopup.appendChild(paragraphElemnt);
		messagePopup.appendChild(buttonElement);

		return messagePopup;
	};

	var closeMessagePopup = function (popup) {
		popup.remove();
	};

	var buttonClickHandler = function (evt) {
		debugger;
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
		messagePopup.querySelector('h2').textContent = 'Упс ошибочка...'
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
