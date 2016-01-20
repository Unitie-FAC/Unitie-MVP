exports.register = function(server, options, next) {

  server.route({
    path: '/favicon.png',
    method: 'get',
    config: {
      cache: {
        expiresIn: 1000*60*60*24*21

      }
    },
    handler: { file : './favicon.png'}


  });

  return next();
};

exports.register.attributes = {
  name : 'Favicon'
};
