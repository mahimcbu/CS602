// helpers.js
var Handlebars = require('handlebars');

Handlebars.registerHelper('formatPrice', function(price) {
  return (Number(price)).toFixed(2);
});

module.exports = Handlebars;