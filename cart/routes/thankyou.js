module.exports = 
		function thankyou(req,res,next){
			res.render('thankyouPage',{title: 'Ordered'});
		};