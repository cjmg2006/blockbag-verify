import sys
import getopt
import json
import math
import datetime
import requests

previousID = sys.argv[1]

inflatorID='f5340d3d-745d-4082-ae73-2625c809c856'
materialID='f37b0a61-f12a-46b1-8d9b-c9bb249c43e5'
batchID='1'
airbagID='100'
manufacturerID='M12345'
coverID='77783864-8178-4edb-843a-b5bc01df4803'
status="Recalled"
user = 'cjmg2006@gmail.com'
key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo='
datastoreID='1738'

url="https://api.tierion.com/v1/records"	
payload = { 'datastoreId': datastoreID, 'inflatorID': inflatorID, \
	'materialID':materialID, 'batchID': batchID, 'airbagID': airbagID, 'manufacturerID': manufacturerID, \
	'coverID': coverID, 'status' : status, 'dataID': previousID }

headers = {'content-type': 'application/json', 'X-Username': user, 'X-Api-Key': key}

print(payload)
print(url)
r = requests.post(url, data=json.dumps(payload), headers=headers)
print(r)
	 
