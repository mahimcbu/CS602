const ProductDB = require('./productDB.js');

const Product = ProductDB.getModel();

(async() => {

	await Product.deleteMany({});

	let product1 = new Product({
		productName:'Green apple',description:'Fresh produced green apple', price:3.00, quantity:20
	}); 

	let product2 = new Product({
		productName:'Cherry tomato',description:'Fresh garden red cherry tomato',price:2.50, quantity:30
	}); 

	let product3 = new Product({
		productName:'Banana',description:'Florida banana',price:1.90, quantity:20
	}); 


	await Promise.all([
            product1.save(), 
			product2.save(), 
			product3.save()
		]);

	let currentProduct = await Product.find({});

	console.log(currentProduct);

	process.exit();


})();