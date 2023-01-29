import time
from src.modules.persistence import Persistence, user_db, flight_db
from src.modules.user import User, user_data
from src.modules.flight import Flight

flight_data = {
    "AA 1511": {
        "boarding_time": "12:00",
        "departure_time": "15:00",
        "gate": "E31",
        "plane_type": "737-800",
    }
}


class ActionHandler:
    @classmethod
    def change_user_progress(cls, username, progress):
        Persistence.update_collection(user_db, username, {"status": progress})
        return [True, Persistence.get_collection(user_db, username)]
    

    @classmethod
    def login_request(cls, username, password):
        db_search_results = Persistence.get_collection(user_db, username)
        if not db_search_results:
            return [False, "invalid user"]
        if password != db_search_results.get("password"):
            return [False, "invalid password"]
        
        return [True, db_search_results]


    @classmethod
    def populate_users(cls):
        for name, data in user_data.items():
            temp_user = User(
                name,
                data.get("password"),
                data.get("level"),
                int(data.get("id")),
            )
            temp_user.flight_number = data.get("flight_num")
            temp_user.status = "unconfirmed"
            #Persistence.update_collection(user_db, "user_acc", {"bags": ['aaaa']})


    @classmethod
    def get_passenger_statuses(cls, flight_number):
        if not Persistence.get_collection(flight_db, flight_number): return [False, "Flight number invalid"]

        checked_in = security = concourse = boarded = 0

        for passenger in flight_data.get(flight_number).get("passengers"):
            match passenger.status:
                case "checked_in":
                    checked_in += 1
                case "security":
                    security += 1
                case "concourse":
                    concourse += 1
                case "boarded":
                    boarded += 1
        
        return [True, {
            "checked_in": checked_in,
            "security": security,
            "concourse": concourse, 
            "boarded": boarded
        }]
        
    
    @classmethod
    def add_flight_seat(cls, flight_number, username, flight_seat):
        flight_data = Persistence.get_collection(flight_db, flight_number)
        if not flight_data: return [False, "Flight number invalid"]
        row = flight_seat[0]
        column = flight_seat[1:]
        seats = flight_data.get("seats")
        user_data = Persistence.get_collection(user_db, username)
        if user_data.get("seat_number") != "":
            old_row = user_data.get("seat_number")[0]
            old_column = user_data.get("seat_number")[1:]
            seats[old_row][old_column] = [False, seats[old_row][old_column][1]]
        
        seats[row][column] = [True, seats[row][column][1]]

        Persistence.update_collection(flight_db, flight_number, {"seats": seats})
        Persistence.update_collection(user_db, username, {"seat_number": flight_seat})
        return [True, flight_seat]


    @classmethod
    def add_to_flight(cls, flight_number, username):
        if not Persistence.get_collection(flight_db, flight_number): return [False, "Flight number invalid"]
        flight_data.get(flight_number).get("passengers").append(username)
        return [True, username]
    

    @classmethod
    def add_bags(cls, flight_number, username, bag_count):
        if not Persistence.get_collection(flight_db, flight_number): return [False, "Flight number invalid"]
        to_add = [int(time.time()) - 1674952000 + i for i in range(bag_count)]

        Persistence.update_collection(user_db, username, {"bags": to_add})
        Persistence.update_collection(flight_db, flight_number, {"bags": to_add})
        return [True, to_add]
    

    @classmethod
    def get_user_status(cls, username):
        ret = {"user": Persistence.get_collection(user_db, username), "flight": None}
        flight_num = ret.get("user").get("flight_number")
        if ret["user"].get("flight_number") is not None:
            ret["flight"] = Persistence.get_collection(flight_db, flight_num)

        return [True, ret]


    @classmethod
    def change_flight_status(cls, flight_number, status_to_change_to):
        if not Persistence.get_collection(flight_db, flight_number): return [False, "Flight number invalid"]
        Persistence.update_collection(flight_db, flight_number, {"status": status_to_change_to})
        return [True, Persistence.get_collection(flight_db, flight_number)]
            
    
    @classmethod
    def populate_flights(cls):
        for f_num, f_data in flight_data.items():
            temp_flight = Flight(
                f_num,
                f_data.get("plane_type"),
                f_data.get("boarding_time"),
                f_data.get("departure_time"),
                f_data.get("gate")
            )
            #cls.add_flight_seat(temp_flight.flight_number, "user_acc", "3A")