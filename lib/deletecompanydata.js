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
        handler: function(request, reply) {
          var id = request.params.id;

          var hashToDelete = client.hgetall(id, function(err,reply){
          
            deleteFromSet('industryType', reply.industryType, id);
            deleteFromSet('type', 'company', id);
          });
        return reply.redirect('/companydashboard');
        }

      }

  }]);

  return next();
};

exports.register.attributes = {
  name: 'Deletecompanydata'
};
