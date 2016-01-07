var redisClient = require('redis-connection')();
//var redisClient = require('redis');
//var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);

exports.register = function(server, options, next) {

  var societyDatabase = function(request,reply){

    var societyFormObject = request.payload;
    var timeNow = Date.now();
    var date = new Date(timeNow);

    console.log('BOOM',request.payload);

    redisClient.incr('id');
    var thisId = redisClient.get('id', function(err,reply){
      addHashToDatabase(reply);
      addToSet('university', societyFormObject.university, reply);
      addToSet('region', societyFormObject.region, reply);
      addToSet('typeSociety', societyFormObject.typeSociety, reply);
      addToSet('memberSize', societyFormObject.memberSize, reply);
      addToSet('type', 'society', reply);

      return reply;
    });

    function addHashToDatabase(reply){
      redisClient.hmset(reply, 'id', reply, 'timestamp', timeNow, 'date', date, 'societyName', societyFormObject.societyName, 'university', societyFormObject.university, 'region', societyFormObject.region, 'typeSociety', societyFormObject.typeSociety, 'memberSize', societyFormObject.memberSize, 'email', societyFormObject.email,'phone',societyFormObject.phone,'aboutus', societyFormObject.aboutus,'societyLogo', societyFormObject.societyLogo, function(err,reply){});
    }

    function addToSet (key, value, hashID){
      var keyValue = key + ":" + value;
      redisClient.sadd(keyValue, hashID);
    }

    return reply("society-redis reply");
  };

  server.route([{
    method: 'POST',
    path: '/societyredis',
    config: {
      description: 'return the home page',
      handler: societyDatabase

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
