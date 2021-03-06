// var redisClient = require('redis-connection')();
// var redisClient = require('redis');
// var client = redisClient.createClient();
// var env = require('env2')('.env');

var client = require('./redis.js');
var mandrillEmail = require('./mandrill.js');

exports.register = function(server, options, next) {

  var societyDatabase = function(request, replyHAPI) {

    var societyFormObject = request.payload;
    var timeNow = Date.now();
    var date = new Date(timeNow);


    var societyFormObjectKeys = Object.keys(societyFormObject);

    societyFormObjectKeys.forEach(function(elem, i) {

      var regEx = new RegExp(/^[a-zA-Z0-9 .,?-]+$/);

      if ((elem === "societyName" || elem === "university" || elem === "phone") &&
        regEx.exec(societyFormObject[elem.toString()]) === null
      ) {

        societyFormObject[elem.toString()] = "";
      }
    });


    client.incr('id');
    var thisId = client.get('id', function(err, reply) {
      addHashToDatabase(reply);
      addToSet('university', societyFormObject.university, reply);
      addToSet('region', societyFormObject.region, reply);
      addToSet('typeSociety', societyFormObject.typeSociety, reply);
      addToSet('memberSize', societyFormObject.memberSize, reply);
      addToSet('type', 'society', reply);

    });

    function addHashToDatabase(reply) {
      client.hmset(reply, 'id', reply, 'timestamp', timeNow, 'date', date, 'societyName', societyFormObject.societyName, 'university', societyFormObject.university, 'region', societyFormObject.region, 'typeSociety', societyFormObject.typeSociety, 'memberSize', societyFormObject.memberSize, 'email', societyFormObject.email, 'phone', societyFormObject.phone, 'aboutus', societyFormObject.aboutus, 'societyLogo', societyFormObject.societyLogo, function(err, reply) {
        if (err) {
          console.log(err);
          return replyHAPI.view('societyformfail',{title:'Societies -Unitie'});
        } else if (reply) {
          mandrillEmail.acknowledgeSocietyEmail(societyFormObject.email, societyFormObject.societyName);
          return replyHAPI.view('societyformsuccess',{title:'Societies -Unitie'});
        }
      });

    }

    function addToSet(key, value, hashID) {
      var keyValue = key + ":" + value;
      client.sadd(keyValue, hashID);
    }


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
      description: 'returns society page',
      handler: function(request, reply) {

        return reply.view('society',{title:'Societies -Unitie'});
      }
    }
  }]);

  return next();
};

exports.register.attributes = {
  name: 'Societyredis'
};
