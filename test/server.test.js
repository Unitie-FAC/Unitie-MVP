var test    = require('tape');
var path    = require('path');


var dir     = __dirname.split('/')[__dirname.split('/').length-1];
var file    = dir + __filename.replace(__dirname, '') + ' ->';

var start = require('../lib/start.js');
var server   = require('../lib/index.js');

test(file + " GET / returns status 200", function(t) {
  var options = {
    method  : "GET",
    url     : "/"
  };
  server.inject(options, function (res) {
    t.equal(res.statusCode, 200, 'server loads ok');
    setTimeout(function(){
      server.stop(t.end);
    },700);
  });
});
