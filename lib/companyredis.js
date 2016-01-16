//var redisClient = require('redis');
// var redisClient = require('redis-connection')();
//var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);
var client = require('./redis.js');

exports.register = function(server, options, next) {

  var companyDatabase = function(request, reply) {

    var companyFormObject = request.payload;
    var timeNow = Date.now();
    var date = new Date(timeNow);
    var companyFormObjectKeys = Object.keys(companyFormObject);


    var thisId = client.incr('id', function(err, reply) {
      var companyHashArray = [reply, 'id', reply, 'timestamp', timeNow, 'date', date, 'type', 'company'];


      function addHashToDatabase(reply){
        client.hmset.apply(client,companyHashArray);
      }


      function addToSet (key, value, hashID){
        var keyValue = key + ":" + value;
        client.sadd(keyValue, hashID);
      }

//filtered fields industry, type of soc interested in, target region
      if (err) {
        console.log(err);
       // return reply("company-redis reply");
      } else {

        addToSet('type', 'company', reply);
        addToSet('industry',companyFormObject.industryType, reply);

        companyFormObjectKeys.forEach(function(element, i, array){
          companyHashArray.push (element);
          companyHashArray.push (companyFormObject[element]);
          if (element.indexOf("socInterest") > -1 || element.indexOf("targetRegion") > -1){
           addToSet(element, companyFormObject[element], reply);
          }
        });
        addHashToDatabase(reply);

      }

    });
      setTimeout(function(){ return reply.view('company');}, 8000);
    
  };

  server.route([{
    method: 'POST',
    path: '/companyredis',
    config: {
      description: 'return the home page',
      handler: companyDatabase

    }
  }, {
    method: 'GET',
    path: '/company',
    config: {
      description: 'returns company page',
      handler: function(request, reply) {

        return reply.view('company');
      }
    }
  }]);

  return next();
};

exports.register.attributes = {
  name: 'Companyredis'
};
