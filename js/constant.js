'use strict';

window.constants = (function () {
  var ADS_QUANTITY = 5;
  var USERS_QUANTITY = 5;

  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PHOTO_SIZE = 70;

  var API_URL = 'https://javascript.pages.academy/keksobooking/';
  var LOADING_TIMEOUT = 10000;

  var AdvtOptions = {
    TYPES: [
      'palace',
      'flat',
      'house',
      'bungalo',
    ],
    TITLES: [
      'Огромное поместье на окраине города',
      'Загородное поместье напротив лесной чащи',
      'Просторная квартира в центре города',
      'Небольшая уютная квартира',
      'Уютный маленький дом в пригороде',
      'Загородный дом с бассейном и садом',
      'Загородное бунгало',
      'Бунгало напротив живописного парка',
    ],
    DESCRIPTIONS: [
      'Лучшее жилье в целом Токио!',
      'Небольшая уютная квартира в тихом районе города',
      'Комфортабельные апартаменты в центре города',
      'Жилье со всеми удобствами в 5 минутах от метро',
      'Прекрасный загородный дом для большой семьи',
      'Небольшой домик в пригороде для любителей прекрасных видов',
      'Загородное бунгало с завораживающим видом на горные хребты',
      'Прекрасно обустроенное бунгало недалеко от центрального парка',
    ],
    CHECKTIMES: [
      '12:00',
      '13:00',
      '14:00',
    ],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
  };

  var CoordinatesLimit = {
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 130,
    Y_MAX: 630,
  };

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var MainPin = {
    WIDTH: 62,
    HEIGHT: 84,
    DEFAULT_X: 570,
    DEFAULT_Y: 375,
  };

  var StatusCode = {
    OK: 200,
  };

  return {
    ADS_QUANTITY: ADS_QUANTITY,
    USERS_QUANTITY: USERS_QUANTITY,
    DEFAULT_AVATAR: DEFAULT_AVATAR,
    PHOTO_SIZE: PHOTO_SIZE,
    API_URL: API_URL,
    LOADING_TIMEOUT: LOADING_TIMEOUT,
    AdvtOptions: AdvtOptions,
    CoordinatesLimit: CoordinatesLimit,
    Pin: Pin,
    MainPin: MainPin,
    StatusCode: StatusCode,
  };
})();
