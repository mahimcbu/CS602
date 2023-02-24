const customerDB = require('../customerOrderDB.js');
const productDB = require('../productDB.js');

const Order = customerDB.getModel();
const Product = productDB.getModel();

module.exports = async function saveOrder(req, res, next) {
  const customerId = req.body.customerId;
  const total = req.body.total;
  const orderedProducts = JSON.parse(req.body.orderedProducts);

  const session = await Order.db.startSession(); // create a new session

  try {
    await session.withTransaction(async () => {
      // decrement product quantity and save order within the transaction
      for (let i = 0; i < orderedProducts.length; i++) {
        const orderedProduct = orderedProducts[i];
        const product = await Product.findById(orderedProduct.productId).session(session);
        if (!product) {
          throw new Error('Product not found');
        }
        if (product.quantity < orderedProduct.quantity) {
          throw new Error('Insufficient product quantity');
        }
        product.quantity -= orderedProduct.quantity;
        await product.save();
      }

      const order = new Order({
        customerId,
        orderedProducts,
        total
      });

      await order.save({ session });

      res.send({ status: 'success' });
    });
  } catch (error) {
    next(error);
  } finally {
    session.endSession(); // end the session when the transaction is complete
  }
};
