var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var Handlebars = require('handlebars');
var Home = require('./home.js');
var Assets = require('./assets.js');

var Companyredis = require('./companyredis.js');
var Societyredis = require('./societyredis.js');
var Autocomplete =require('./autocomplete.js');

exports.init = function (port, next) {

  var server = new Hapi.Server();
  server.connection({port: port});
  server.register([Inert, Vision, Assets, Home, Companyredis, Societyredis, Autocomplete], function (err) {
    if (err) {
      return next(err);
    }

    server.views({
      engines: {
        html:Handlebars
      },
      relativeTo: __dirname + '/../views',
      path:'.',
      layout: 'default',
      layoutPath: 'layout',
      helpersPath:'helpers',
      partialsPath:'partials'
    });

    server.start(function (err) {

      return next(err, server);
    });
  });
module.exports = server;
};
