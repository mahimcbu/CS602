const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let productSchema = new Schema({
	productName : {
		type: String,
		required: true
	},
	description : {
		type: String,
		required: true
	}
}, {
	collection: 'products'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("ProductModel", 
            productSchema);
		};
		return model;
	}
};