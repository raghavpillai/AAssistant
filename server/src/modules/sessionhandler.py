
from src.modules.flights import ActionHandler

class SessionHandler:

    @classmethod
    def route_request(cls, username, request):
        match request["type"]:
            case "login":
                return ActionHandler.login_request(username, request["password"])
            case "status":
                return ActionHandler.get_user_status(username)
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
        #ActionHandler.populate_users()
        #ActionHandler.populate_flights()
        pass