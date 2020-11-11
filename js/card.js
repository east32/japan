'use strict';

window.card = (function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var housingTypeToName = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var renderCard = function (ad, pin) {
    var newCardElement = cardTemplateElement.cloneNode(true);
    var newCardCloseButtonElement = newCardElement.querySelector('.popup__close');

    var cardTextElements = [
      {
        'element': newCardElement.querySelector('.popup__title'),
        'text': ad.offer.title || '',
      },
      {
        'element': newCardElement.querySelector('.popup__text--address'),
        'text': ad.offer.address || '',
      },
      {
        'element': newCardElement.querySelector('.popup__text--price'),
        'text': ad.offer.price ?
          ad.offer.price + '₽/ночь' : '',
      },
      {
        'element': newCardElement.querySelector('.popup__type'),
        'text': ad.offer.type ?
          housingTypeToName[ad.offer.type] : '',
      },
      {
        'element': newCardElement.querySelector('.popup__text--capacity'),
        'text': (ad.offer.rooms && ad.offer.guests) ?
          ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей' : '',
      },
      {
        'element': newCardElement.querySelector('.popup__text--time'),
        'text': (ad.offer.checkin && ad.offer.checkout) ?
          'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout : '',
      },
      {
        'element': newCardElement.querySelector('.popup__description'),
        'text': ad.offer.description || '',
      },
    ];

    var cardMultipleContentElements = [
      {
        'element': newCardElement.querySelector('.popup__features'),
        'content': ad.offer.features,
      },
      {
        'element': newCardElement.querySelector('.popup__photos'),
        'content': ad.offer.photos,
      },
    ];

    var renderFeatures = function (featuresInfo) {
      featuresInfo.element.querySelectorAll('.popup__feature').forEach(function (featureElement) {
        featureElement.classList.add('hidden');
      });

      featuresInfo.content.forEach(function (feature) {
        featuresInfo.element.querySelector('.popup__feature--' + feature).classList.remove('hidden');
      });
    };

    var renderPhotos = function (photosInfo) {
      var newCardPhotoElement = photosInfo.element.querySelector('.popup__photo');
      var newCardPhotoFragment = document.createDocumentFragment();

      while (photosInfo.element.firstChild) {
        photosInfo.element.removeChild(photosInfo.element.firstChild);
      }

      photosInfo.content.forEach(function (photo) {
        var newPhotoElement = newCardPhotoElement.cloneNode(true);

        newPhotoElement.src = photo;
        newCardPhotoFragment.appendChild(newPhotoElement);
      });

      photosInfo.element.appendChild(newCardPhotoFragment);
    };

    var closeCard = function (evt) {
      evt.preventDefault();

      newCardElement.remove();
      pin.classList.remove('map__pin--active');

      document.removeEventListener('keydown', cardClosePressEscHandler);
    };

    var cardCloseClickHandler = function (evt) {
      closeCard(evt);
    };

    var cardClosePressEscHandler = function (evt) {
      if (evt.key === 'Escape') {
        closeCard(evt);
      }
    };

    newCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    cardTextElements.forEach(function (textElementInfo) {
      if (!textElementInfo.text) {
        textElementInfo.element.classList.add('hidden');
      } else {
        textElementInfo.element.textContent = textElementInfo.text;
      }
    });

    cardMultipleContentElements.forEach(function (multipleContentElementInfo) {
      if (multipleContentElementInfo.content.length === 0) {
        multipleContentElementInfo.element.classList.add('hidden');
      } else {
        switch (multipleContentElementInfo.element.className) {
          case 'popup__features':
            renderFeatures(multipleContentElementInfo);
            break;

          case 'popup__photos':
            renderPhotos(multipleContentElementInfo);
            break;
        }
      }
    });

    newCardCloseButtonElement.addEventListener('click', cardCloseClickHandler);
    document.addEventListener('keydown', cardClosePressEscHandler);

    return newCardElement;
  };

  return {
    renderCard: renderCard,
  };
})();
