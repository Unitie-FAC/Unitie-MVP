var env = require('env2')('.env');
var mandrill = require('mandrill-api/mandrill');
var m = new mandrill.Mandrill(process.env.MANDRILL_REAL);
var mandrillEmail = module.exports = {};
var fs = require('fs');
var params;


mandrillEmail.mathsTest = function(num) {
  return num + 1;
};

mandrillEmail.acknowledgeSocietyEmail = function(userEmail, userFirstName) {


  fs.readFile('./assets/emails/societyfirstemail.txt', {
    encoding: 'utf-8'
  }, function(err, societyFirstHtmlEmaildata) {
    if (err) {
      console.log(err);
    }
    fs.readFile('./assets/emails/societysecondemail.txt', {
      encoding: 'utf-8'
    }, function(err, societySecondHtmlEmaildata) {
      if (err) {
        console.log(err);
      }

      params = {
        "message": {
          "from_email": "info@unitie.co.uk",
          "to": [{
            "email": userEmail
          }],
          "subject": "Hi *|FNAME|*! Welcome to Unitie",
          "html": "*|CONTENT1|*, *|FNAME|*, *|CONTENT2|*",
          "merge_vars": [{
            "rcpt": userEmail,
            "vars": [{
              "name": "FNAME",
              "content": userFirstName
            }, {
              "name": "CONTENT1",
              "content": societyFirstHtmlEmaildata
            }, {
              "name": "CONTENT2",
              "content": societySecondHtmlEmaildata
            }]
          }],
        }
      };
      //var async = false;
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

    });
  });

};

mandrillEmail.acknowledgeCompanyEmail = function(userEmail, userFirstName) {

  fs.readFile('./assets/emails/companyfirstemail.txt', {
    encoding: 'utf-8'
  }, function(err, companyFirstHtmlEmaildata) {
    if (err) {
      console.log(err);
    }
    fs.readFile('./assets/emails/companysecondemail.txt', {
      encoding: 'utf-8'
    }, function(err, companySecondHtmlEmaildata) {
      if (err) {
        console.log(err);
      }

      params = {
        "message": {
          "from_email": "info@unitie.co.uk",
          "to": [{
            "email": userEmail
          }],
          "subject": "Hi *|FNAME|*! Welcome to Unitie",
          "html": "*|CONTENT1|*, *|FNAME|*, *|CONTENT2|*",
          "merge_vars": [{
            "rcpt": userEmail,
            "vars": [{
              "name": "FNAME",
              "content": userFirstName
            }, {
              "name": "CONTENT1",
              "content": companyFirstHtmlEmaildata
            }, {
              "name": "CONTENT2",
              "content": companySecondHtmlEmaildata
            }],
          }]
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
    });
  });
};
