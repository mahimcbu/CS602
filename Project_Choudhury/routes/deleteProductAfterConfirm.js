const productDB = require("../productDB.js");
const Product = productDB.getModel();


module.exports = async function deleteProductAfterConfirm(req,res){

    let id = req.body.id;

    let product = await Product.findById(id);

    if(!product){
        res.render('404');
        console.log("can't delete")
    }else{
        await product.remove();
        res.redirect('/admin');
    }
}