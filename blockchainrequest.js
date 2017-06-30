function getBlockChainData (status,datastoreID) {

	var inflatorID='f5340d3d-745d-4082-ae73-2625c809c856';
	var materialID='f37b0a61-f12a-46b1-8d9b-c9bb249c43e5';
	var batchID='1';
	var airbagID='100';
	var manufacturerID='M12345';
	var coverID='77783864-8178-4edb-843a-b5bc01df4803';
	var status="Recalled";
	var user = 'cjmg2006@gmail.com';
	var key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo=';
	var datastoreID='1738';

	var payload = { 'datastoreId': datastoreID, 'inflatorID': inflatorID, 
	'materialID':materialID, 'batchID': batchID, 'airbagID': airbagID, 'manufacturerID': manufacturerID, 
	'coverID': coverID, 'status' : status };
	request.open(method, url, async);

	
	var tierionurl="https://api.tierion.com/v1/records";
	var method = "POST";
	var async = false;

	var request = new XMLHttpRequest(); 
	request.onload = function () {
   	var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   	var data = request.responseText; // Returned data, e.g., an HTML document.
	}
	
	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader('X-Username', user);
	request.setRequestHeader('X-Api-Key',key);
	request.send(payload);
}