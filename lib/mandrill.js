var env = require('env2')('.env');
var mandrill = require('mandrill-api/mandrill');
var m = new mandrill.Mandrill(process.env.MANDRILL_TEST);
var mandrillEmail = module.exports = {};
var params;

mandrillEmail.mathsTest = function(num){
  return num + 1;
};

mandrillEmail.acknowledgeEmail = function(userEmail, userFirstName){
  params = {
    "message": {
      "from_email":"info@unitie.co.uk",
      "to":[{ "email": userEmail }],
      "subject": "Hi *|FNAME|*! Welcome to Unitie",
      "html": "Hi *|FNAME|*, *|CONTENT|* <p>Unitie</p>",
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
                     "content": "<p>Unitie</p><a href='info@unitie.co.uk'>info@unitie.co.uk</a></p><p>Email working</p>"
                 }
             ]
        }
     ],
    }
  };
  var async = false;
  m.messages.send(params,
    function(response) {
      console.log("mandrill response", response);
      //callback('Welcome Email Sent!');
    },
    function(error) {
      console.log("mandrill error", error);
      //callback('Welcome Email not sent!');
    }
  );
};
