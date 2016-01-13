var template = module.exports = {};
var fs = require('fs');
var handlebars = require('handlebars');

template.buildQuote = function(quoteData){
  var source = fs.readFileSync(__dirname + '/../views/societydashboard.html');
  var quoteHTML = handlebars.compile(source.toString());

  return quoteHTML(quoteData);
};
