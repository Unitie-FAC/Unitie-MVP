//var redisClient = require('redis');
var redisClient = require('redis-connection')();
var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'GET',
      path:'/companyredis',
      config: {
        description: 'return the home page',

        handler: function(request, reply){
          console.log("inside company-redis handler");
      
          return reply("company-redis reply");

        }


      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Companyredis'
};
