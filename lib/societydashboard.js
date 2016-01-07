var bluebird = require('bluebird');
// var redisClient = require('redis-connection')();
var redisClient = require('redis');
var client = redisClient.createClient();
bluebird.promisifyAll(redisClient.RedisClient.prototype);
bluebird.promisifyAll(redisClient.Multi.prototype);
exports.register = function (server, options, next) {



    server.route([
      {
        method: 'GET',
        path: '/societydashboard',
        config: {
          description: 'return society dashboard',
          handler: function(request,reply){

            var object = [];

            var callback = function(){
              client.quit();
              return reply(object);
            };



            var test = client.smembersAsync('type:society')
            .each(function(membersArray){
              return client.hgetallAsync(membersArray)
              .then(function(hgetallobject){
                object.push(hgetallobject);
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