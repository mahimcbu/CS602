const productDB = require("../productDB.js");
const Product = productDB.getModel();

module.exports = async function saveAfterCart(req, res) {
    let id = req.body.id;

    // Check if the quantity value is defined before updating the product quantity
    if (req.body.quantity !== undefined) {
        let product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        product.quantity = req.body.quantity;
        await product.save();
        res.redirect("/admin");
    }
};
