const express = require('express');
const handlebars = require('express-handlebars');
var Handlebars = require('./helper');
var bodyParser = require('body-parser');

var app = express();


app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}));
app.set("view engine", 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});


app.listen(3000, function(){
    console.log("Connected to server");
});