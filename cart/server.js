const express = require('express');
const handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}));
app.set("view engine", 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.send("Hi from the server");
})


app.get('/customer', function(req,res){
    res.render('customerView');
})
app.get('/customer/history', function(req,res){
    res.render('customerHistoryView');
});
app.get('/admin', function(req,res){
    res.render('adminView');
});

app.listen(3000, function(){
    console.log("Connected to server");
});