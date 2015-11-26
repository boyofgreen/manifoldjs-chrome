'use strict';

var manifoldjsLib = require('manifoldjs-lib');
var validationConstants = manifoldjsLib.constants.validationConstants,
imageValidation = manifoldjsLib.utils.validation.imageValidation;

module.exports = function (manifestContent, platform, callback) {
  var description = 'A 48x48 icon should be provided for the extensions management page (chrome://extensions)',
      level = validationConstants.levels.suggestion,
      requiredIconSizes = ['48x48'];

  imageValidation(manifestContent, description, platform, level, requiredIconSizes, callback);
};
