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
      path: '/delete/{id}',
      config: {
        description: 'return home page',
        handler: function(request, reply) {
          var id = request.params.id;
          var hashToDelete = client.hgetall(request.params.id, function(err,reply){
            console.log(reply);
            console.log(id);
            deleteFromSet('university', reply.university,id);
            deleteFromSet('region', reply.region, id);
            deleteFromSet('typeSociety', reply.typeSociety, id);
            deleteFromSet('memberSize', reply.memberSize, id);
            deleteFromSet('type', 'society', id);

          });
          return reply.redirect('/societydashboard');
        }
      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Deletedata'
};
