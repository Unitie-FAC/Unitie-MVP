var redisClient = require('redis-connection')();
//var redisClient = require('redis');
//var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);

exports.register = function(server, options, next) {

  server.route([{
    method: 'POST',
    path: '/societyredis',
    config: {
      description: 'return the home page',
      handler: function(request, reply) {
        console.log("inside society-redis handler");
        console.log(request.payload);
        return reply("society-redis reply");

      }


    }
  }, {
    method: 'GET',
    path: '/society',
    config: {
      description: 'returns company page',
      handler: function(request, reply) {
        return reply.view('society');
      }
    }
  }]);

  return next();
};

exports.register.attributes = {
  name: 'Societyredis'
};
