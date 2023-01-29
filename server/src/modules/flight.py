from collections import defaultdict
from src.modules.persistence import Persistence, flight_db

planes = { # [ [start,end seat (continuous)], [seats], price ]
    "737-800": [
        [ [3,7],['A','B','E','F'],50],
        [ [7,15],['A','B','C','D','E','F'],10],
        [ [15,31], ['A','B','C','D','E','F'],0]
    ]
}

class Flight:
    __initialized = False

    @staticmethod
    def get_flight_seats(plane_type: str) -> dict:
        seats = defaultdict(list)
        for row_set in planes.get(plane_type):
            for row in range(row_set[0][0], row_set[0][1]):
                our_row = {}
                for column in row_set[1]:
                    our_row[column] = [False, row_set[2]]
                seats[str(row)] = our_row
        return seats


    def __setattr__(self, key, value):
        super(Flight, self).__setattr__(key, value)
        if self.__initialized == True and key != "_Flight__initialized":
            Persistence.update_collection(flight_db, self.flight_number, {key: value})
    
    
    def __init__(self, flight_number: str, plane_type: str, boarding_time: str, departure_time: str, gate: str, origin: list, destination: list) -> None:
        self.flight_number = flight_number
        self.boarding_time = boarding_time
        self.departure_time = departure_time
        self.gate = gate
        self.status = "N/A"
        self.plane_type = plane_type
        self.origin = origin
        self.destination = destination

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
                "status": self.status,
                "plane_type": self.plane_type,
                "passengers": self.passengers,
                "bags": self.bags,
                "seats": self.seats,
                "origin": self.origin,
                "destination": self.destination
            }
        )
