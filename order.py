import sys
import getopt
import csv 
import math
import datetime
import requests
# import pygsheets

 
url = "https://tierion.com/form/submit"

f1 = file('bikeShopData.csv', 'rb')
f2 = file('bikeReports.csv', 'rb')

kDist = 100
kPrice = 200

# Handle matching the query to the row 

def main():
	
	assert(len(sys.argv) == 8)
	bikeID = sys.argv[1]
	bikeX = int(sys.argv[3])
	bikeY = int(sys.argv[4])
	numWheels = int(sys.argv[5])
	numSpokes = int(sys.argv[6])
	numGears  = int(sys.argv[7])

	shops = csv.reader(f1)
	reports = csv.reader(f2)

# skip headers
	next(f1)
	next(f2)

	# READ COMMAND LINE 

	# for r_row in reports:
	# 	print("Querying for bike", r_row[0])
	# 	bikeX = int(r_row[2])
	# 	bikeY = int(r_row[3])
	# 	numWheels = int(r_row[4])
	# 	numSpokes = int(r_row[5])
	# 	numGears  = int(r_row[6])

	# print (numWheels, numSpokes, numGears)

	eligibleShops = []

	for s_row in shops: 
		numWheelsAvailable = int(s_row[4])
		numSpokesAvailable = int(s_row[5])
		numGearsAvailable  = int(s_row[6]) 
		# print (numWheelsAvailable, numSpokesAvailable, numGearsAvailable)

		if(numWheelsAvailable >= numWheels and numSpokesAvailable > numSpokes and numGearsAvailable > numGears):
			# print(s_row[0], s_row[1])
			eligibleShops.append(s_row) 


	result = []
	# min_score = 10000000 
	shortest_distance = 100000000 
	lowest_price = 10000000

	#filter by location 
	for shop in eligibleShops: 
		shopX = int(shop[2])
		shopY = int(shop[3])
		distance = math.hypot((shopX-bikeX), (shopY-bikeY) )
		# price = int(shop[8]) 

		# score = (float) distance / kDist + (float) price / kPrice

		if distance < shortest_distance: 
			result = shop
			# shortest_distance = distance
			shortest_distance = distance
		 

	
	assignTime = datetime.datetime.now()

	LaborPrice = int(result[7])
	WheelPrice = int(result[8]) 
	SpokePrice = int(result[9])
	GearPrice  = int(result[10])

	estimatedPrice = LaborPrice + numWheels * WheelPrice + numSpokes * SpokePrice + numGears * GearPrice

	print("Shop assigned: "+ result[0] + " for bike " + bikeID + " at " + '%s' % assignTime + " with estimated price of %d " % estimatedPrice) 
	payload = { '_key': '33xAmHWVA0W97vqS7Im7iA', 'shop_name': result[0], 'timestamp' : assignTime, 'estimated_price' : estimatedPrice, 'bikeID': bikeID}
	r = requests.post(url, payload)

	f1.seek(0)
	next(f1)
	 

if __name__ == "__main__":
    main()

 

# def calculateDistance(x1, y1, x2, y2): 
# 	return math.sqrt((x1-x2)**2 + (y1-y2)**2))

# next(f1)


