const customerDB = require("../customerOrderDB.js");
const productDB = require("../productDB.js");
const Order = customerDB.getModel();
const Product = productDB.getModel();

module.exports = async function deleteOrder(req, res) {
  const customerId = req.body.customerId;
  const order = await Order.findOne({customerId});
  if (!order) {
    console.log(`Order with customerId ${customerId} not found.`);
    res.render('404');
    return;
  }

  // Add ordered quantity back to products
  for (let i = 0; i < order.orderedProducts.length; i++) {
    const orderedProduct = order.orderedProducts[i];
    const products = await Product.find({ _id: orderedProduct.productId });
    if (!products || products.length === 0) {
      console.log(`Product with productId ${orderedProduct.productId} not found.`);
      continue;
    }

    for (let j = 0; j < products.length; j++) {
      const product = products[j];
      product.quantity += orderedProduct.quantity;
      await product.save();
    }
  }

  await order.remove();
  console.log(`Order with customerId ${customerId} successfully deleted.`);
  res.redirect('/admin/orders');
};
