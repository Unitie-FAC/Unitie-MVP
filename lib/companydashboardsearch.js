// var bluebird = require('bluebird');
// var client = require('redis-connection')();
// var redisClient = require('redis');
// var client = redisClient.createClient();

var client = require('./redis.js');
// bluebird.promisifyAll(redisClient.RedisClient.prototype);
// bluebird.promisifyAll(redisClient.Multi.prototype);

exports.register = function (server, options, next) {

var template = require('./companydashboardhandlebars.js');

    server.route([
      {
        method: 'POST',
        path: '/companydashboardsearch',
        config: {
          description: 'return home page',
          handler: function(request,reply){
            var requestPayload = request.payload;
            var arrayOfFilters = ['type:company'];
            var requestPayloadKeys = Object.keys(requestPayload);
            var companyHashesArrayFiltered = [];
            console.log('companydashboardsearch requestPayload', requestPayload);

            var arrayOfSetNames = function(requestPayload,requestPayloadKeys){
              requestPayloadKeys.forEach(function(elem){
                if(requestPayload[elem] !== '' && requestPayload[elem] !== null && requestPayload[elem] !== undefined && elem.length !== 0){
                  var setName = elem+ ':' + requestPayload[elem];
                  arrayOfFilters.push(setName);
                }
              });
            };

            var callback = function(){

              var quoteData = {
                object:companyHashesArrayFiltered
              };
              var quote = template.buildQuote(quoteData);
              return reply(quote);
            };

            arrayOfSetNames(requestPayload,requestPayloadKeys);
            client.sinterAsync.apply(client, arrayOfFilters)
            .each(function(membersArray){
              return client.hgetallAsync(membersArray)
              .then(function(hgetallobject){
                companyHashesArrayFiltered.push(hgetallobject);
              });
            })
            .then(function(){
              // client.unref();
              callback();
            });
        //    return reply('You have searched');


          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Companydashboardsearch'
};
