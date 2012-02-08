
var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    cliEasy = require('cli-easy');

var fixturesDir = path.join(__dirname, 'fixtures'),
    appBin = path.join(fixturesDir, 'app.js');

cliEasy.describe('cli-config/commands')
  .discuss('When using the cli-config plugin')
    .discuss('app config set testing 1234')
      .use('node').args([appBin, 'config', 'set', 'testing', '1234'])
      .expect('should update the config file', function () {
        var data = JSON.parse(fs.readFileSync(path.join(fixturesDir, 'test-config.json'), 'utf8'));
        assert.equal(data.testing, 1234);
        return true;
      })
    .next()
    .discuss('app config get testing')
      .use('node').args([appBin, 'config', 'get', 'testing'])
      .expect('should update the config file', /1234/)
    .next()
    .discuss('app config list')
      .use('node').args([appBin, 'config', 'list'])
      .expect('should list the config correctly', /1234/)
    .next()
    .discuss('app config delete testing')
      .use('node').args([appBin, 'config', 'delete', 'testing'])
      .expect('should update the config file', function () {
        var data = JSON.parse(fs.readFileSync(path.join(fixturesDir, 'test-config.json'), 'utf8'));
        assert.isTrue(!data.testing);
        return true;
      })
    .next()
    .discuss('app config get testing')
      .use('node').args([appBin, 'config', 'get', 'testing'])
      //
      // REMARK: This syntax is really ackward
      //
      .expect('should indicate the setting has been deleted', '', /error/)
    
    
  .export(module);