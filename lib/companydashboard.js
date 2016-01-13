//var bluebird = require('bluebird');
// var redisClient = require('redis-connection')();
// var redisClient = require('redis');
// var client = redisClient.createClient();
// bluebird.promisifyAll(redisClient.RedisClient.prototype);
// bluebird.promisifyAll(redisClient.Multi.prototype);
var client = require('./redis.js');

exports.register = function (server, options, next) {

var template = require('./companydashboardhandlebars.js');

    server.route([
      {
        method: 'GET',
        path: '/companydashboard',
        config: {
          description: 'return company dashboard',
          handler: function(request,reply){

            var companyHashesArray = [];

            var callback = function(){

              var quoteData = {
                object:companyHashesArray
              };
              var quote = template.buildQuote(quoteData);
              return reply(quote);
            };



            var test = client.smembersAsync('type:company')
            .each(function(membersArray){
              return client.hgetallAsync(membersArray)
              .then(function(hgetallobject){
                companyHashesArray.push(hgetallobject);
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
  name: 'Companydashboard'
};
