exports.register = function (server, options, next) {

    server.route([
      {
        method: 'GET',
        path: '/admin',
        config: {
          description: 'return admin page',
          handler: function(request,reply){
            return reply.view('admin');
          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Admin'
};
