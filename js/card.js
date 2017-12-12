'use strict';

(function () {
  var MAP_TYPE = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Лачуга'
  };
  var activePopup = null;
  var closeBtn = null;

  var open = function (advertisement, container) {
    var popup = create(advertisement);
    if (activePopup) {
      container.removeChild(activePopup);
    }
    activePopup = popup;
    container.appendChild(popup);
  };

  var create = function (ad) {
    var template = document.querySelector('template').content;
    var adElement = template.cloneNode(true);
    var featuresAmount = ad.offer.features.length;
    var adFeatureList = adElement.querySelector('.popup__features');
    window.card.closeBtn = adElement.querySelector('.popup__close');

    adElement.querySelector('h3').textContent = ad.offer.title;
    adElement.querySelector('p > small').textContent = ad.offer.address;
    adElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    adElement.querySelector('h4').textContent = MAP_TYPE[ad.offer.type];
    adElement.querySelector('h4 + p').textContent = 'комнаты: ' + ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
    adElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adElement.querySelector('.popup__features + p').textContent = ad.offer.description;
    adElement.querySelector('.popup__avatar').src = ad.author.avatar;

    adFeatureList.innerHTML = '';
    for (var j = 0; j < featuresAmount; j++) {
      var feature = document.createElement('li');
      feature.className = 'feature feature--' + ad.offer.features[j];
      adFeatureList.appendChild(feature);
    }

    return adElement.querySelector('.popup');
  };

  var close = function () {
    window.pin.deactivate();
    activePopup.remove();
    activePopup = null;
  };

  window.card = {
    open: open,
    close: close,
    closeBtn: closeBtn
  };
})();
