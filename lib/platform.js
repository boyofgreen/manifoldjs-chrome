var util = require('util'),
    path = require('path'),
    fs = require('fs');

var log = require('loglevel');

var manifoldjsLib = require('manifoldjs-lib');
var Platform = manifoldjsLib.Platform;

function Chrome() {
  Platform.call(this, 'chrome', 'Chrome');
}

util.inherits(Chrome, Platform);

Chrome.prototype.getValidationRules = function () {
  var self = this;
  if (!self.validationRules) {
    self.validationRules = [];
    
    // Load validation rules for Chrome platform
    var validationGroupPath = path.join(__dirname, 'validationRules');
    fs.readdirSync(validationGroupPath).forEach(function(file) {
      self.validationRules.push(require(path.join(validationGroupPath, file)));
    });
  }
    
  return self.validationRules;
};

module.exports = Chrome;