'use strict';

window.data = (function () {
  var generateAvatars = function () {
    var avatars = [];

    for (var i = 1; i <= window.constants.USERS_QUANTITY; i++) {
      avatars.push('img/avatars/user0' + i + '.png');
    }

    return avatars;
  };

  var getAvatar = function (avatars) {
    var currentAvatarIndex = window.utility.getRandomInt(0, avatars.length - 1);
    var currentAvatar = avatars[currentAvatarIndex];

    avatars.splice(currentAvatarIndex, 1);

    return currentAvatar;
  };

  var generateRandomAds = function (avatars) {
    var ads = [];

    for (var i = 0; i < window.constants.ADS_QUANTITY; i++) {
      var randomX = window.utility.getRandomInt(window.constants.CoordinatesLimit.X_MIN,
          window.constants.CoordinatesLimit.X_MAX);
      var randomY = window.utility.getRandomInt(window.constants.CoordinatesLimit.Y_MIN,
          window.constants.CoordinatesLimit.Y_MAX);

      var newAd = {
        'id': 'ad-' + (i + 1),
        'author': {
          'avatar': getAvatar(avatars),
        },
        'offer': {
          'title': window.utility.getRandomArrValue(window.constants.AdvtOptions.TITLES),
          'address': randomX + ', ' + randomY,
          'price': window.utility.getRandomInt(1000, 15000),
          'type': window.utility.getRandomArrValue(window.constants.AdvtOptions.TYPES),
          'rooms': window.utility.getRandomInt(1, 6),
          'guests': window.utility.getRandomInt(1, 6),
          'checkin': window.utility.getRandomArrValue(window.constants.AdvtOptions.CHECKTIMES),
          'checkout': window.utility.getRandomArrValue(window.constants.AdvtOptions.CHECKTIMES),
          'features': window.utility.getSeveralRandomArrValues(window.constants.AdvtOptions.FEATURES),
          'description': window.utility.getRandomArrValue(window.constants.AdvtOptions.DESCRIPTIONS),
          'photos': window.utility.getSeveralRandomArrValues(window.constants.AdvtOptions.PHOTOS),
        },
        'location': {
          'x': randomX,
          'y': randomY,
        },
      };

      ads.push(newAd);
    }

    return ads;
  };

  var generateLoadedAdID = function (ads) {
    var currentAdID = 1;

    ads.forEach(function (ad) {
      ad.id = currentAdID;
      currentAdID++;
    });

    return ads;
  };

  return {
    generateAvatars: generateAvatars,
    generateRandomAds: generateRandomAds,
    generateLoadedAdID: generateLoadedAdID,
  };
})();
