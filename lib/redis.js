var bluebird = require('bluebird');
var env = require('env2')('.env');
var redisClient = require('redis');
bluebird.promisifyAll(redisClient.RedisClient.prototype);
bluebird.promisifyAll(redisClient.Multi.prototype);

//module.exports = redisClient.createClient();
module.exports = redisClient.createClient(process.env.REDIS_URL);
