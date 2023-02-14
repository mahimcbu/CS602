// helpers.js
var Handlebars = require('handlebars');

module.exports= Handlebars.registerHelper('formatPrice', function(price) {
  return (Number(price)).toFixed(2);
});
module.exports= Handlebars.registerHelper('encodeURIComponent', function(str) {
  return encodeURIComponent(str);
});
