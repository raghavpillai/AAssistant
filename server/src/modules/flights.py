from collections import defaultdict
from src.modules.persistence import Persistence, user_db, flight_db

flight_data = {
    "AA_1511": {
        "boarding_time": "12:00",
        "departure_time": "15:00",
        "gate": "E31",
        "plane_type": "737-800",
    }
}

class Flight:
    __initialized = False

    @staticmethod
    def get_flight_seats(plane_type: str) -> dict:
        if plane_type == "737-800":
            seats = defaultdict(list)
            for row in range(3, 7):
                our_row = {}
                for column in ['A','B','E','F']:
                    our_row[column] = [False, 50]
                seats[str(row)] = our_row
            for row in range(7, 31):
                our_row = {}
                for column in ['A','B','C','D','E','F']:
                    if row <= 15:
                        our_row[column] = [False, 10]
                    else:
                        our_row[column] = [False, 0]
                seats[str(row)] = our_row
            return seats

    def __setattr__(self, key, value):
        super(Flight, self).__setattr__(key, value)
        if self.__initialized == True and key != "_User__initialized":
            Persistence.update_collection(flight_db, self.flight_number, {key: value})
    
    def __init__(self, flight_number: str, plane_type: str, boarding_time: str, departure_time: str, gate: str) -> None:
        self.flight_number = flight_number
        self.boarding_time = boarding_time
        self.departure_time = departure_time
        self.gate = gate
        self.current_boarding_group = None
        self.status = "N/A"
        self.plane_type = plane_type

        self.passengers = []
        self.bags = []
        self.seats = dict(self.get_flight_seats(self.plane_type))
        Persistence.update_collection(
            flight_db,
            self.flight_number,
            {
                "boarding_time": self.boarding_time,
                "departure_time": self.departure_time,
                "gate": self.gate,
                "current_boarding_group": self.current_boarding_group,
                "status": self.status,
                "plane_type": self.plane_type,
                "passengers": self.passengers,
                "bags": self.bags,
                "seats": self.seats
            }
        )

class Flights:

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
    def add_bags(cls, flight_number, username, bags):
        if not Persistence.get_collection(flight_db, flight_number): return [False, "Flight number invalid"]
        Persistence.update_collection(user_db, username, {"bags": bags})
        Persistence.update_collection(flight_db, flight_number, {"bags": bags})
        return [True, bags]
    

    @classmethod
    def get_flight_status(cls, flight_number):
        return (
            [True, Persistence.get_collection(flight_db, flight_number)]
            if Persistence.get_collection(flight_db, flight_number)
            else [False, "Flight number invalid"]
        )


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