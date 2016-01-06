var fs = require('fs');
var http = require('http');
var ac = {};


exports.register = function(server, options, next) {

    ac.import = function(callback) {
        if (!callback || typeof callback !== 'function') {
            return new Error('callback argument MUST be a function');
        }
        var filename = __dirname + '../assets/universityList.txt';
        console.log('filename', filename);
        fs.readFile(filename, 'utf8', function(err, data) {
            ac.words = data.split('\n');
            return callback(err, ac.words);
        });
    };



    ac.findWord = function(word, callback) {
        var found = [];
        for (var i = 0; i < ac.words.length; i++) {
            if (ac.words[i].search(word) === 0) {
                found.push(ac.words[i]);


            }
        }
        return callback(null, found);
    };
    
    ac.toTitleCase= function(userInput) {
        return userInput.replace(/\w\S*/g, function(txt) {
            return userInput.charAt(0).toUpperCase() + userInput.substr(1).toLowerCase();
        });
    };




    server.route([{
        method: 'GET',
        path: '/autocomplete/{userInput}',
        config: {
            description: 'auto complete for university',
            handler: function(request, reply) {

                var userInput = request.params.toString();
                console.log('Input', request.params);
                console.log('TYpe', typeof(userInput));
                var correctInput = ac.toTitleCase(userInput);
                console.log(correctInput);



         /*       ac.import(function(err, words) {
                    ac.findWord(correctInput, function(err, found) {
                        console.log(found);
                    });
                });*/
                return reply('hello AC BOOM');
            }
        }
    }]);
    return next();
};

exports.register.attributes = {
    name: 'Autocomplete'
};
