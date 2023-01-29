from src.modules.user import User, user_data
from src.modules.flights import Flights
from src.modules.persistence import Persistence, user_db

class SessionHandler:

    @classmethod
    def route_request(cls, username, request):
        match request["type"]:
            case "login":
                return cls.login_request(username, request["password"])
            case "status":
                return Flights.get_flight_status(request["flight_number"])
            case "checkin_bags":
                return Flights.add_bags(request["flight_number"], username, request["bags"])
            case "select_seat":
                return Flights.add_flight_seat(request["flight_number"], username, request["flight_seat"])
            case "change_user_progress":
                return cls.change_user_progress(username, request["progress"])
            case "change_flight_progress":
                return cls.change_flight_status(request["flight_number"], request["status"])
        
        # Change status (arrived, security, available, boarding)
        # Checkin bags (how many bags to checkin)
        # Select seats
        # Check boarding status
        # Get flight status

    @classmethod
    def change_user_progress(cls, username, progress):
        Persistence.update_collection(user_db, username, {"status": progress})
        return [True, Persistence.get_collection(user_db, username)]
    
    @classmethod
    def login_request(cls, username, password):
        if db_search_results := Persistence.get_collection(user_db, username):
            return [False, "invalid user"]
        else:
            return (
                [False, "invalid password"]
                if password != db_search_results.password
                else [True, vars(cls.users.get(username))]
            )

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
            Persistence.update_collection(user_db, "user_acc", {"bags": ['aaaa']})

    @classmethod
    def initialize(cls):
        cls.populate_users()
        Flights.populate_flights()