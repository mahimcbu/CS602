const productDB = require('../productDB.js');
const Product = productDB.getModel();

module.exports = async function editProduct(req , res , next){

    let id = req.params.id;

    let product = await Product.findById(id);

     
     if (!product){
              res.render('404');
              
         }
      else {
              res.render('editProductView',
              {title:"Edit the product", 
               data: {id: product._id,
                      product: product.productName,
                      description: product.description,
                      price: product.price,
                      quantity: product.quantity
                    }
                   });                
      }

    
};