const ProductDB = require('../productDB.js');

const Product = ProductDB.getModel();

module.exports =  
  async function saveEmployee(req,res,next){
  
    let product = new Product({
		productName: req.body.productName,
        description: req.body.description,
        price: req.body.price, 
        quantity: req.body.quantity
	}); 
 
    await product.save();


    res.redirect('/admin');
  }