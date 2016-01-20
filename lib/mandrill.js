var env = require('env2')('.env');
var mandrill = require('mandrill-api/mandrill');
var m = new mandrill.Mandrill(process.env.MANDRILL_TEST);
var mandrillEmail = module.exports = {};
var params;

mandrillEmail.mathsTest = function(num){
  return num + 1;
};

mandrillEmail.acknowledgeEmail = function(userEmail, userFirstName, callback){
  params = {
    "message": {
      "from_email":"unitie@unitie.co.uk",
      "to":[{ "email": userEmail }],
      "subject": "Hi *|FNAME|*! Welcome to Unitie",
      "html": "Hi *|FNAME|*, *|CONTENT|* <p>Happy connecting.</p>",
      "merge_vars": [
        {
            "rcpt": userEmail,
            "vars": [
                 {
                     "name": "FNAME",
                     "content": userFirstName
                 },
                 {
                     "name": "CONTENT",
                     "content": "<p>James here the Founder of Causr. We created Causr to help you connect with professionals on the go.</p><p>Whether you\'re on your commute, the train, plane, in a line waiting somewhere there are people around you that you could help or they could help you. Whether that be to solve a big problem you\'ve been working on, recommend that hidden local restaurant or someone to collaborate with. There are missed opportunities everyday, we\'re here to make sure these connections happen that would otherwise be missed.</p>If you have any feedback, I\'d love to hear your thoughts. Help us make Causr better by emailing us with any comments at <a href='james@causr.co'>james@causr.co</a></p><p>Thanks again for signing up - it\'s great to have you part of our connected community.</p>"
                 }
             ]
        }
     ],
    }
  };
  var async = false;
  m.messages.send(params,
    function(response) {
      callback('Welcome Email Sent!');
    },
    function(error) {
      callback('Welcome Email not sent!');
    }
  );
};
