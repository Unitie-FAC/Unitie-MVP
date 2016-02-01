// var bluebird = require('bluebird');
//var redisClient = require('redis-connection')();
// var redisClient = require('redis');
// var client = redisClient.createClient();
// bluebird.promisifyAll(redisClient.RedisClient.prototype);
// bluebird.promisifyAll(redisClient.Multi.prototype);
var client = require('./redis.js');

exports.register = function(server, options, next) {

  function deleteFromSet(key, value, hashID) {
    var keyValue = key + ":" + value;
    client.srem(keyValue, hashID);
  }

  server.route([{
      method: 'GET',
      path: '/deletecompany/{id}',
      config: {
        description: 'return home page',
        handler: function(request, replyHapi) {
          var id = request.params.id;

          var hashToDelete = client.hgetall(id, function(err,reply){

            deleteFromSet('industryType', reply.industryType, id);

            client.srem('type:company', id, function(){
              return replyHapi.redirect('/companydashboard');
            });
          });

        }

      }

  }]);

  return next();
};

exports.register.attributes = {
  name: 'Deletecompanydata'
};
