
const customerDB = require('../customerOrderDB.js');
const productDB = require('../productDB.js');

const Order = customerDB.getModel();
const Product = productDB.getModel();

module.exports = function saveOrder(req, res, next) {
  const customerId = req.body.customerId;
  const total = req.body.total;
  const orderedProducts = JSON.parse(req.body.orderedProducts);

  // save order
  const order = new Order({
    customerId,
    orderedProducts,
    total
  });

  order.save((error) => {
    if (error) {
      return next(error);
    }

    // update product quantity
    const promises = orderedProducts.map(async (orderedProduct) => {
      const product = await Product.findById(orderedProduct.productId);
      if (!product) {
        throw new Error('Product not found');
      }
      product.quantity -= orderedProduct.quantity;
      await product.save();
    });

    Promise.all(promises)
      .then(() => {
        res.send({ status: 'success' });
      })
      .catch((error) => {
        return next(error);
      });
  });
};


