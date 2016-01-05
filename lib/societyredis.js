var redisClient = require('redis-connection')();
//var redisClient = require('redis');
var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'GET',
      path:'/societyredis',
      config: {
        description: 'return the home page',

        handler: function(request, reply){
          console.log("inside society-redis handler");

          return reply("society-redis reply");

        }


      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Societyredis'
};
