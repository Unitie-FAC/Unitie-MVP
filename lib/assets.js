exports.register = function (server, options, next) {

    server.route([
      {
        method: 'GET',
        path: '/assets/{params*}',
        config: {
          description: 'return home page',
          handler: {
            directory: {
              path: 'assets'
            }
          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Assets'
};
