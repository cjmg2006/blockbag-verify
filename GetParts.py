import sys
import getopt
import json
import math
import datetime
import requests
 

partID = sys.argv[1]
assignTime = datetime.datetime.now()
url = 'https://api.tierion.com/v1/records?datastoreId=' + partID

user = 'cjmg2006@gmail.com'
key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo='
	
r = requests.get(url, headers={'X-Username': user, 'X-Api-Key': key, 'Content-Type': 'application/json'})
	# print r.content , type(r.content)

response = json.loads(r.content)

print(url)

print(response)
for id in response[0]:   
        print id
	 