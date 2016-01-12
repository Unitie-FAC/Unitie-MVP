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
    console.log('CompanyRedis payload', companyFormObject);

    //filtered fields industry, type of soc interested in, target region
    var thisId = client.incr('id', function(err, reply) {
      var companyHashArray = [reply, 'id', reply, 'timestamp', timeNow, 'date', date];

      companyFormObjectKeys.forEach(function(element, i, array){
        companyHashArray.push (element);
        companyHashArray.push (companyFormObject[element]);
       }
      )
      console.log("Object.keys(companyFormObject)", Object.keys(companyFormObject));
      console.log("companyHashArray", companyHashArray);

      function addHashToDatabase(reply){
        client.hmset.apply(client,companyHashArray );
      }


      // function addToSet (key, value, hashID){
      //   var keyValue = key + ":" + value;
      //   client.sadd(keyValue, hashID);
      // }


      if (err) {
        console.log(err);
        return reply("company-redis reply");
      } else {
        console.log('client.get', reply);
        addHashToDatabase(reply);
        addToSet('university', societyFormObject.university, reply);
        addToSet('region', societyFormObject.region, reply);
        addToSet('typeSociety', societyFormObject.typeSociety, reply);
        addToSet('memberSize', societyFormObject.memberSize, reply);
        addToSet('type', 'company', reply);
        return reply("company-redis reply");;
      }
    });
  }

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
