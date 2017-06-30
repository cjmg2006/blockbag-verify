var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require('http');
var app = express();
var fs = require("fs");

function getBlockChainData (status_in) {
	var tierionurl="https://api.tierion.com/v1/records?datastoreId=";
	var method = "GET";
	var request = new XMLHttpRequest(); 

	var user = 'cjmg2006@gmail.com';
	var key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo=';
	var logStr;
	var data;
	switch(status_in) {
    case 'Installed':
        tierionurl = tierionurl+"1742";
        logStr="Getting Installed parts";  
        break;
    case "Retired":
        tierionurl = tierionurl+"1777";
        logStr="Gettting Retired parts";
        break;
    case "Recalled":
        tierionurl = tierionurl+"1778";
        logStr="Gettting Retired parts";
        break;
    default:
        tierionurl = tierionurl + "1738";
        logStr="Getting parts in stock";
	}
	console.log(logStr);
	request.open(method, tierionurl, false);

	console.log( "got here 1" );
	
	request.onload = function () {
   	var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   	console.log(status);
   	data = request.responseText; // Returned data, e.g., an HTML document.
	}
	
	console.log( "got here 2" );
//	request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//	request.setRequestHeader("Content-Length", payload.length);
	request.setRequestHeader('X-Username', user);
	request.setRequestHeader('X-Api-Key',key);
	request.send();
	  	
	console.log( "got here 2" );

	console.log( "got here 3" );
	console.log(data);
	return data;
}

function updateBlockChainData (part_in,vehicle_in,status_in) {
	var tierionurl="https://api.tierion.com/v1/records";
	var method = "POST";

	var request = new XMLHttpRequest(); 

	var inflatorID='f5340d3d-745d-4082-ae73-2625c809c856';
	var batchID='1';
	var airbagID='100';
	var manufacturerID='M12345';
	var coverID='77783864-8178-4edb-843a-b5bc01df4803';
	var user = 'cjmg2006@gmail.com';
	var key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo=';
	var logStr;
	var data;
	switch(status_in) {
    case 'Installed':
        datastoreID = "1742";
        vehicleID=vehicle_in;
        logStr="Installing part:" + part_in + " on vehicle:" + vehicle_in;  
        break;
    case "Retired":
        datastoreID = "1777";
        vehicleID=vehicle_in;
        logStr="Retiring part:" + part_in + " from vehicle:" + vehicle_in;
        break;
    case "Recalled":
        datastoreID = "1778";
        vehicleID=vehicle_in;
        logStr="Recalling part:" + part_in + " from vehicle:" + vehicle_in;
        break;
    default:
        datastoreID = "1738";
        vehicleID="";
        logStr="Adding part:" + part_in + " to stock";
	}
	console.log(logStr);
	var payload = JSON.stringify({ 'datastoreId': datastoreID, 
		'partID': part_in, 'vehicleID': vehicleID, 'status' : status_in, 'inflatorID': inflatorID, 
		'batchID': batchID,  'manufacturerID': manufacturerID 
	  });
	request.open(method, tierionurl, false);

	console.log( "got here 1" );
	
	request.onload = function () {
   	var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   	console.log(status);
   	data = request.responseText; // Returned data, e.g., an HTML document.
	}
	
	console.log( "got here 2" );
	request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	request.setRequestHeader("Content-Length", payload.length);
	request.setRequestHeader('X-Username', user);
	request.setRequestHeader('X-Api-Key',key);
	request.send(payload);
	  	
	console.log( "got here 2" );

	console.log( "got here 3" );
	console.log(data);
	return data;
}

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.post('/updatepart', function (req, res) {
   // Prepare output in JSON format
	response=updateBlockChainData (req.query.partID,req.query.vehicleID,req.query.status);
   res.end(JSON.stringify(response));
})

app.get('/getparts', function (req, res) {
   // Prepare output in JSON format
	response=getBlockChainData (req.query.status);
 //  res.end(JSON.stringify(response));
 	res.end(response);
})
 
	

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

