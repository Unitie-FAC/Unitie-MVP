exports.register = function (server, options, next) {

    server.route([
      {
        method: 'GET',
        path: '/',
        config: {
          description: 'return home page',
          handler: function(request,reply){
            console.log('in home.js');
            return reply.view('index',{title: 'Homepage-Unitie'});
          }
        }
      }

      ]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
