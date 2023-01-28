from src.modules.user import User, user_data
from src.modules.flights import Flights

class SessionHandler:
    users = {}

    @classmethod
    def route_request(cls, username, request):
        match request["type"]:
            case "login":
                return cls.login_request(username, request["password"])
            case "status":
                return Flights.get_flight_status(request["flight_number"])
            case "checkin_bags":
                return Flights.add_bags(request["flight_number"], cls.users.get(username), request["bags"])
            case "select_seat":
                return Flights.add_flight_seat(request["flight_number"], cls.users.get(username), request["flight_seat"])
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
        cls.users.get(username).status = progress
        return [True, vars(cls.users.get(username))]
    
    @classmethod
    def login_request(cls, username, password):
        if username not in cls.users:
            return [False, "invalid user"]
        if password != cls.users.get(username).password:
            return [False, "invalid password"]
        
        return [True, vars(cls.users.get(username))]

    @classmethod
    def populate_users(cls):
        for name, data in user_data.items():
            temp_user = User(data.get("level"), name, data.get("id"))
            temp_user.status = "unconfirmed"
            temp_user.password = data.get("password")
            temp_user.flight_number = data.get("flight_num")
            cls.users[name] = temp_user

    @classmethod
    def initialize(cls):
        cls.populate_users()
        Flights.populate_flights()
        Flights.populate_seats()