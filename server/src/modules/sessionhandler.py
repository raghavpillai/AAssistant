
from src.modules.flights import ActionHandler
from src.modules.securitygates import SecurityGates

class SessionHandler:

    @classmethod
    def route_request(cls, username, request):
        match request["type"]:
            case "login": # Requests login handshake
                return ActionHandler.login_request(username, request["password"])
            case "status": # Gets user status
                return ActionHandler.get_user_status(username)
            case "checkin_bags": # Sends bags to checkin
                return ActionHandler.add_bags(request["flight_number"], username, request["bag_count"])
            case "select_seat": # Requests single seat
                return ActionHandler.add_flight_seat(request["flight_number"], username, request["flight_seat"])
            case "change_user_progress": # Changes user progress
                return ActionHandler.change_user_progress(username, request["progress"])
            case "change_flight_progress": # Changes flight progress
                return ActionHandler.change_flight_status(request["flight_number"], request["status"])
            case "validate_ticket": # Validates ticket and assigns user to plane if validated
                return ActionHandler.assign_plane_given_ticket(username, request["ticket_number"])
            case "get_flight_status": # Gets flight status for a given ticket
                return ActionHandler.get_flight_statuses(request["flight_number"])
            case "get_bag_db":
                return ActionHandler.get_bags_from_flight(request["flight_number"])
            case "get_travel_times":
                return ActionHandler.get_travel_times(username, request["gate"])
        
        # Change status (arrived, security, available, boarding)
        # Checkin bags (how many bags to checkin)
        # Select seats
        # Check boarding status
        # Get flight status


    @classmethod
    def initialize(cls):
        SecurityGates.fetch_gates()
        # ActionHandler.populate_flights()
        # ActionHandler.populate_users()
        #print(ActionHandler.get_bags_from_flight("AA 1511"))
        #ActionHandler.assign_plane_given_ticket("user_acc", "A1B2")
        #print(ActionHandler.get_travel_times("user_acc"))
        pass