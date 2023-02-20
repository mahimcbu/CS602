const customerDB = require('../customerOrderDB.js');

const Order = customerDB.getModel();

module.exports = async (req, res, next) =>{
    let orders = await Order.find({});
    let results = orders.map(or =>{
        return{
            customerId: or.customerId,
            orderedProducts: or.orderedProducts,
            total: or.total
        }
    });    
    res.render('deleteOrderView', {
        title: 'Delete this order',
        data: results
    });
}
