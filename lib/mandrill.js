var env = require('env2')('.env');
var mandrill = require('mandrill-api/mandrill');
var m = new mandrill.Mandrill(process.env.MANDRILL_REAL);
var mandrillEmail = module.exports = {};
var fs = require('fs');
var params;

var createAsyncCounter = function(total, cb) {
  var count = 0;
  var results = [];
  var errs = [];
  return function(data, index, err) {
    count += 1;
    if (!err) {
      results[index] = data;
    } else {
      errs.push(err);
    }
    if (count === total) {
      cb(results, errs);
    }
  };
};

mandrillEmail.mathsTest = function(num) {
  return num + 1;
};

mandrillEmail.acknowledgeSocietyEmail = function(userEmail, userFirstName) {

  var societyFirstHtmlEmaildata;
  var societySecondHtmlEmaildata;


  fs.readFile('./assets/emails/societyfirstemail.txt', {
      encoding: 'utf-8'
    }, function(err, societyFirstHtmlEmail) {
      if (err) {
        console.log(err);
        // return err;
      }
      // counter++;index
      // console.log('counter1', counter);

      // societyFirstHtmlEmaildata = societyFirstHtmlEmail;
      counter(societyFirstHtmlEmail, 0, err);
  });

fs.readFile('./assets/emails/societysecondemail.txt', {
  encoding: 'utf-8'
}, function(err, societySecondHtmlEmail) {
  if (err) {
    console.log(err);
    // return err;
  }
  // counter++;
  // console.log('counter2', counter);

  // societySecondHtmlEmaildata = societySecondHtmlEmail;
  counter(societySecondHtmlEmail, 1, err);
});


var counter = createAsyncCounter(2, function(results, errs) {

    params = {
      "message": {
        "from_email": "info@unitie.co.uk",
        "to": [{
          "email": userEmail
        }],
        "subject": "Hi *|FNAME|*! Welcome to Unitie!",
        "html": "*|CONTENT1|* *|FNAME|* *|CONTENT2|*",
        "merge_vars": [{
          "rcpt": userEmail,
          "vars": [{
            "name": "FNAME",
            "content": userFirstName
          }, {
            "name": "CONTENT1",
            "content": results[0]
          }, {
            "name": "CONTENT2",
            "content": results[1]
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
          "subject": "Hi *|FNAME|*! Welcome to Unitie!",
          "html": "*|CONTENT1|* *|FNAME|* *|CONTENT2|*",
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
