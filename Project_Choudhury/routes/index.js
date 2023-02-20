var express = require('express');
var router = express.Router();

// other modules
var displayProducts 	= require("./displayProducts");
var adminDisplayProducts 	= require("./adminDisplayProducts");

var displayOrders 	= require("./displayOrders");
var saveOrder = require('./saveOrder');
var thankyou = require('./thankyou');
var addProduct 			= require("./addProduct");
var saveProduct 			= require("./saveProduct");
var editProduct			= require("./editProduct");
var saveAfterEdit 	= require("./saveAfterEdit");
var deleteProduct 		= require("./deleteProduct");
var deleteProductAfterConfirm 		= require("./deleteProductAfterConfirm");
var deleteOrdersAfterConfirm = require("./deleteOrdersAfterConfirm");
var deleteOrder = require("./deleteOrder");

const saveAfterCart = require('./saveAfterCart')

// router specs
router.get('/', function(req, res, next) {
    res.redirect('/customer');
  });
  
  router.get('/customer', displayProducts);
  router.get('/admin', adminDisplayProducts);

  router.get('/admin/orders', displayOrders);

  router.get('/orders/delete/:customerId', deleteOrder);
  router.post('/orders/delete/confirm', deleteOrdersAfterConfirm);
  
  router.get('/admin/add', 				addProduct);
  router.post('/admin/add', 			saveProduct);
  
  router.get('/admin/edit/:id', 	editProduct);
  router.post('/admin/edit', 	saveAfterEdit);
  
  router.get('/admin/delete/:id', deleteProduct);
  router.post('/admin/delete', deleteProductAfterConfirm);

  router.get('/customer/order', thankyou);
  router.post('/customer/order', saveOrder);


  router.post('/customer/edit', 	saveAfterCart);




  // json - xml routes

  var displayproductsinjsonxml = require("./displayproductsinjsonxml");
  var displayProductSearch = require("./displayProductSearch");
  var displayProductinPriceRange = require("./displayProductinPriceRange");




  router.get('/products', displayproductsinjsonxml);
  router.get('/products/search', displayProductSearch);
  router.get('/products/price', displayProductinPriceRange);




  module.exports = router;
  