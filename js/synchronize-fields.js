'use strict';
(function () {
  var synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, syncFunction) {
    var firstFieldIndex = firstFieldValues.indexOf(firstField.value);
    var secondFieldValue = secondFieldValues[firstFieldIndex];

    syncFunction(secondField, secondFieldValue);
  };

  window.synchronizeFields = synchronizeFields;
})();
