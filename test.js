console.log("Successfully loaded Javascript");


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


$(document).ready(function() { 
	console.log("Ready");

	console.log(getUrlParameter('test')); 


	user = 'cjmg2006@gmail.com'
	key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo='

	$.ajax({
		type: "POST",
		url: "https://api.tierion.com/v1/records",
		data: {'test': 'test', "datastoreId": 1742}, 
		headers: {'X-Username': user, 'X-Api-Key': key} }) 

	.done(function() {
		return $.ajax({
			type: "GET",
			url: "https://api.tierion.com/v1/records/2nJgb2Kx4UiftVYzUEMGzA" ,
			headers: {'X-Username': user, 'X-Api-Key': key}
		}) 
	})

	.done(function(data, status)  {
		console.log(data);
		console.log(status);
		$("#info").append(data.data.test);
	});

}); 



