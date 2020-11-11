'use strict';

window.map = (function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var pinsListElement = mapElement.querySelector('.map__pins');

  var mapFiltersElement = mapElement.querySelector('.map__filters-container');
  var mapFiltersFormElement = mapFiltersElement.querySelector('.map__filters');
  var filtersTypeInputElement = mapFiltersFormElement.querySelector('#housing-type');
  var filtersPriceInputElement = mapFiltersFormElement.querySelector('#housing-price');
  var filtersRoomsInputElement = mapFiltersFormElement.querySelector('#housing-rooms');
  var filtersGuestsInputElement = mapFiltersFormElement.querySelector('#housing-guests');
  var filtersFeaturesFieldsetElement = mapFiltersFormElement.querySelector('#housing-features');

  var adFormElement = document.querySelector('.ad-form');

  var loadedAds = [];
  var filtersUpdateTimeout = 0;

  var housingPriceToRange = {
    'any': {
      'minPrice': 0,
      'maxPrice': 1000000000,
    },
    'low': {
      'minPrice': 0,
      'maxPrice': 9999,
    },
    'middle': {
      'minPrice': 10000,
      'maxPrice': 50000,
    },
    'high': {
      'minPrice': 50001,
      'maxPrice': 1000000000,
    },
  };

  var disableActivatedPin = function () {
    if (mapElement.querySelector('.map__pin--active')) {
      mapElement.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  var deleteCard = function () {
    if (mapElement.querySelector('.map__card')) {
      mapElement.querySelector('.map__card').remove();
    }
  };

  var showCard = function (evt) {
    var target = evt.target;
    var button = target.closest('button');

    if (!button || button.classList.contains('map__pin--main')) {
      return;
    }

    deleteCard();
    disableActivatedPin();

    var currentAdID = button.id.replace(/ad-/, '') - 1;
    var card = window.card.renderCard(loadedAds[currentAdID], button);

    button.classList.add('map__pin--active');
    mapElement.insertBefore(card, mapFiltersElement);
  };

  var deletePins = function () {
    pinsListElement.querySelectorAll('.map__pin').forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var updatePins = function (ads) {
    var pinFragment = window.pin.renderPinFragment(ads);

    pinsListElement.appendChild(pinFragment);
  };

  var loadSuccessHandler = function (data) {
    loadedAds = window.data.generateLoadedAdID(data);
    var filteredAds = loadedAds.slice(0, window.constants.ADS_QUANTITY);

    enableFiltersInputs();
    updatePins(filteredAds);
  };

  var loadErrorHandler = function () {
    window.form.renderLoadStatusMessage('error');
  };

  var activatePage = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');

    window.load(loadSuccessHandler, loadErrorHandler);

    pinsListElement.addEventListener('click', pinClickHandler);
    pinsListElement.addEventListener('keydown', pinPressEnterHandler);

    window.form.enableFormInputs();
    window.form.setAddressInputValue();
  };

  var deactivatePage = function () {
    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');

    mainPinElement.style.top = window.constants.MainPin.DEFAULT_Y + 'px';
    mainPinElement.style.left = window.constants.MainPin.DEFAULT_X + 'px';
    mainPinElement.addEventListener('mousedown', mainPinClickHandler);
    mainPinElement.addEventListener('keydown', mainPinPressEnterHandler);

    deleteCard();
    deletePins();
    mapFiltersFormElement.reset();
    disableFiltersInputs();

    pinsListElement.removeEventListener('click', pinClickHandler);
    pinsListElement.removeEventListener('keydown', pinPressEnterHandler);

    window.form.disableFormInputs();
    window.form.resetUploadedImages();
  };

  var disableFiltersInputs = function () {
    Array.from(mapFiltersFormElement.children).forEach(function (inputsSet) {
      inputsSet.disabled = true;
    });
  };

  var enableFiltersInputs = function () {
    Array.from(mapFiltersFormElement.children).forEach(function (inputsSet) {
      inputsSet.disabled = false;
    });
  };

  var changeFilters = function () {
    var filteredAds = [];

    var typeValue = filtersTypeInputElement.value;
    var priceValue = filtersPriceInputElement.value;

    var roomsValue = filtersRoomsInputElement.value === 'any' ?
      filtersRoomsInputElement.value :
      parseInt(filtersRoomsInputElement.value, 10);

    var guestsValue = filtersGuestsInputElement.value === 'any' ?
      filtersGuestsInputElement.value :
      parseInt(filtersGuestsInputElement.value, 10);

    var featuresValue = [];
    var filtersCheckedFeaturesInputsElement = filtersFeaturesFieldsetElement.querySelectorAll('input[type="checkbox"]:checked');

    filtersCheckedFeaturesInputsElement.forEach(function (featureElement) {
      featuresValue.push(featureElement.value);
    });

    var minPrice = housingPriceToRange[priceValue]['minPrice'];
    var maxPrice = housingPriceToRange[priceValue]['maxPrice'];

    filteredAds = loadedAds.slice().
      filter(function (ad) {
        var featuresFlag = true;

        for (var i = 0; i < featuresValue.length; i++) {
          if (ad.offer.features.indexOf(featuresValue[i]) === -1) {
            featuresFlag = false;
            break;
          }
        }

        return ((ad.offer.type === typeValue) || (typeValue === 'any')) &&
          ((ad.offer.price >= minPrice) && (ad.offer.price <= maxPrice)) &&
          ((ad.offer.rooms === roomsValue) || (roomsValue === 'any')) &&
          ((ad.offer.guests === guestsValue) || (guestsValue === 'any')) &&
          featuresFlag;
      }).
      slice(0, window.constants.ADS_QUANTITY);

    deleteCard();
    deletePins();
    updatePins(filteredAds);
  };

  var filtersFormChangeHandler = function () {
    if (filtersUpdateTimeout) {
      window.clearTimeout(filtersUpdateTimeout);
    }

    filtersUpdateTimeout = window.setTimeout(function () {
      changeFilters();
    }, 500);
  };

  var pinClickHandler = function (evt) {
    evt.preventDefault();

    showCard(evt);
  };

  var pinPressEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      showCard(evt);
    }
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      activatePage();

      mainPinElement.removeEventListener('mousedown', mainPinClickHandler);
      mainPinElement.removeEventListener('keydown', mainPinPressEnterHandler);
    }
  };

  var mainPinPressEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      activatePage();

      mainPinElement.removeEventListener('mousedown', mainPinClickHandler);
      mainPinElement.removeEventListener('keydown', mainPinPressEnterHandler);
    }
  };

  var mainPinMoveHandler = function (evt) {
    evt.preventDefault();

    var startLocation = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startLocation.x - moveEvt.clientX,
        y: startLocation.y - moveEvt.clientY,
      };

      startLocation = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var newStyle = {
        top: (mainPinElement.offsetTop - shift.y),
        left: (mainPinElement.offsetLeft - shift.x),
      };

      newStyle.top = (newStyle.top + window.constants.MainPin.HEIGHT) < window.constants.CoordinatesLimit.Y_MIN ?
        window.constants.CoordinatesLimit.Y_MIN - window.constants.MainPin.HEIGHT : newStyle.top;

      newStyle.top = (newStyle.top + window.constants.MainPin.HEIGHT) > window.constants.CoordinatesLimit.Y_MAX ?
        window.constants.CoordinatesLimit.Y_MAX - window.constants.MainPin.HEIGHT : newStyle.top;

      newStyle.left = (newStyle.left + window.constants.MainPin.WIDTH / 2) < 0 ?
        0 - window.constants.MainPin.WIDTH / 2 : newStyle.left;

      newStyle.left = (newStyle.left + window.constants.MainPin.WIDTH / 2) > mapElement.offsetWidth ?
        mapElement.offsetWidth - window.constants.MainPin.WIDTH / 2 : newStyle.left;

      mainPinElement.style.top = newStyle.top + 'px';
      mainPinElement.style.left = newStyle.left + 'px';

      window.form.setAddressInputValue();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  return {
    deactivatePage: deactivatePage,
    mainPinClickHandler: mainPinClickHandler,
    mainPinPressEnterHandler: mainPinPressEnterHandler,
    mainPinMoveHandler: mainPinMoveHandler,
    disableFiltersInputs: disableFiltersInputs,
    filtersFormChangeHandler: filtersFormChangeHandler,
  };
})();
