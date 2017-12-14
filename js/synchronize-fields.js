'use strict';
(function () {
  var synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, syncFunction) {
    firstField.addEventListener('change', function () {
      var firstFieldIndex = firstFieldValues.indexOf(firstField.value);
      var secondFieldValue = secondFieldValues[firstFieldIndex];

      syncFunction(secondField, secondFieldValue);
    });
  };
  window.synchronizeFields = synchronizeFields;
})();
