'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.notice__form');
  var avatarInput = form.querySelector('#avatar');
  var avatar = form.querySelector('.notice__preview img');
  var previewImagesInput = form.querySelector('.form__photo-container #images');
  var previewContainer = form.querySelector('.form__photo-container');
  previewImagesInput.multiple = true; 

  var isCorrectFormat = function(file) {
    var fileName = file.name.toLowerCase();
    var result = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return result;
  };

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
    previewContainer.appendChild(img);
  };

  var previewImagesReaderLoadHandler = function (evt) {
    renderPreviewImage(evt.currentTarget.result);
  };

  var previewImagesInputChangeHandler = function () {
    var images = previewImagesInput.files;

    for (var i = 0; i < images.length; i++) {
      if (isCorrectFormat(images[i])) {
        var reader = new FileReader();
        reader.addEventListener('load', previewImagesReaderLoadHandler);
        reader.readAsDataURL(images[i]);
      }
    }
  };

  var clear = function () {
    var previewImages = previewContainer.querySelectorAll('img');

    avatar.src = 'img/muffin.png';
    previewImages.forEach(function (img) {
      img.remove();
    });
  };

  avatarInput.addEventListener('change', avatarInputChangeHandler);
  previewImagesInput.addEventListener('change', previewImagesInputChangeHandler);

  window.uploadImage = {
    clear: clear
  };
})();
