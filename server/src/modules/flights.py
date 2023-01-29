import time
import re
import random
from src.modules.persistence import Persistence, user_db, flight_db, bag_db
from src.modules.user import User, user_data
from src.modules.flight import Flight
from src.modules.securitygates import SecurityGates

ticket_numbers: dict = {
    "A1B2": "AA 1511",
    "A2B2": "AA 1512",
    "A3B2": "AA 1513"
}

flight_data: dict = {
    "AA 1511": {
        "boarding_time": 1674985873 + 43200,
        "departure_time": 1674985873 + 43200 + 1800,
        "gate": "E31",
        "plane_type": "737-800",
        "origin": ["DFW", "Dallas"],
        "destination": ["JFK", "New York"]
    },
    "AA 1512": {
        "boarding_time": 1674985873 + 43200 + 720,
        "departure_time": 1674985873 + 43200 + 1800 + 720,
        "gate": "D4",
        "plane_type": "737-800",
        "origin": ["DFW", "Dallas"],
        "destination": ["CUN", "Cancún"]
    },
    "AA 1513": {
        "boarding_time": 1674985873 + 43200 + 720 + 720,
        "departure_time": 1674985873 + 43200 + 1800 + 720 + 720,
        "gate": "B7",
        "plane_type": "737-800",
        "origin": ["DFW", "Dallas"],
        "destination": ["LHR", "London"]
    }
}


