console.log("Successfully loaded Javascript");

$(document).ready(function() { 
	console.log("Ready");

	user = 'cjmg2006@gmail.com'
	key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo='

	$.ajax({
		type: "POST",
		url: "https://api.tierion.com/v1/records",
		data: {'test': 'test', "datastoreId": 1742}, 
		headers: {'X-Username': user, 'X-Api-Key': key},
		success: function() { 
			$.ajax({
				type: "GET",
				url: "https://api.tierion.com/v1/records/2nJgb2Kx4UiftVYzUEMGzA" ,
				headers: {'X-Username': user, 'X-Api-Key': key},
				success: function(data, status) { 
					console.log(data);
				}
			});
		}
	})




}); 
