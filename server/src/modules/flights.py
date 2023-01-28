from collections import defaultdict
import requests
import dateutil.parser
from datetime import timedelta
import random

flight_data = {
    "AA 1511": {
        "boarding_time": "12:00",
        "departure_time": "15:00",
        "gate": "E31",
        "plane_type": "737-800",
    }
}

class Flight:
    
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
        self.seats = {}

class Flights:
    flights = defaultdict(lambda: "Unknown Flight")

    @classmethod
    def get_passenger_statuses(cls, flight_number):
        if flight_number not in cls.flights: return [False, "Flight number invalid"]

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
    def add_flight_seat(cls, flight_number, passenger_object, flight_seat):
        if flight_number not in cls.flights: return [False, "Flight number invalid"]
        row = flight_seat[0]
        column = flight_seat[1:]
        cls.flight.seats[row][column] = [True, cls.flight.seats[row][column][1]]
        passenger_object.seat_number = flight_seat
        return [True, flight_seat]

    @classmethod
    def add_to_flight(cls, flight_number, passenger_object):
        if flight_number not in cls.flights: return [False, "Flight number invalid"]
        flight_data.get(flight_number).get("passengers").append(passenger_object)
        return [True, passenger_object]
    
    @classmethod
    def add_bags(cls, flight_number, passenger_object, bags):
        if flight_number not in cls.flights: return [False, "Flight number invalid"]
        for bag in bags:
            flight_data.get(flight_number).get("bags").append(bag)
            return [True, bags]
    @classmethod
    def get_flight_status(cls, flight_number):
        if flight_number not in cls.flights: return [False, "Flight number invalid"]
        return [True, cls.flights.get(flight_number)]

    @classmethod
    def change_flight_status(cls, flight_number, status_to_change_to):
        if flight_number not in cls.flights: return [False, "Flight number invalid"]
        cls.flights["flight_number"]["status"] = status_to_change_to
        return [True, cls.flights.get(flight_number)]

    @classmethod
    def populate_seats(cls):
        for flight in cls.flights.values():
            if flight.plane_type == "737-800":
                seats = defaultdict(list)
                for row in range(3, 7):
                    our_row = {}
                    for column in ['A','B','E','F']:
                        our_row[column] = [False, 50]
                    seats[row] = our_row
                for row in range(7, 31):
                    our_row = {}
                    for column in ['A','B','C','D','E','F']:
                        if row <= 15:
                            our_row[column] = [False, 10]
                        else:
                            our_row[column] = [False, 0]
                    seats[row] = our_row
                flight.seats = seats
            
    
    @classmethod
    def populate_flights(cls):
        r = requests.get("http://localhost:4000/flights", params={"date": "2023-01-29", "origin": "DFW"})
        data = r.json()
        
        for f_data in data:
            f_num = "AA" + f_data.get("flightNumber")
            departure_time = dateutil.parser.isoparse(f_data.get("departureTime"))
            boarding_time = departure_time - timedelta(minutes=45)
            gate = f"C{random.randint(1, 30):02}"

            cls.flights[f_num] = Flight(
                f_num,
                f_data.get("aircraft").get("model"),
                boarding_time.strftime("%H:%M"),
                departure_time.strftime("%H:%M"),
                gate
            )