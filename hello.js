var redisClient = require('redis-connection')();
redisClient.set('hello', 'world');
redisClient.get('hello', function (err, reply) {
  console.log('hello', reply.toString()); // hello world
  redisClient.quit();
});
