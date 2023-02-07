const productDB = require("../productDB.js");
const Product = productDB.getModel();


module.exports = async function saveAfterEdit(req,res){

    let id = req.body.id;

    let product = await Product.findById(id);

    if(!product){
        res.render('404');
    }else{
        product.productName = req.body.productName;
        product.description = req.body.description;
        product.price = req.body.price;
        product.quantity = req.body.quantity;

        await product.save();

        res.redirect('/admin');


    }



}