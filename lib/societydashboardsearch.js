// var bluebird = require('bluebird');
// var client = require('redis-connection')();
// var redisClient = require('redis');
// var client = redisClient.createClient();

var client = require('./redis.js');
// bluebird.promisifyAll(redisClient.RedisClient.prototype);
// bluebird.promisifyAll(redisClient.Multi.prototype);

exports.register = function (server, options, next) {

    server.route([
      {
        method: 'POST',
        path: '/societydashboardsearch',
        config: {
          description: 'return home page',
          handler: function(request,reply){
            var requestPayload = request.payload;
            var arrayOfFilters = [];
            var requestPayloadKeys = Object.keys(requestPayload);

            var arrayOfSetNames = function(requestPayload,requestPayloadKeys){
              requestPayloadKeys.forEach(function(elem){
                if(requestPayload[elem] !== '' && requestPayload[elem] !== null && requestPayload[elem] !== undefined && elem.length !== 0){
                  var setName = elem+ ':' + requestPayload[elem];
                  arrayOfFilters.push(setName);
                }
              });
            };

            arrayOfSetNames(requestPayload,requestPayloadKeys);
            client.sinterAsync.apply(client, arrayOfFilters)
            .then(function(filteredlist){
              console.log(filteredlist);
            });
            return reply('You have searched');


          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Societydashboardsearch'
};
