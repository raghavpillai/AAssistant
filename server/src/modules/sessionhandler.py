from src.modules.user import User, user_data
from src.modules.flights import ActionHandler
from src.modules.persistence import Persistence, user_db

class SessionHandler:

    @classmethod
    def route_request(cls, username, request):
        match request["type"]:
            case "login":
                return cls.login_request(username, request["password"])
            case "status":
                return ActionHandler.get_flight_status(request["flight_number"])
            case "checkin_bags":
                return ActionHandler.add_bags(request["flight_number"], username, request["bag_count"])
            case "select_seat":
                return ActionHandler.add_flight_seat(request["flight_number"], username, request["flight_seat"])
            case "change_user_progress":
                return ActionHandler.change_user_progress(username, request["progress"])
            case "change_flight_progress":
                return ActionHandler.change_flight_status(request["flight_number"], request["status"])
        
        # Change status (arrived, security, available, boarding)
        # Checkin bags (how many bags to checkin)
        # Select seats
        # Check boarding status
        # Get flight status

    @classmethod
    def initialize(cls):
        pass
        #ActionHandler.populate_users()
        #ActionHandler.populate_flights()