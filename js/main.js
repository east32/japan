'use strict';
var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');
var mapFiltersFormElement = mapElement.querySelector('.map__filters');

window.map.disableFiltersInputs();

mainPinElement.addEventListener('mousedown', window.map.mainPinClickHandler);
mainPinElement.addEventListener('keydown', window.map.mainPinPressEnterHandler);
mainPinElement.addEventListener('mousedown', window.map.mainPinMoveHandler);
mapFiltersFormElement.addEventListener('change', window.map.filtersFormChangeHandler);

var adFormElement = document.querySelector('.ad-form');
var adFormTypeInputElement = adFormElement.querySelector('#type');
var adFormPriceInputElement = adFormElement.querySelector('#price');
var adFormRoomsInputElement = adFormElement.querySelector('#room_number');
var adFormGuestsInputElement = adFormElement.querySelector('#capacity');
var adFormTimeInInputElement = adFormElement.querySelector('#timein');
var adFormTimeOutInputElement = adFormElement.querySelector('#timeout');
var adFormAvatarInputElement = adFormElement.querySelector('#avatar');
var adFormPhotoInputElement = adFormElement.querySelector('#images');

window.form.disableFormInputs();

adFormTypeInputElement.addEventListener('input', window.form.typeInputHandler);
adFormTypeInputElement.addEventListener('input', window.form.priceInputHandler);
adFormPriceInputElement.addEventListener('input', window.form.priceInputHandler);
adFormRoomsInputElement.addEventListener('input', window.form.roomsQuantityInputHandler);
adFormGuestsInputElement.addEventListener('input', window.form.roomsQuantityInputHandler);
adFormTimeInInputElement.addEventListener('input', window.form.checktimeInputHandler);
adFormTimeOutInputElement.addEventListener('input', window.form.checktimeInputHandler);
adFormAvatarInputElement.addEventListener('change', window.form.avatarChangeHandler);
adFormPhotoInputElement.addEventListener('change', window.form.photoChangeHandler);

adFormElement.addEventListener('submit', window.form.adFormSubmitHandler);
adFormElement.addEventListener('reset', window.form.adFormResetHandler);
