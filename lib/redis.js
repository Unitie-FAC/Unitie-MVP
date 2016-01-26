var bluebird = require('bluebird');
var env = require('env2')('.env');
var redisClient = require('redis');
bluebird.promisifyAll(redisClient.RedisClient.prototype);
bluebird.promisifyAll(redisClient.Multi.prototype);




var redisClientExport = redisClient.createClient(process.env.REDIS_URL);
//var redisClientExport = redisClient.createClient();

module.exports = redisClientExport;
