var express = require('express');
var router = express.Router();

// other modules
var displayProducts 	= require("./displayProducts");
var adminDisplayProducts 	= require("./adminDisplayProducts");

// var displayOrderHistory 	= require("./displayOrderHistory");
// var saveOrder = require('./saveOrder')
var thankyou = require('./thankyou');
var addProduct 			= require("./addProduct");
var saveProduct 			= require("./saveProduct");
var editProduct			= require("./editProduct");
var saveAfterEdit 	= require("./saveAfterEdit");
var deleteProduct 		= require("./deleteProduct");
var deleteProductAfterConfirm 		= require("./deleteProductAfterConfirm");
// const saveOrder = require('./saveOrder');

// router specs
router.get('/', function(req, res, next) {
    res.redirect('/customer');
  });
  
  router.get('/customer', displayProducts);
  router.get('/admin', adminDisplayProducts);

//   router.get('/customer/checkout', displayOrderHistory);
  
  router.get('/admin/add', 				addProduct);
  router.post('/admin/add', 			saveProduct);
  
  router.get('/admin/edit/:id', 	editProduct);
  router.post('/admin/edit/', 	saveAfterEdit);
  
  router.get('/admin/delete/:id', deleteProduct);
  router.post('/admin/delete', deleteProductAfterConfirm);

  router.get('/customer/thankyou', thankyou);
  // router.post('/customer', saveOrder);


  
  module.exports = router;
  