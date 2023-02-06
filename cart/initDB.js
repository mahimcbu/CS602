const ProductDB = require('./productDB.js');

const Product = ProductDB.getModel();

(async() => {

	await Product.deleteMany({});

	let product1 = new Product({
		productName:'Green apple',description:'Smith'
	}); 

	let product2 = new Product({
		productName:'Cherry tomato',description:'Smith'
	}); 

	let product3 = new Product({
		productName:'Banana',description:'Doe'
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