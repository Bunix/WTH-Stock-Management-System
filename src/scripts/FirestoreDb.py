import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class FirestoreDb:
  # Use a service account
  def __init__(self, database):
    # print(database)
    self.__cred = credentials.Certificate('C:\\Users\\Webike Thailand\\Documents\\Github\\Barcode-Management\\Webike-Glocal-Barcode-System\\src\\scripts\\token\\barcode-management-system-214a3f62145f.json')

    firebase_admin.initialize_app(self.__cred)
    self.db = firestore.client().collection(u'{}'.format(database))
    
  def getDocsId(self):
    docs = self.db.get()
    return list(map(lambda doc: doc.id, docs))
