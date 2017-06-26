console.log("Successfully loaded Javascript");

user = 'cjmg2006@gmail.com'
key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo='


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

	partID = getUrlParameter('partID');
	vehicleID = getUrlParameter('vehicleID');

	$("#partID").append('Part ID: ' + partID);

	// Check on blockchain 

	$.ajax( 
		{
			type: 'GET', 
			url: 'https://api.tierion.com/v1/records/' + partID, 
			headers: {'X-Username': user, 'X-Api-Key': key}
		}
	).done(function (data, status) { 
		$('body').css("background-color", "#42f468");
		$("#status-header").append("<h2> Success </h2>");
		$("#status-msg").append('Part successfully transferred to vehicle. Transfer successfully recorded on Public Vehicle Blockchain:');

		// Post onto the blockchain  
		$.ajax({ 
			type: "POST", 
			url: "https://api.tierion.com/v1/records",
			data: {	'vehicleID': vehicleID, 
					'partID': partID, 
					'timestamp': Date.now(),
					"datastoreId": 1742
				  }, 
			headers: {'X-Username': user, 'X-Api-Key': key} 
		})
		.done(function(data, status) { 

			// Update info 
			$("#success-panel").append("<p> vehicleID: " + vehicleID + "</p>");
			$("#success-panel").append("<p> partID: " + partID + "</p>");
			$("#success-panel").append("<p> timestamp: " + Date.now().toString() + "</p>");




		}); 



	})


	.error(function(data, status, errorThrown) {
		console.log(errorThrown);

		$('body').css("background-color", "#e53d49");
		$('.panel').hide();

		
	});

	// If verified, show one screen

	// If not verified, show another screen


});
