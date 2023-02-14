const productDB = require("../productDB.js");
const Product = productDB.getModel();

module.exports = async function saveAfterCart(req, res) {
    let id = req.body.id;

    let product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
  
    product.quantity = req.body.quantity;
    await product.save();
  };