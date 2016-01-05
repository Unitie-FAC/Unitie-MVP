var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');

var Home = require('./home.js');
var Companyredis = require('./companyredis.js');
var Societyredis = require('./societyredis.js');

exports.init = function (port, next) {

  var server = new Hapi.Server();
  server.connection({port: port});
  server.register([Inert, Vision, Home, Companyredis, Societyredis], function (err) {
    if (err) {
      return next(err);
    }

    server.start(function (err) {

      return next(err, server);
    });
  });
module.exports = server;
};
