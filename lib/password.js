exports.register = function(server, options, next) {



    server.route([{
        method: 'POST',
        path: '/password',
        config: {
            description: 'check password and username',
            handler: function(request, reply) {
                if (request.payload.username === 'Unitie' && request.payload.password === '2016') {
                        console.log('in PASSWORD VERIFIED');
                        return reply('verified');
                }else{

                        return reply('Incorrect');
                }
            
                
            }

        }

    }]);

    return next();
};

exports.register.attributes = {
    name: 'Password'
};
