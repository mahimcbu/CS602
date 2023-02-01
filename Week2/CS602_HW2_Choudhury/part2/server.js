const express = require('express');
const app = express();

var js2xmlparser = require("js2xmlparser");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage

app.get('/',  (req, res) => {
	res.render('homeView');
});

app.get('/zip', function(req, res) {
    if (req.query.id) {
		var id = req.query.id.toString();
		var data = cities.lookupByZipCode(id);
		res.render('lookupByZipView', {zip: data});
    } else {
        res.render('lookupByZipForm');
    }
});


app.post('/zip', (req, res) => {
	var data = cities.lookupByZipCode(req.body.id);
	res.render('lookupByZipView', { zip: data });

});

// Implement the JSON, XML, & HTML formats

app.get('/zip/:id', (req, res) => {
	var data = cities.lookupByZipCode(req.params.id);
	if (req.accepts('json')) {
		res.json(data);
	} else if (req.accepts('xml')) {
		res.type('xml');
		res.send(js2xmlparser.parse("data", data)); //using a parser to simplify
	} else {
		res.render('lookupByZipView', { zip: data });
	}

});



app.get('/city', (req, res) => {

	if (req.query.city && req.query.state) {
		var city = req.query.city.toString();
		var state = req.query.state.toString();
		var data = cities.lookupByCityState(city,state);
		res.render("lookupByCityStateView", {cityData: data});
    } else {
        res.render('lookupByCityStateForm');
    }

	
});

app.post('/city', (req, res) => {
	var data = cities.lookupByCityState(req.body.city, req.body.state);
	res.render('lookupByCityStateView', { cityData: data });
});

// Implement the JSON, XML, & HTML formats

app.get('/city/:city/state/:state', (req, res) => {
	var data = cities.lookupByCityState(req.params.city, req.params.state);
	if (req.accepts('json')) {
		res.json(data);
	} else if (req.accepts('xml')) {
		res.type('xml');
		res.send(js2xmlparser.parse("data", data)); //using a parser to simplify
	} else {
		res.render('lookupByCityStateView', { cityData: data });
	}

});



app.get('/pop', (req, res) => {
	if (req.query.state) {
		var id = req.query.state.toString();
		var data = cities.getPopulationByState(id);
		res.render('populationView', {popData: data});
    } else {
        res.render('populationForm');
    }
});



// Implement the JSON, XML, & HTML formats

app.get('/pop/:state', (req, res) => {
	var data = cities.getPopulationByState(req.params.state);
	if (req.accepts('json')) {
		res.json(data);
	} else if (req.accepts('xml')) {
		res.type('xml');
		res.send(js2xmlparser.parse("data", data)); //using a parser to simplify
	} else {
		res.render('populationView', { popData: data });
	}

});


app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});




