//var bluebird = require('bluebird');
// var redisClient = require('redis-connection')();
// var redisClient = require('redis');
// var client = redisClient.createClient();
// bluebird.promisifyAll(redisClient.RedisClient.prototype);
// bluebird.promisifyAll(redisClient.Multi.prototype);
var client = require('./redis.js');

exports.register = function (server, options, next) {

var template = require('./societydashboardhandlebars.js');

    server.route([
      {
        method: 'GET',
        path: '/societydashboard',
        config: {
          description: 'return society dashboard',
          handler: function(request,reply){

            var societyHashesArray = [];

            var callback = function(){
              societyHashesArray.forEach(function(elem, i){
                elem.societyid = i + 1;
              });

              var quoteData = {
                object:societyHashesArray
              };
              var quote = template.buildQuote(quoteData);
              return reply(quote);
            };



            var test = client.smembersAsync('type:society')
            .each(function(membersArray){
              return client.hgetallAsync(membersArray)
              .then(function(hgetallobject){
                societyHashesArray.push(hgetallobject);
              });
            })
            .then(function(){
              // client.unref();
              callback();
            });
          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Societydashboard'
};
