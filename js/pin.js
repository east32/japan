'use strict';

window.pin = (function () {
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var newPinElement = pinTemplateElement.cloneNode(true);

    newPinElement.id = ad.id;
    newPinElement.style.left = (ad.location.x - window.constants.Pin.WIDTH / 2) + 'px';
    newPinElement.style.top = (ad.location.y - window.constants.Pin.HEIGHT) + 'px';
    newPinElement.querySelector('img').src = ad.author.avatar;
    newPinElement.querySelector('img').alt = ad.offer.title;

    return newPinElement;
  };

  var renderPinFragment = function (ads) {
    var newFragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      if (ad.offer) {
        newFragment.appendChild(renderPin(ad));
      }
    });

    return newFragment;
  };

  return {
    renderPinFragment: renderPinFragment,
  };
})();
