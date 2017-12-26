'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarInput = document.querySelector('#avatar');
  var avatar = document.querySelector('.notice__preview img');
  var previewImagesInput = document.querySelector('.form__photo-container #images');
  var container = document.querySelector('.form__photo-container');
  previewImagesInput.multiple = true; 

  var isCorrectFormat = function(file) {
    var fileName = file.name.toLowerCase();
    var result = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return result;
  }

  var avatarReaderLoadHandler = function (evt) {
    avatar.src = evt.currentTarget.result;
  };

  var avatarInputChangeHandler = function () {
    var file = avatarInput.files[0];

    if (isCorrectFormat(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', avatarReaderLoadHandler);

      reader.readAsDataURL(file);
    }
  };

  var renderPreviewImage = function (imageSource) {
    var img = document.createElement('img');

    img.src = imageSource;
    img.style.width = '100%';
    container.appendChild(img);
  }

  var previewImagesReaderLoadHandler = function (evt) {
    renderPreviewImage(evt.currentTarget.result);
  }

  var previewImagesInputChangeHandler = function () {
    var images = previewImagesInput.files;

    for (var i = 0; i < images.length; i++) {
      if (isCorrectFormat(images[i])) {
        var reader = new FileReader();
        reader.addEventListener('load', previewImagesReaderLoadHandler);
        reader.readAsDataURL(images[i]);
      }
    }
    /* images.forEach(function(file) {
      if (isCorrectFormat(file)) {
        reader.readAsDataURL(file);
      }
    }) */
  };

  avatarInput.addEventListener('change', avatarInputChangeHandler);
  previewImagesInput.addEventListener('change', previewImagesInputChangeHandler);
})();
