'use strict'

var urlPrefix = "http://52.53.164.50:8081/updatepart?partID=P24S44pZ30yJZuYpr4EB5A&vehicleID=60&status="

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


$(document).ready(function(){

    jQuery.support.cors = true;


	status = getUrlParameter('status'); 
	console.log(status); 

	
	var url = urlPrefix + status; 

	// send to server 
	$.ajax({ 
			type: "GET", 
			url: url
			// data: {	'vehicleID': vehicleID, 
			// 		'partID': partID, 
			// 		'status': status,
			// 		"datastoreId": 1742
			// 	  }, 
			// headers: {'X-Username': user, 'X-Api-Key': key} 
	})
	.done(function(data, status) {
		if(status === 'retired') { 
			$('body').css("background-color", "#fff375");
			$(".part-status").append("<h2> Part successfully retired </h2>");
			$(".part-msg").append("<p> The public vehicle record has been successfully updated. </p>");
		} else if (status === 'installed') { 
			$('body').css("background-color", "#42f468");
			$(".part-status").append("<h2> Part successfully installed </h2>");
			$(".part-msg").append("<p> The public vehicle record has been successfully updated. </p>");

		}
	
	}); 

	

});