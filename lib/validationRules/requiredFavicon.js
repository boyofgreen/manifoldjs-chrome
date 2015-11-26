'use strict';

var manifoldjsLib = require('manifoldjs-lib');
var validationConstants = manifoldjsLib.constants.validationConstants,
imageValidation = manifoldjsLib.utils.validation.imageValidation;

module.exports = function (manifestContent, platform, callback) {
  var description = 'It is recommended to have a 16x16 favicon',
      level = validationConstants.levels.suggestion,
      requiredIconSizes = ['16x16'];

  imageValidation(manifestContent, description, platform, level, requiredIconSizes, callback);
};
