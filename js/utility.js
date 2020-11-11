'use strict';

window.utility = (function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrValue = function (arrName) {
    return arrName[getRandomInt(0, arrName.length - 1)];
  };

  var getSeveralRandomArrValues = function (arrName) {
    var allValues = arrName.slice();
    var selectedValues = [];
    var elementsQuantity = getRandomInt(1, allValues.length);

    for (var i = 0; i < elementsQuantity; i++) {
      var currentValueIndex = getRandomInt(0, allValues.length - 1);
      var currentValue = allValues[currentValueIndex];

      allValues.splice(currentValueIndex, 1);
      selectedValues.push(currentValue);
    }

    return selectedValues;
  };

  return {
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getSeveralRandomArrValues: getSeveralRandomArrValues,
  };
})();
