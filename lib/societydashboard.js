var redisClient = require('redis-connection')();

exports.register = function (server, options, next) {

    server.route([
      {
        method: 'GET',
        path: '/societydashboard',
        config: {
          description: 'return society dashboard',
          handler: function(request,reply){
            console.log("in societydash");
            redisClient.smembers("type:society", function(err, reply){
              console.log("reply", reply);
              var replyLength = reply.length;
              var replyCounter = 0;

              var societyHashes = reply.forEach(function(element, i){
                replyCounter = i + 1;
                return redisClient.hgetall(element, function(err, replyForEach){
                  console.log("eplyCounter", replyCounter);
                  return replyForEach;
                });

              });

              if (replyCounter === replyLength){
                  console.log("society hashes", societyHashes);
              }

              console.log("replyLength", replyLength);

            });
            return reply.view('societydashboard');
          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Societydashboard'
};
