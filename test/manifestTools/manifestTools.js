'use strict';

var utils = require('../../lib/common/utils');
var should = require('should');

describe('Manifest Tools', function () {
  describe('getManifestFromFile()', function () {
    it('Should return an Error if custom format convert return an error', function(done) {
      var manifestInfo = { content: { 'name': 'test' }, format: 'W3C' };
      tools.convertTo(manifestInfo, 'chromeOS', function(err) {
        should.exist(err);
        err.should.have.property('message', 'Start url is required.');
        done();
      });
    });

    it('Convert from W3C to chromeOS', function (done) {
      var manifestInfo = {
        content: {
          'name': 'Google Mail',
          'short_name': 'GMail',
          'start_url': 'http://mail.google.com/mail/',
          'icons': [{
            'src': 'icon_64.png',
            'sizes': '64x64'
          }, {
            'src': 'icon_128.png',
            'sizes': '128x128'
          }],
          'orientation' : 'landscape',
          'display': 'fullscreen'
        },
        format: 'w3c'
      };

      var expectedManifestInfo = {
        content: {
          'name': 'Google Mail',
          'version': '0.0.1',
          'app': {
            // 'urls': [ 'http://mail.google.com/mail/' ],
            'launch': {
              'web_url': 'http://mail.google.com/mail/'
            }
          },
          'icons': {
            '64': 'icon_64.png',
            '128': 'icon_128.png'
          },
          'manifest_version': 2
        },
        format: 'chromeos'
      };

      tools.convertTo(manifestInfo, 'chromeOS', function(err, result) {
        should.not.exist(err);
        result.should.be.eql(expectedManifestInfo);
        done();
      });
    });
  });
});