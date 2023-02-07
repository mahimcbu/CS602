module.exports = 
		function addProduct(req,res,next){
			res.render('addProductView',{title: 'Add a Product'});
		};