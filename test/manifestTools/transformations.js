'use strict';

var transformation = require('../../../lib/manifestTools/transformations/chromeos');
var should = require('should');

describe('transformation: ChromeOS Manifest', function () {
  describe('convertFromBase()', function () {
    it('Should return an Error if manifest info is undefined', function(done) {
      transformation.convertFromBase(undefined, function(err) {
        should.exist(err);
        err.should.have.property('message', 'Manifest content is empty or not initialized.');
        done();
      });
    });

    it('Should return an Error if content property is undefined', function(done) {
      var originalManifest = { key: 'value' };

      transformation.convertFromBase(originalManifest, function(err) {
        should.exist(err);
        err.should.have.property('message', 'Manifest content is empty or not initialized.');
        done();
      });
    });

    it('Should return an Error if start_url is missing', function (done) {
      var originalManifestInfo = {
        content: {}
      };

      transformation.convertFromBase(originalManifestInfo, function(err) {
        should.exist(err);
        err.should.have.property('message', 'Start url is required.');
        done();
      });
    });

    it('Should return the transformed object', function (done) {
      var name = 'name';
      var siteUrl = 'url';

      var originalManifestInfo = {
        content: {
          'start_url': siteUrl,
          'name': name,
          'orientation' : 'landscape',
          'display': 'fullscreen'
        }
      };

      transformation.convertFromBase(originalManifestInfo, function(err, result) {
        should.not.exist(err);
        should.exist(result);
        /*jshint -W030 */
        result.should.have.property('content').which.is.an.Object;
        result.should.have.property('format', 'chromeos');

        var manifest = result.content;

        manifest.should.have.property('app');
        manifest.should.have.property('name', name);
        manifest.should.not.have.properties('orientation', 'display', 'icons');

        //manifest.app.should.have.property('urls').which.is.an.Array;
        //manifest.app.urls.should.containEql(siteUrl);

        manifest.app.should.have.property('launch').which.is.an.Object;
        manifest.app.launch.should.have.property('web_url', siteUrl);

        done();
      });
    });

    it('Should return the transformed object with icons', function (done) {
      var name = 'name';
      var siteUrl = 'url';

      var originalManifestInfo = {
        content: {
          'start_url': siteUrl,
          'name': name,
          'orientation' : 'landscape',
          'display': 'fullscreen',
          'icons': [
          {
            'src': 'icon/lowres',
            'sizes': '64x64',
            'type': 'image/webp'
          },
          {
            'src': 'icon/hd_small',
            'sizes': '64x64'
          },
          {
            'src': 'icon/hd_hi',
            'sizes': '128x128',
            'density': '2'
          }]
        }
      };

      transformation.convertFromBase(originalManifestInfo, function(err, result) {
        should.not.exist(err);
        should.exist(result);
        /*jshint -W030 */
        result.should.have.property('content').which.is.an.Object;
        result.should.have.property('format', 'chromeos');

        var manifest = result.content;
        manifest.should.have.property('name', name);
        manifest.should.not.have.properties('orientation', 'display');

        manifest.should.have.property('app');
        //manifest.app.should.have.property('urls').which.is.an.Array;
        //manifest.app.urls.should.containEql(siteUrl);
        manifest.app.should.have.property('launch').which.is.an.Object;
        manifest.app.launch.should.have.property('web_url', siteUrl);

        manifest.should.have.property('icons').which.is.an.Object;
        manifest.icons.should.containEql({'64': 'icon/hd_small'});
        manifest.icons.should.containEql({'128': 'icon/hd_hi'});

        done();
      });
    });
  });
});