import sys
import requests
from requests.auth import HTTPDigestAuth
import ast 
import json
import datetime



def main():
	assert(len(sys.argv) == 3)
	shop = sys.argv[1]
	jobID = sys.argv[2]
	
	url = 'https://api.tierion.com/v1/records/' + jobID
	user = 'cjmg2006@gmail.com'
	key = 'DiMw7Lp4WmuAK0cxMKxRLwQUlnaZEhmNBJ6LancuWuo='
	# print url 

	r = requests.get(url, headers={'X-Username': user, 'X-Api-Key': key, 'Content-Type': 'application/json'})
	# print r.content , type(r.content)

	response = json.loads(r.content)
	# response = ast.literal_eval(json.loads(r.content))

	# print response
	data = response.get('data')
	# print data


	now =  datetime.datetime.now()
	# print '%s' % now 

	print("Order timestamp: %s" % data.get('timestamp'))
	print("Shop " + data.get('shop_name') + " successfully repaired bike ID " + data.get('bikeid') + " at %s" % now) 
	print ("Successfully delivered $" + data.get('estimated_price') + " to shop " + data.get('shop_name'))

if __name__ == "__main__":
    main()