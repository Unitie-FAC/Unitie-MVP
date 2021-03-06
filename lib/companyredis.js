//var redisClient = require('redis');
// var redisClient = require('redis-connection')();
//var env = require('env2')('.env');
//var client = redisClient.createClient(process.env.REDIS_URL);
var client = require('./redis.js');
var mandrillEmail = require('./mandrill.js');
var Inert =require('inert');
var fs = require('fs');


exports.register = function(server, options, next) {



    var companyDatabase = function(request, replyHAPI) {

        var companyFormObject = request.payload;
        var timeNow = Date.now();
        var date = new Date(timeNow);
        var companyFormObjectKeys = Object.keys(companyFormObject);

        companyFormObjectKeys.forEach(function(elem, i){

          var regEx = new RegExp(/^[a-zA-Z0-9 .,?-]+$/);

          if((elem === "companyName" || elem === "contactName" || elem === "phone") &&
            regEx.exec(companyFormObject[elem.toString()]) === null
          ){

              companyFormObject[elem.toString()] = "";
          }
        });


        var thisId = client.incr('id', function(err, reply) {
            var companyHashArray = [reply, 'id', reply, 'timestamp', timeNow, 'date', date, 'type', 'company'];


            function addHashToDatabase(reply) {
                client.hmset.apply(client, companyHashArray.concat(function(err,reply){
                    if (err){
                      console.log(err);
                      return replyHAPI.view('companyformsuccess',{title:'Brands-Unitie'});
                    } else {
                      mandrillEmail.acknowledgeCompanyEmail(companyFormObject.email, companyFormObject.contactName);
                      return replyHAPI.view('companyformsuccess',{title:'Brands-Unitie'});
                    }
                }));
            }


            function addToSet(key, value, hashID) {
                var keyValue = key + ":" + value;
                client.sadd(keyValue, hashID);
            }

            //filtered fields industry, type of soc interested in, target region
            if (err) {
                console.log(err);
                // return reply("company-redis reply");
            } else {

                addToSet('type', 'company', reply);
                addToSet('industry', companyFormObject.industryType, reply);

                companyFormObjectKeys.forEach(function(element, i, array) {
                    companyHashArray.push(element);
                    companyHashArray.push(companyFormObject[element]);
                    if (element.indexOf("socInterest") > -1 || element.indexOf("targetRegion") > -1) {
                        addToSet(element, companyFormObject[element], reply);
                    }
                });
                addHashToDatabase(reply);

            }

        });


    };

    server.route([{
        method: 'POST',
        path: '/companyredis',
        config: {
            description: 'returns success message on addition.',
            handler: companyDatabase

        }
    }, {
        method: 'GET',
        path: '/company',
        config: {
            description: 'returns company page',
            handler: function(request, reply) {

                      return reply.view('company',{title:'Brands-Unitie'});

            }
        }
    }]);

    return next();
};

exports.register.attributes = {
    name: 'Companyredis'
};
