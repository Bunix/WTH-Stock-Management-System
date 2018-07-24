import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from pprint import pprint
from FirestoreDb import FirestoreDb
from EgZero import EgZero
import numpy as np

# Use a service account of Firesstore
order_db = FirestoreDb('Order_Db')
orderNumberLists = order_db.getDocsId()

# Get ordering data from Eg-Zero
eg_zero_db = EgZero('faisal.j@webike.co.th', '123456789Za')
orderingNumberLists = eg_zero_db.getOrderNumber(6)

# Get only new ordering number by filter
result = np.setdiff1d(orderingNumberLists[0], orderNumberLists)
print(result)
# print('------------------------------------')

# for doc in docs:
#     print(doc)

# # Open new data.json and upload to firebase
# with open('data.json') as f:
#     orderLists = json.load(f)

# # doc_ref = db.collection(u'Order_Db').document(u'ohPBzc9Gqu8oU8sDVAFI')
# for order in orderLists:
#     doc_ref.document(order['order_number']).set(order)
#     print('Add new order')
#     if order['order_number'] == 'P-MBH10SO1':
#         break
