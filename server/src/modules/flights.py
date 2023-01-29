import time
from src.modules.persistence import Persistence, user_db, flight_db
from src.modules.user import User, user_data
from src.modules.flight import Flight

ticket_numbers: dict = {
    "A1B2": "AA 1511"
}

flight_data: dict = {
    "AA 1511": {
        "boarding_time": "12:00",
        "departure_time": "15:00",
        "gate": "E31",
        "plane_type": "737-800",
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

    
    @classmethod
    def get_flight_statuses(cls, flight_number: str) -> list:
        """
        Gets amount of passengers in each part of checkin process
        @param flight_number[str]: Flight number to check
        @return[list] Returns list with format [successful request, info dictionary]
        """
        flight_db_data = Persistence.get_collection(flight_db, flight_number)
        if not flight_db_data: return [False, "Flight number invalid"]

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
            "boarded": boarded,
            "flight": flight_db_data
        }]
        
    
    @classmethod
    def add_flight_seat(cls, flight_number: str, username: str, flight_seat: str) -> list:
        """
        Function to add user to flight seat, replacing old seat if needed
        @param flight_number[str]: Flight number to interact with
        @param username[str]: User to mutate around
        @param flight_seat[str]: Flight seat to change to (in format of E1,E11, etc)
        @return[str]: Returns list with format [response validity, new flight seat]
        """
        flight_db_data: dict = Persistence.get_collection(flight_db, flight_number)
        if not flight_db_data: return [False, "Flight number invalid"]
        row = flight_seat[0]
        column = flight_seat[1:]
        seats = flight_db_data.get("seats")
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
        return [True, to_add]
    

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
            #Persistence.update_collection(user_db, "user_acc", {"bags": ['aaaa']})
    

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