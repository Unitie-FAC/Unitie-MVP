var fs = require('fs');
var http = require('http');
var ac = {};


exports.register = function(server, options, next) {

    ac.import = function(callback) {
        if (!callback || typeof callback !== 'function') {
            return new Error('callback argument MUST be a function');
        }
        var filename = __dirname + '/universityList.txt';

        fs.readFile(filename, 'utf8', function(err, data) {
            ac.words = data.split('\n');
    
            return callback(err, ac.words);
        });
    };


    ac.findWord = function(string, callback) {
        var found = [];
        for (var i = 0; i < ac.words.length; i++) {
            var checkWord = ac.words[i].toUpperCase();
            var checkInput = string.toUpperCase();
            if (checkWord.search(checkInput) !== -1) {
           
                found.push(ac.words[i]);
            }
        }
        return callback(null, found);
    };

    ac.toTitleCase = function(userInput) {
           
        return  userInput[0].toUpperCase() + userInput.substring(1);
    };

    ac.connectorWordCheck = function(correctInput) {
   
        return correctInput.replace('Of','of');
    };

    server.route([{
        method: 'GET',
        path: '/autocomplete/{userInput}',
        config: {
            description: 'auto complete for university',
            handler: function(request, reply) {

                var userInput = request.params.userInput;
                var correctInput = ac.toTitleCase(userInput);

                ac.import(function(err, words) {
                    ac.findWord(correctInput, function(err, found) {
                        return reply(JSON.stringify(found));

                    });
                });

            }
        }
    }]);
    return next();
};

exports.register.attributes = {
    name: 'Autocomplete'
};
