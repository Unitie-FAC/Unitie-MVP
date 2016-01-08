var test    = require('tape');
var path    = require('path');

// var env = require('env2')('.env');
// var redisClient = require('redis-connection')();
// redisClient.set('hello', 'world');
// redisClient.get('hello', function (err, reply) {
//   console.log('hello', reply.toString()); // hello world
// });

//var client = redisClient.createClient(process.env.REDIS_URL);
// var redisClient = require('redis');
// var client = redisClient.createClient();



var dir     = __dirname.split('/')[__dirname.split('/').length-1];
var file    = dir + __filename.replace(__dirname, '') + ' ->';

var start = require('../lib/start.js');
var server   = require('../lib/index.js');
var client = require('../lib/redis.js');


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
    //client.quit();

  });
});


test.only(file + " GET / returns status 200", function(t) {
  var options = {
    method  : "GET",
    url     : "/societydashboard"
  };
  server.inject(options, function (res) {
    t.equal(res.statusCode, 200, 'server loads ok');

    setTimeout(function(){
      server.stop(t.end);
    },700);

    //client.quit();
  });
});


test(file + " GET / returns status 200", function(t) {
  var options = {
    method  : "GET",
    url     : "/societyredis"
  };
  server.inject(options, function (res) {
    t.equal(res.statusCode, 404, 'server loads ok');

    setTimeout(function(){
      server.stop(t.end);
    },700);
    client.quit();

  });
});

// test(file + " POST / returns status 200", function(t) {
//   var options = {
//     method  : "POST",
//     url     : "/societydashboardsearch"
//   };
//   server.inject(options, function (res) {
//     t.equal(res.statusCode, 200, 'server loads ok');
//
//     setTimeout(function(){
//       server.stop(t.end);
//     },700);
//
//    client.quit();
//
//   });
//
// });
