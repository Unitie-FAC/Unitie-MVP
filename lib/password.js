var env = require('env2')('.env');

exports.register = function(server, options, next) {



    server.route([{
        method: 'POST',
        path: '/password',
        config: {
            description: 'check password and username',
            handler: function(request, reply) {
                if (request.payload.username === process.env.UNITIEADMIN_USER && request.payload.password === process.env.UNITIEADMIN_PWD) {
                // if (request.payload.username === 'unitie' && request.payload.password === '2016') {

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
