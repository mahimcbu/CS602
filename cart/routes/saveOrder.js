const customerDB = require('../customerOrderDB.js');

const Customer = customerDB.getModel();

module.exports =  
  async function saveOrder(req,res,next){
  
 try {
    const customerOrder = new Customer({
      customerId: req.body.customerId,
      order: req.body.order,
      totalAmount: req.body.totalAmount
    });
    await customerOrder.save();
    res.status(201).send({ message: "Order saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving order" });
  }
  };