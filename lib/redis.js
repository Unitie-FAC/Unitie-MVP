var bluebird = require('bluebird');
var redisClient = require('redis');
bluebird.promisifyAll(redisClient.RedisClient.prototype);
bluebird.promisifyAll(redisClient.Multi.prototype);

module.exports = redisClient.createClient();
