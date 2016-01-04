exports.register = function(server , options, next){
  
  server.route({
     method: 'GET',
     path: '/',
     handler: { file: "./public/index.html"}
  });
  
  return next();

};

exports.register.attributes = {
  name: 'Home'
};