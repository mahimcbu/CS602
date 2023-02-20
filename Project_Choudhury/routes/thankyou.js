module.exports = function thankyou(req, res, next) {
	const { customerId, orderedProducts, total } = req.body;
	res.render('thankyouPage', {
	  title: 'Ordered',
	  customerId,
	  orderedProducts,
	  total
	});
  }