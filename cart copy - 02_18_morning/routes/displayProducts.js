const ProductDB = require('../productDB.js');
const Product = ProductDB.getModel();

// display products

module.exports = async (req , res , next) => {

        let products = await Product.find({});

        let results = products.map( pro => {
            return {
                id: pro._id,
                product: pro.productName,
                description: pro.description,
                price: pro.price,
                quantity: pro.quantity
            }
        });
        res.render('customerView',
                {title:"List of Products", data:results});
     
        
};