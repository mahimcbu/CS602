const customerDB = require('../customerOrderDB.js');

const Order = customerDB.getModel();


// module.exports =  
//   async function saveOrder(req,res,next){
  
//  try {
//     const customerOrder = new Customer({
//       customerId: req.body.customerId,
//       order: req.body.order,
//       totalAmount: req.body.totalAmount
//     });
//     await customerOrder.save();
//     res.status(201).send({ message: "Order saved successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error saving order" });
//   }
//   };

// module.exports = 
// 		function saveOrder(req,res,next){
// 			// access the data sent in the request body using req.body
//   const customerId = req.body.customerId;
//   const orderedProducts = req.body.orderedProducts;
//   const total = req.body.total;
  
//   // process the order data and save it to the database, if necessary
  
//   // send a response to the client to indicate that the order was successfully processed
//   res.send({ status: "success" });
// };



// create a model based on the order schema
// const Order = mongoose.model('Order', orderSchema);
module.exports =
function saveOrder(req, res, next) {
  const customerId = req.body.customerId;
  const total = req.body.total;
  const orderedProducts = JSON.parse(req.body.orderedProducts);

  // console.log(customerId, total, orderedProducts);
  
  const order = new Order({
    customerId,
    orderedProducts,
    total
  });
    order.save((error) => {
    if (error) {
      return next(error);
    }
    // console.log(req.body);
    res.send({ status: "success" });
  });
}

