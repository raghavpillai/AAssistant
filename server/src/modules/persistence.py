from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database

cluster: str = "mongodb+srv://zen:aapass@aassistant.p1lyoq5.mongodb.net/test" # CLUSTER IP
try:
    client: MongoClient = MongoClient(cluster)
    db: Database = client["db"]
    user_db: Collection = db.users
    flight_db: Collection = db.flights
except:
    print("Could not connect to MongoDB")

#print(client.list_database_names()) # List database names
#print(db.list_collection_names())

user_dict = {
    "user_acc": {
        "id": 67702,
        "password": "test_password",
        "level": "user",
        "flight_num": "AA 1511"
    }
}

class Persistence:
    @classmethod
    def get_collection(cls, collection: Collection, key):
        if not isinstance(collection, Collection): 
            print("Not a valid collection")
            return 0
        return collection.find_one({"name": key})
        

    @classmethod
    def update_collection(cls, collection: Collection, key: str, value: dict):
        if not isinstance(collection, Collection): 
            print("Not a valid collection")
            return 0

        if not isinstance(value, dict):
            print("Not a valid dict value")
            return 0

        if collection.count_documents({"name": key}) == 0:
            value.update({"name": key})
            return collection.insert_one(value)

        # if not isinstance(list(value.values())[0], list) or not value:
        #     print(value)
        # else:
        #     print(value)
        #     print("AAA", next(iter(value)), list(value.values())[0] )

        return collection.update_one(
            {"name": key},
            {"$set": value}
            if not isinstance(list(value.values())[0], list) or not value
            else {
                "$push": {next(iter(value)): {"$each": list(value.values())[0]}}
            }
        )

#found = user_db.count_documents({"name": "admin_acc"})
##print(found)
# result = user_db.insert_one(user_dict)
# print(result)