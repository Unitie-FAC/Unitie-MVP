//var redisClient = require('redis');
var redisClient = require('redis-connection')();
//var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'POST',
      path:'/companyredis',
      config: {
        description: 'return the home page',

        handler: function(request, reply){
          console.log("inside company-redis handler");

          return reply("company-redis reply");

        }


      }
    },{
      method: 'GET',
      path:'/company',
      config: {
        description: 'returns company page',
        handler: function(request,reply){
          return reply.view('company');
        }
      }
    }]);

  return next();
};

exports.register.attributes = {
  name: 'Companyredis'
};
