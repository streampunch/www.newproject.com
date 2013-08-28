function getProduct(product) {
	var $div = $('<div>',{ class : 'product'});
	$div
		.append($('<img>',{ src: product.images[6] }))
		.append($('<div>',{ class : 'product-name', text : product.productName }));
	return $div;
}

/*
hubsoft.ready(function(){
	console.log('ready');
	hubsoft.getProducts(
		{
			limit : 1000
		},
		function(data) {
			console.log(data);
			for(var i = 0; i < 10; i++) {
				$('.products').append(
					getProduct(data.products[i])
				);
			}
		}
	);
});
*/