class ActionHandler:
    """
    Class to handle actions across flight and user mutation and accessor functions
    """
    @classmethod
    def change_user_progress(cls, username: str, progress: str) -> list:
        """
        Function to change user progress
        @param username[str]: Username to check database against
        @param progress[str]: Progress of user to push
        @return[list] Returns list of [validity, user object from db]
        """
        Persistence.update_collection(user_db, username, {"status": progress})
        return [True, Persistence.get_collection(user_db, username)]
    

    @classmethod
    def login_request(cls, username: str, password: str) -> list:
        """
        Allows or denies a login request given username and password
        @param username[str]: Username of user to check
        @param password[str]: Password of user to check
        @return[list] Returns list of [login success, user object from db or login failure reason]
        """
        db_search_results = Persistence.get_collection(user_db, username)
        if not db_search_results:
            return [False, "invalid user"]
        if password != db_search_results.get("password"):
            return [False, "invalid password"]
        return [True, db_search_results]

    
    @classmethod
    def assign_plane_given_ticket(cls, username: str, ticket_number: str) -> list:
        """
        Function to assign user to plane given a ticket number
        @param username[str]: Username to assign ticket to
        @param ticket_number[str]: Ticket number to hash against plane
        @return[list] Returns list of [validation success, plane status]
        """
        flight_from_ticket = ticket_numbers.get(ticket_number)
        user_data_from_db = Persistence.get_collection(user_db, username)
        if not flight_from_ticket:
            return [False, "invalid flight ticket"]
        if not user_data_from_db:
            return [False, "invalid user"]
        Persistence.update_collection(user_db, username, {"ticket_number": ticket_number})
        Persistence.update_collection(user_db, username, {"flight_number": flight_from_ticket})
        if username not in Persistence.get_collection(flight_db, flight_from_ticket)["passengers"]:
            Persistence.update_collection(flight_db, flight_from_ticket, {"passengers": [username]})
        return [True, [Persistence.get_collection(flight_db, flight_from_ticket), ticket_number]]

    
    @classmethod
    def get_flight_statuses(cls, flight_number: str) -> list:
        """
        Gets amount of passengers in each part of checkin process
        @param flight_number[str]: Flight number to check
        @return[list] Returns list with format [successful request, info dictionary]
        """
        flight_db_data = Persistence.get_collection(flight_db, flight_number)
        if not flight_db_data: return [False, "Flight number invalid"]

        checked_in = security = concourse = boarded = unconfirmed = 0
        for passenger in flight_db_data.get("passengers"):
            user_coll = Persistence.get_collection(user_db, passenger)
            match user_coll.get("status"):
                case "unconfirmed": 
                    unconfirmed += 1
                case "checked_in":
                    checked_in += 1
                case "security":
                    security += 1
                case "concourse":
                    concourse += 1
                case "boarded":
                    boarded += 1
        
        return [True, {
            "unconfirmed": unconfirmed,
            "checked_in": checked_in,
            "security": security,
            "concourse": concourse, 
            "boarded": boarded,
            "flight": flight_db_data
        }]
        
    
    @classmethod
    def add_flight_seat(cls, flight_number: str, username: str, flight_seat: str) -> list:
        """
        Function to add user to flight seat, replacing old seat if needed
        @param flight_number[str]: Flight number to interact with
        @param username[str]: User to mutate around
        @param flight_seat[str]: Flight seat to change to (in format of 1A,16B, etc)
        @return[str]: Returns list with format [response validity, new flight seat]
        """
        flight_db_data: dict = Persistence.get_collection(flight_db, flight_number)
        if not flight_db_data: return [False, "Flight number invalid"]
        row = "".join(filter(str.isdigit, flight_seat)).strip()
        column = ("".join(re.split("[^a-zA-Z]*", flight_seat))).strip()
        seats = flight_db_data.get("seats")
        user_data = Persistence.get_collection(user_db, username)
        if user_data.get("seat_number") != "":
            old_row = user_data.get("seat_number")[0]
            old_column = user_data.get("seat_number")[1:]
            seats[old_row][old_column] = [False, seats[old_row][old_column][1]]
        
        seats[row][column] = [True, seats[row][column][1]]

        Persistence.update_collection(flight_db, flight_number, {"seats": seats})
        Persistence.update_collection(user_db, username, {"seat_number": flight_seat})
        if username not in Persistence.get_collection(flight_db, flight_number)["passengers"]:
            Persistence.update_collection(flight_db, flight_number, {"passengers": [username]})

        return [True, flight_seat]
    

    @classmethod
    def add_bags(cls, flight_number: str, username: str, bag_count: int):
        """
        Function to add bags to user and flight given username and flight number
        @param flight_number[str]: Flight number to add to
        @param username[str]: User to add to flight
        @param bag_count[int]: Amount of bags to add
        @return[str]: Returns list with format [response validity, username]
        """
        if not Persistence.get_collection(flight_db, flight_number): return [False, "Flight number invalid"]
        to_add = [int(time.time()) - 1674952000 + i for i in range(bag_count)]

        Persistence.update_collection(user_db, username, {"bags": to_add})
        Persistence.update_collection(flight_db, flight_number, {"bags": to_add})
        
        for bag in to_add:
            Persistence.update_collection(bag_db, bag, {"flight": flight_number, "owner": username, "from": flight_data[flight_number].get("origin")[0], "to": flight_data[flight_number].get("destination")[0]})

        return [True, to_add]
    

    @classmethod
    def get_bags_from_flight(cls, flight_number):
        return Persistence.get_collection(bag_db, flight_number, "flight")
    

    @classmethod
    def get_user_status(cls, username: str):
        """
        Function to get status from username
        @param[str] username: Username to get info about
        @return[str]: Returns list with format [response validity, dictionary data with user and flight. If no flight assigned, just user with flight set to None]
        """
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
    def populate_users(cls) -> None:
        """
        Test class method to populate database with temporary users
        """
        print("Started User Population")
        for name, data in user_data.items():
            temp_user = User(
                name,
                data.get("password"),
                data.get("level"),
                int(data.get("id")),
                data.get("name")
            )
            temp_user.flight_number = data.get("flight_num")
            temp_user.status = "unconfirmed"
        
        blacklist = ["11A", "13C", "17F", "20B", "23A", "27E", "29D", "30F"]
        statuses = ["unconfirmed", "checked_in", "security", "concourse"]
        seat_arr = Flight.get_flight_seats("737-800")
        seats = []
        for row in seat_arr:
            column = seat_arr[row]
            for col in column.keys():
                if f"{row}{col}" not in blacklist:
                    seats.append(f"{row}{col}")
        
        statuses = ["unconfirmed", "checked_in", "security", "concourse"]
        print("User Population - A")
        for i in range(148):
            temp_user = User(
                f"dummy_user_{i}",
                "dummy_password",
                "user",
                67710+i,
                f"Dummy {i}",
            )
            cls.change_user_progress(temp_user.username, statuses[random.randint(0,3)])
            cls.add_flight_seat("AA 1511", temp_user.username, seats[i])
            cls.add_bags("AA 1511", temp_user.username, random.randint(0, 1))
            cls.assign_plane_given_ticket(temp_user.username, "A1B2")

        print("User Population - B")
        for i in range(148):
            temp_user = User(
                f"dummy_user_{i}",
                "dummy_password",
                "user",
                67710+i,
                f"Dummy {i}"
            )
            cls.change_user_progress(temp_user.username, statuses[random.randint(0,3)])
            cls.add_flight_seat("AA 1512", temp_user.username, seats[i])
            cls.add_bags("AA 1512", temp_user.username, random.randint(0, 1))
            cls.assign_plane_given_ticket(temp_user.username, "A2B2")
        
        print("User Population - C")
        for i in range(148):
            temp_user = User(
                f"dummy_user_{i}",
                "dummy_password",
                "user",
                67710+i,
                f"Dummy {i}"
            )
            cls.change_user_progress(temp_user.username, statuses[random.randomint(0,3)])
            cls.add_flight_seat("AA 1513", temp_user.username, seats[i])
            cls.add_bags("AA 1513", temp_user.username, random.randint(0, 1))
            cls.assign_plane_given_ticket(temp_user.username, "A3B2")
    

    @classmethod
    def populate_flights(cls):
        print("Started Flight Population")
        for f_num, f_data in flight_data.items():
            temp_flight = Flight(
                f_num,
                f_data.get("plane_type"),
                f_data.get("boarding_time"),
                f_data.get("departure_time"),
                f_data.get("gate"),
                f_data.get("origin"),
                f_data.get("destination")
            )
            #cls.add_flight_seat(temp_flight.flight_number, "user_acc", "3A")
        print("Finished Flight Population")
    
    @classmethod
    def get_travel_times(cls, username, gate):
        db_search_results = Persistence.get_collection(user_db, username)
        if not db_search_results:
            return [False, "invalid user"]
        flight_number = db_search_results.get("flight_number")
        if not flight_number: 
            return [False, "user has no flight"]
        flight_db_search = Persistence.get_collection(flight_db, flight_number)
        boarding_time = flight_db_search.get("boarding_time")

        return SecurityGates.get_departure_info(boarding_time, gate)
        
    @classmethod
    def get_flight_nums(cls):
        return list(flight_data.keys())
    
    @classmethod
    def get_all_users_by_flight(cls, flight_number):
        db_search_results = Persistence.get_collection(user_db, flight_number)
        if not db_search_results:
            return [False, "invalid flight"]
        return [True, db_search_results]