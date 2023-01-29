from collections import defaultdict
from src.modules.persistence import Persistence, flight_db

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
        if self.__initialized == True and key != "_Flight__initialized":
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
