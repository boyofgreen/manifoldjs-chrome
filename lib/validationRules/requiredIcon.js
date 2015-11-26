'use strict';

var manifoldjsLib = require('manifoldjs-lib');
var validationConstants = manifoldjsLib.constants.validationConstants,
imageValidation = manifoldjsLib.utils.validation.imageValidation;

module.exports = function (manifestContent, platform, callback) {
  var description = 'A 128x128 icon is required for the installation process and the Chrome Web Store',
      level = validationConstants.levels.warning,
      requiredIconSizes = ['128x128'];

  imageValidation(manifestContent, description, platform, level, requiredIconSizes, callback);
};
