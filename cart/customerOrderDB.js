const mongoose = require('mongoose');
const credentials = require("./customerOrderCredentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let customerOrderSchema = new Schema({
    customerId: { type: String, required: true },
    order: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      productId: { type: String, required: true }
    }],
    totalAmount: { type: Number, required: true },
    // date: { type: Date, default: Date.now }
},{
    collection: 'customerOrders'
});


module.exports = {
    getModel: () => {
        if (connection == null) {
            console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            model = connection.model("CustomerOrderModel", customerOrderSchema);
        };
        return model;
    }
};
